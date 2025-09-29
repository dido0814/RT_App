


//     const columns: GridColDef<(typeof rows)[number]>[] = [
//         { field: 'id', headerName: 'ID', width: 90 },
//         {
//             field: 'firstName',
//             headerName: 'First name',
//             width: 150,
//             editable: true,
//         },
//         {
//             field: 'lastName',
//             headerName: 'Last name',
//             width: 150,
//             editable: true,
//         },
//         {
//             field: 'age',
//             headerName: 'Age',
//             type: 'number',
//             width: 110,
//             editable: true,
//         },
//         {
//             field: 'fullName',
//             headerName: 'Full name',
//             description: 'This column has a value getter and is not sortable.',
//             sortable: false,
//             width: 160,
//             valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//         },
//     ];

//     const rows = [
//         { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//         { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//         { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//         { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//         { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//         { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//         { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//         { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//         { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     ];

//     return (
//         <>
//             <p>讀取成功 </p>
//             {/* <div>
//                 {data.map((item, index) => (
//                     <div key={item.id || index}>
//                         <h3>工程名稱:{item.project_name}</h3>
//                         <p>ID：{item.id}</p>
//                         <p>金額：{item.project_amount}</p>
//                         <p>狀態：{item.status}</p>
//                         <hr />
//                     </div>
//                 ))}
//             </div> */}

//             <Box sx={{
//                 // height: 400,
//                 // width: '100%',
//                 borderColor: 'divider',
//                 borderWidth: 1,
//                 borderStyle: 'solid',
//             }}>
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     initialState={{
//                         pagination: {
//                             paginationModel: {
//                                 pageSize: 5,
//                             },
//                         },
//                     }}
//                     pageSizeOptions={[5]}
//                     checkboxSelection
//                     disableRowSelectionOnClick
//                 />
//             </Box>
//         </>
//     );
// }




// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 200 },
//     { field: 'status', headerName: 'Status', width: 150 },
// ];

// const rows = [
//     { id: 1, name: '工程 A', status: '進行中' },
//     { id: 2, name: '工程 B', status: '已完成' },
//     { id: 3, name: '工程 C', status: '未開始' },
// ];

import * as React from 'react';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';

import { useGoogleSheet } from "../useHook/useGoogleSheet";

const url: string = "https://script.google.com/macros/s/AKfycbzHTvY3Ppu-QY0mLK8NqwDjbmGIvbwujZbmFZZkEaQ2DgR-dV3IJLAD9NgITXC28yZJ/exec";

interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
): Data {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

function labelDisplayedRows({
    from,
    to,
    count,
}: {
    from: number;
    to: number;
    count: number;
}) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

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

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Dessert (100g serving)',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Fat (g)',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Carbs (g)',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {







    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <thead>
            <tr>
                <th>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        slotProps={{
                            input: {
                                'aria-label': 'select all desserts',
                            },
                        }}
                        sx={{ verticalAlign: 'sub' }}
                    />
                </th>
                {headCells.map((headCell) => {
                    const active = orderBy === headCell.id;
                    return (
                        <th
                            key={headCell.id}
                            aria-sort={
                                active
                                    ? ({ asc: 'ascending', desc: 'descending' } as const)[order]
                                    : undefined
                            }
                        >
                            <Link
                                underline="none"
                                color="neutral"
                                textColor={active ? 'primary.plainColor' : undefined}
                                component="button"
                                onClick={createSortHandler(headCell.id)}
                                startDecorator={
                                    headCell.numeric ? (
                                        <ArrowDownwardIcon
                                            sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                                        />
                                    ) : null
                                }
                                endDecorator={
                                    !headCell.numeric ? (
                                        <ArrowDownwardIcon
                                            sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                                        />
                                    ) : null
                                }
                                sx={{
                                    fontWeight: 'lg',

                                    '& svg': {
                                        transition: '0.2s',
                                        transform:
                                            active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                    },

                                    '&:hover': { '& svg': { opacity: 1 } },
                                }}
                            >
                                {headCell.label}
                                {active ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </Link>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}
interface EnhancedTableToolbarProps {
    numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    return (
        <Box
            sx={[
                {
                    display: 'flex',
                    alignItems: 'center',
                    py: 1,
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    borderTopLeftRadius: 'var(--unstable_actionRadius)',
                    borderTopRightRadius: 'var(--unstable_actionRadius)',
                },
                numSelected > 0 && {
                    bgcolor: 'background.level1',
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    level="body-lg"
                    sx={{ flex: '1 1 100%' }}
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton size="sm" color="danger" variant="solid">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton size="sm" variant="outlined" color="neutral">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
}
export default function TableSortAndSelection() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
        setRowsPerPage(parseInt(newValue!.toString(), 10));
        setPage(0);
    };
    const getLabelDisplayedRowsTo = () => {
        if (rows.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1
            ? rows.length
            : Math.min(rows.length, (page + 1) * rowsPerPage);
    };


    // const url: string = "https://script.google.com/macros/s/AKfycbzHTvY3Ppu-QY0mLK8NqwDjbmGIvbwujZbmFZZkEaQ2DgR-dV3IJLAD9NgITXC28yZJ/exec";

    const { data, error } = useGoogleSheet(url);
    console.log("讀取資料:", data);
    // if (error) console.log("錯誤：",error);
    // if (!data) console.log("讀取中：",error);
    // // if (data.length === 0) <p>沒有資料</p>;

    // console.log("讀取資料:", data);

    // const rows2 = data.map(item => item); // 假設每個 item 都有唯一的 id 欄位
    // console.log(rows2);


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    return (
        <Sheet
            variant="outlined"
            sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}
        >
            <EnhancedTableToolbar numSelected={selected.length} />
            <Table
                aria-labelledby="tableTitle"
                hoverRow
                sx={{
                    '--TableCell-headBackground': 'transparent',
                    '--TableCell-selectedBackground': (theme) =>
                        theme.vars.palette.success.softBg,
                    '& thead th:nth-child(1)': {
                        width: '40px',
                    },
                    '& thead th:nth-child(2)': {
                        width: '30%',
                    },
                    '& tr > *:nth-child(n+3)': { textAlign: 'right' },
                }}
            >
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                />
                <tbody>
                    {[...rows]
                        .sort(getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            const isItemSelected = selected.includes(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <tr
                                    onClick={(event) => handleClick(event, row.name)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.name}
                                    // selected={isItemSelected}
                                    style={
                                        isItemSelected
                                            ? ({
                                                '--TableCell-dataBackground':
                                                    'var(--TableCell-selectedBackground)',
                                                '--TableCell-headBackground':
                                                    'var(--TableCell-selectedBackground)',
                                            } as React.CSSProperties)
                                            : {}
                                    }
                                >
                                    <th scope="row">
                                        <Checkbox
                                            checked={isItemSelected}
                                            slotProps={{
                                                input: {
                                                    'aria-labelledby': labelId,
                                                },
                                            }}
                                            sx={{ verticalAlign: 'top' }}
                                        />
                                    </th>
                                    <th id={labelId} scope="row">
                                        {row.name}
                                    </th>
                                    <td>{row.calories}</td>
                                    <td>{row.fat}</td>
                                    <td>{row.carbs}</td>
                                    <td>{row.protein}</td>
                                </tr>
                            );
                        })}
                    {emptyRows > 0 && (
                        <tr
                            style={
                                {
                                    height: `calc(${emptyRows} * 40px)`,
                                    '--TableRow-hoverBackground': 'transparent',
                                } as React.CSSProperties
                            }
                        >
                            <td colSpan={6} aria-hidden />
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <FormControl orientation="horizontal" size="sm">
                                    <FormLabel>Rows per page:</FormLabel>
                                    <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                                        <Option value={5}>5</Option>
                                        <Option value={10}>10</Option>
                                        <Option value={25}>25</Option>
                                    </Select>
                                </FormControl>
                                <Typography sx={{ textAlign: 'center', minWidth: 80 }}>
                                    {labelDisplayedRows({
                                        from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                                        to: getLabelDisplayedRowsTo(),
                                        count: rows.length === -1 ? -1 : rows.length,
                                    })}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton
                                        size="sm"
                                        color="neutral"
                                        variant="outlined"
                                        disabled={page === 0}
                                        onClick={() => handleChangePage(page - 1)}
                                        sx={{ bgcolor: 'background.surface' }}
                                    >
                                        <KeyboardArrowLeftIcon />
                                    </IconButton>
                                    <IconButton
                                        size="sm"
                                        color="neutral"
                                        variant="outlined"
                                        disabled={
                                            rows.length !== -1
                                                ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                                                : false
                                        }
                                        onClick={() => handleChangePage(page + 1)}
                                        sx={{ bgcolor: 'background.surface' }}
                                    >
                                        <KeyboardArrowRightIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Sheet>
    );
}
