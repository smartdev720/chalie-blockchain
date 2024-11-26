import React from "react";

export type AttributesListItem = {
    title: string;
    description: string;
}

interface AttributesListGroup {
    items: AttributesListItem[] | null;
}

const AttributesListGroup: React.FC<AttributesListGroup> = ({items}) => {
    return (
        <>
            {items && items.map((item, index) => (
                <div className="flex flex-row gap-1 items-center mt-2" key={index}>
                    <p className="text-white text-sm font-normal"><span className="text-[#7F7F7F] text-sm font-normal">{item.title}: </span>{item.description}</p>
                </div>
            ))}
        </>
    );
}

export default AttributesListGroup;