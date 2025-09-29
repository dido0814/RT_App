import { useState, useEffect } from "react";

type Staff = {
  registered_staff: string;
  executing_staff: string;
  supervising_engineer: string;
};

type DateInfo = {
  duration: string;
  start_date: string;
  end_date: string;
};

type ExecutionInfo = {
  reporting_date: string;
  planned_progress: string;
  actual_progress: string;
  execution_content: string;
};

export type Project = {
  index: string;
  group: string;
  location: string;
  id: string;
  status: string;
  customer: string;
  project_name: string;
  project_amount: string;
  staff: Staff;
  contractor: string;
  date: DateInfo;
  execution_info: ExecutionInfo[];
};

export function useProjects(apiUrl: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // 將回傳資料轉成 Project[]，確保每筆 execution_info 都是陣列
        const formatted: Project[] = data.map((item: any) => ({
          index: item.index || "",
          group: item.group || "",
          location: item.location || "",
          id: item.id || "",
          status: item.status || "",
          customer: item.customer || "",
          project_name: item.project_name || "",
          project_amount: item.project_amount || "",
          staff: {
            registered_staff: item.staff?.registered_staff || "",
            executing_staff: item.staff?.executing_staff || "",
            supervising_engineer: item.staff?.supervising_engineer || "",
          },
          contractor: item.contractor || "",
          date: {
            duration: item.date?.duration || "",
            start_date: item.date?.start_date || "",
            end_date: item.date?.end_date || "",
          },
          execution_info: Array.isArray(item.execution_info)
            ? item.execution_info.map((e: any) => ({
                reporting_date: e.reporting_date || "",
                planned_progress: e.planned_progress || "",
                actual_progress: e.actual_progress || "",
                execution_content: e.execution_content || "",
              }))
            : [],
        }));

        setProjects(formatted);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [apiUrl]);

  return { projects, loading, error };
}
