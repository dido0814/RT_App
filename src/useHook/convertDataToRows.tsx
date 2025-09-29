import { useGoogleSheet } from "./useGoogleSheet";

const url: string = "https://script.google.com/macros/s/AKfycbzHTvY3Ppu-QY0mLK8NqwDjbmGIvbwujZbmFZZkEaQ2DgR-dV3IJLAD9NgITXC28yZJ/exec";

const { data, error } = useGoogleSheet(url);

interface DataRow {
    index: string;
    group: string;
    location: string;
    id: string;
    status: string;
    customer: string;
    project_name: string;
    project_amount: string;
    staff: {
        registered_staff: string;
        executing_staff: string;
        supervising_engineer: string;
    };
    contractor: string;
    date: {
        duration: string;
        start_date: string;
        end_date: string;
    };
    execution_info: {
        reporting_date: string;
        planned_progress: string;
        actual_progress: string;
        execution_content: string;
    };
}

// 假設 data 是平坦陣列
// [{index, group, location, id, status, customer, project_name, project_amount, staff_registered, staff_executing, staff_supervising, contractor, duration, start_date, end_date, reporting_date, planned_progress, actual_progress, execution_content}]
export function convertDataToRows(data: any[]): DataRow[] {
    return data.map((item) => ({
        index: item.index,
        group: item.group,
        location: item.location,
        id: item.id,
        status: item.status,
        customer: item.customer,
        project_name: item.project_name,
        project_amount: item.project_amount,
        staff: {
            registered_staff: item.staff_registered || "",
            executing_staff: item.staff_executing || "",
            supervising_engineer: item.staff_supervising || "",
        },
        contractor: item.contractor,
        date: {
            duration: item.duration || "",
            start_date: item.start_date || "",
            end_date: item.end_date || "",
        },
        execution_info: {
            reporting_date: item.reporting_date || "",
            planned_progress: item.planned_progress || "",
            actual_progress: item.actual_progress || "",
            execution_content: item.execution_content || "",
        },
    }));
}

// 使用方式

