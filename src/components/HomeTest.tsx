import React from "react";
import { useGoogleSheet } from "../useHook/useGoogleSheet";
import { RepeatOnRounded } from "@mui/icons-material";

const url: string = "https://script.google.com/macros/s/AKfycbzHTvY3Ppu-QY0mLK8NqwDjbmGIvbwujZbmFZZkEaQ2DgR-dV3IJLAD9NgITXC28yZJ/exec";

export default function HomeTest() {
    const { data, error } = useGoogleSheet(url);
    const rows = [];
    console.log("讀取資料:", data);
    if (error) return <p>錯誤：{error}</p>;
    if (!data) return <p>讀取中...</p>;
    if (data.length === 0) return <p>沒有資料</p>;

    console.log("讀取資料:", data);

    // data.map((item, index) => (
    //     // rows[indes]=item
    //     // <div key={item.id || index}>
    //     //     <h3>工程名稱:{item.project_name}</h3>
    //     //     <p>ID：{item.id}</p>
    //     //     <p>金額：{item.project_amount}</p>
    //     //     <p>狀態：{item.status}</p>
    //     //     <hr />
    //     // </div>
    // ))
    // return{rows}
// }




    return (
        <>
            <p>讀取成功 </p>
            <div>
                {data.map((item, index) => (
                    <div key={item.id || index}>
                        <h3>工程名稱:{item.project_name}</h3>
                        <p>ID：{item.id}</p>
                        <p>金額：{item.project_amount}</p>
                        <p>狀態：{item.status}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    );
}
