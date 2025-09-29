import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import { convertDataToRows } from '../useHook/convertDataToRows';
import { useGoogleSheet } from '../useHook/useGoogleSheet';


const url: string = "https://script.google.com/macros/s/AKfycbzHTvY3Ppu-QY0mLK8NqwDjbmGIvbwujZbmFZZkEaQ2DgR-dV3IJLAD9NgITXC28yZJ/exec";


// const { data, error } = useGoogleSheet(url);
// console.log("讀取資料:", data);
// const rows = data.map(item => item);
// const rows = data.map((item) => [
//   item.index,
//   item.group,
//   item.location,
//   item.id,
//   item.status,
//   item.customer,
//   item.project_name,
//   item.project_amount,
//   item.staff.executing_staff,
//   item.staff.registered_staff,
//   item.staff.supervising_engineer,
//   item.contractor,
//   item.date,
//   item.execution_info.actual_progress,
//   item.execution_info.planned_progress,
//   item.execution_info.execution_content,
//   item.execution_info.reporting_date, 
// ]);

// type DataRow = {
//   index: string;
//   group: string;
//   location: string;
//   id: string;
//   status: string;
//   customer: string;
//   project_name: string;
//   project_amount: string;
//   staff: {
//     registered_staff: string;
//     executing_staff: string;
//     supervising_engineer: string;
//   };
//   contractor: string;
//   date: {
//     duration: string;
//     start_date: string;
//     end_date: string;
//   };
//   execution_info: {
//     reporting_date: string;
//     planned_progress: string;
//     actual_progress: string;
//     execution_content: string;
//   };
// };

// const rows: DataRow[] = convertDataToRows([]); // Replace [] with your actual data array

const rows = [
  {
    index: "1",
    group: "工務4",
    location: "新竹縣",
    id: "工4-J01",
    status: "開工",
    customer: "北區水資源分署",
    project_name: "石門水庫至新竹聯通管-跨河放水段工程\n工程金額: 2,319,000,000元",
    project_amount: "2,319,000,000",
    staff: {
      registered_staff: "彭信坤\n陳朝淳\n施瑞麟",
      executing_staff: "彭信坤\n陳朝淳\n施瑞麟\n邱兆毅",
      supervising_engineer: "黃任篷",
    },
    contractor: "得意",
    date: {
      duration: "1370\n日曆天",
      start_date: "113/8/20",
      end_date: "117/5/20",
    },
    execution_info: {
      reporting_date: "114/9/18",
      planned_progress: "6.14%",
      actual_progress: "6.69%",
      execution_content: "截至114.9.18\n本週重點工作說明：\n一、上坪溪明挖段:\n1.上坪溪施工便道舖築\n2.鋼軌樁引孔49孔\n3.明挖&安裝2000mm管：119.7 m；累計 404.1 m\n二、油羅溪水管橋:施工便道舖築&整地\n三、竹東水管橋:施工便道舖築\n四、大肚國小推進段:未施工(預計115/5進場)\n五、台鐵內灣支線推進段:未施工\n六、台三線明挖段:無\n七、出水口緩衝槽:未施工"
    },
  }

];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// function RowMenu() {
//   return (
//     <Dropdown>
//       <MenuButton
//         slots={{ root: IconButton }}
//         slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
//       >
//         <MoreHorizRoundedIcon />
//       </MenuButton>
//       <Menu size="sm" sx={{ minWidth: 140 }}>
//         <MenuItem>編輯</MenuItem>
//         <MenuItem>修改</MenuItem>
//         <MenuItem>刪除</MenuItem>
//         <Divider />
//         <MenuItem color="danger">刪除</MenuItem>
//       </Menu>
//     </Dropdown>
//   );
// }

export default function OrderTable() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);

  const { data, error } = useGoogleSheet(url);
  console.log("讀取資料:", data);
  if (error) return <p>錯誤：{error}</p>;
  if (!data) return <p>讀取中...</p>;
  if (data.length === 0) return <p>沒有資料</p>;
  const seenIds = new Set(); // 用來記錄已經加入過的 id

  if (data.length > 0) {
    data.forEach((item, i) => {

      if (!seenIds.has(item.id)) {
        // 如果 id 沒出現過，才加入 rows
        rows[i] = ({
          ...item,
          id: item.id // DataGrid 的 id，保持原本的 id
        });
        seenIds.add(item.id); // 標記這個 id 已經加入過
      }
    });
  }


  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
          <Option value="停工" color="danger">停工10</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            {/* 框框 */}
            <tr>
              <th style={{ width: 30, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              {/* <th style={{ width: 50, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: 'lg',
                      '& svg': {
                        transition: '0.2s',
                        transform:
                          order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                      },
                    },
                    order === 'desc'
                      ? { '& svg': { transform: 'rotate(0deg)' } }
                      : { '& svg': { transform: 'rotate(180deg)' } },
                  ]}
                >工程編號
                </Link>
              </th> */}
              <th style={{ width: 60, padding: '12px 6px' }}>工程編號</th>
              <th style={{ width: 150, padding: '12px 6px' }}>工程名稱</th>
              <th style={{ width: 70, padding: '12px 6px' }}>工程狀態</th>
              <th style={{ width: 100, padding: '12px 6px' }}>人員資訊</th>
              <th style={{ width: 100, padding: '12px 6px' }}>工期資訊</th>
              <th style={{ width: 60, padding: '12px 6px' }}>預定進度</th>
              <th style={{ width: 60, padding: '12px 6px' }}>實際進度</th>
              <th style={{ width: 200, padding: '12px 6px' }}>施工摘要</th>
            </tr>
          </thead>
          <tbody>
            {[...rows].sort(getComparator(order, 'id')).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? 'primary' : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id),
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.project_name}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Paid: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Paid: 'success',
                        Refunded: 'neutral',
                        Cancelled: 'danger',
                      }[row.status] as ColorPaletteProp
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {/* <Avatar size="sm">{row.staff}</Avatar> */}
                    <div>
                      <Typography level="body-xs">登入人員:{row.staff.executing_staff}</Typography>
                      <Typography level="body-xs">執行人員:{row.staff.registered_staff}</Typography>
                      <Typography level="body-xs">監造技師:{row.staff.supervising_engineer}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <div>
                      <Typography level="body-xs">總工期:{row.date.duration}</Typography>
                      <Typography level="body-xs">開工日期:{row.date.start_date}</Typography>
                      <Typography level="body-xs">竣工日期:{row.date.end_date}</Typography>
                    </div>
                    {/* <Link level="body-xs" component="button">
                      Download
                    </Link>
                    <RowMenu /> */}
                  </Box>
                </td>
                {/* 預定進度 */}
                <td>
                  {Array.isArray(row.execution_info) && row.execution_info.length > 0
                    ? row.execution_info[row.execution_info.length - 1].planned_progress
                    : row.execution_info?.planned_progress || "-"
                  }
                </td>
                {/* 實際進度 */}
                <td>
                  {Array.isArray(row.execution_info) && row.execution_info.length > 0
                    ? row.execution_info[row.execution_info.length - 1].actual_progress
                    : row.execution_info?.actual_progress || "-"
                  }
                </td>
                {/* 施作內容 */}
                <td>
                  {Array.isArray(row.execution_info) && row.execution_info.length > 0
                    ? row.execution_info[row.execution_info.length - 1].execution_content
                    : row.execution_info?.actual_progress || "-"
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
