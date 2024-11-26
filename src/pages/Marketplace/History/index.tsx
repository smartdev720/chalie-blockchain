import React, { useState } from "react";
import Dropdown from "../../../components/common/Dropdown";
import "./style.css";

const menus:any[] = [];

type Item = {
    icon: string | null;
    title: string;
}

type RowItem = {
    key: any;
    items: Item[];
};

const rows: RowItem[] = [
    {
        key: 1,
        items: [
            {icon: "sale", title: "Sale"},
            {icon: null, title: "0.2 TON*$0.97"},
            {icon: "avatar (1)", title: "nickname"},
        ]
    },
    {
        key: 2,
        items: [
            {icon: "sale", title: "Sale"},
            {icon: null, title: "0.2 TON*$0.97"},
            {icon: "avatar (1)", title: "nickname"},
        ]
    },
    {
        key: 3,
        items: [
            {icon: "sale", title: "Sale"},
            {icon: null, title: "0.2 TON*$0.97"},
            {icon: "avatar (1)", title: "nickname"},
        ]
    },
    {
        key: 4,
        items: [
            {icon: "sale", title: "Sale"},
            {icon: null, title: "0.2 TON*$0.97"},
            {icon: "avatar (1)", title: "nickname"},
        ]
    },
];

const MarketplaceHistory = () => {
    const [selected, setSelected] = useState<any>("Filter");

    return (
        <div className="w-full 2xl:w-[70%] xl:w-[70%] lg:w-[70%] md:w-full sm:w-full mx-auto mt-20">
            <div className="flex items-center justify-between">
                <h1 className="text-white text-2xl font-semibold">History</h1>
                <div className="w-[120px] 2xl:w-[200px] xl:w-[200px] lg:w-[200px] md:w-[200px] sm:w-[120px]">
                    <Dropdown menus={menus} selected={selected} setSelected={setSelected} width={200} />
                </div>
            </div>
            <div className="marketplace-history-wrapper relative bg-[#2C2C2C] h-[105vh] mt-10">
                <div className="marketplace-history-wrapper inset-[1px] absolute bg-[#1B1B1B] p-6 overflow-auto">
                    <table className="table-auto w-[700px] 2xl:w-full xl:w-full lg:w-full md:w-full sm:w-[760px]">
                        <thead>
                            <tr className="grid grid-cols-3 w-full">
                                <th className="text-[#747474] font-normal text-md text-left">Type</th>
                                <th className="text-[#747474] font-normal text-md text-right">Price</th>
                                <th className="text-[#747474] font-normal text-md text-right">From</th>
                            </tr>
                        </thead>
                        <tbody>
                           {rows.map((row, index) => (
                            <tr key={index} className="flex flex-row items-center w-full mt-2">
                                <td className="flex flex-row items-center gap-2 basis-1/2">
                                    <img src={`./assets/${row.items[0].icon}.svg`} alt={row.items[0].title} />
                                    <span className="text-white font-normal text-md">{row.items[0].title}</span>
                                </td>
                                <td className="flex flex-col items-end justify-center basis-1/6">
                                    <span className="text-white font-normal text-sm">{row.items[1].title.split("*")[0]}</span>
                                    <span className="text-[#747474] font-normal text-xs">{row.items[1].title.split("*")[1]}</span>
                                </td>
                                <td className="basis-1/3 flex items-center justify-between">
                                    <div></div>
                                    <div className="flex flex-row items-center gap-2">
                                        <img src={`./assets/${row.items[2].icon}.png`} alt={row.items[2].title} className="w-6 h-6 rounded-full" />
                                        <span className="gradient-text font-normal text-md gradient-underline cursor-pointer">{row.items[2].title}</span>
                                    </div>
                                </td>
                            </tr>
                           ))} 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MarketplaceHistory;