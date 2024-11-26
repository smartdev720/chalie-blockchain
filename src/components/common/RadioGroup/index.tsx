import React, { ReactNode } from "react";

export type RadioItemType = {
    label: string;
    checked: boolean;
    name: string;
    isImg: boolean;
    src: string;
}

interface RadioGroupProps {
    items: RadioItemType[] | null
}

const RadioGroup: React.FC<RadioGroupProps> = ({items}) => {
    return (
        <>
            {items && items.map((item, index) => (
                <div className="flex flex-row items-center gap-2 mt-2" key={index}>
                    <img src={`./assets/${item.checked ? "radioChecked" : "radioUnchecked"}.svg`} alt="radioChecked" className="w-6 h-6 cursor-pointer" />
                    {item.isImg && <img src={item.src} alt={item.name} className="w-6 h-6 ml-1" />}
                    <label className="text-white">{item.label}</label>
                </div>
            ))}
        </>
    );
}

export default RadioGroup;