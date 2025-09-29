import { useEffect, useState } from "react";

export interface Project {
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
}[]

export function useGoogleSheet(url: string) {
  const [data, setData] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        console.log("Response:", res);

        const json = await res.json();
        console.log("解析後 JSON:", json);

        // 假設 json 是 { data: [...] }
        // if (!json || !json.data) {
        //   throw new Error("JSON 格式錯誤，沒有 data 欄位");
        // }

        // const rows = Array.isArray(json.data) ? json.data : [];
        // console.log("轉換後 rows:", rows);

        setData(json);
      } catch (err: any) {
        console.error("❌ Fetch 失敗:", err);
        setError(err.message);
      }
    }
    fetchData();
  }, [url]);
  

  return { data, error };
}
