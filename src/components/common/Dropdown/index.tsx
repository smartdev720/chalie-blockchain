import React, { useState } from "react";
import "./style.css";

interface DropdownProps {
  menus: any[];
  width: number;
  setSelected: (value: any) => void;
  selected: any;
}

const Dropdown: React.FC<DropdownProps> = ({ menus, width, setSelected, selected }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleMenuClick = (menu: any) => {
    setOpen(false);
    setSelected(menu);
  };

  return (
    <div className={`w-full 2xl:w-[${width}px] xl:w-[${width}px] lg:w-[${width}px] md:w-[${width}px] sm:w-[${width}px] relative`}>
      <div
        className={`dropdown-wrapper cursor-pointer relative bg-[#2C2C2C] h-[36px]`}
        onClick={() => setOpen(!open)}
      >
        <div className="inset-[1px] dropdown-wrapper absolute flex items-center justify-between bg-[#212121] px-4">
          <span className="text-base font-normal text-white">{selected}</span> {/* Display the selected menu */}
          <img
            src="./assets/narrow.svg"
            alt="narrow"
            className={`absolute right-4 transform transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      <div
        className={`flex flex-col absolute w-full 2xl:w-[${width}px] xl:w-[${width}px] lg:w-[${width}px] md:w-full sm:w-full z-50 items-center mt-1 bg-[#212121] justify-center ${open ? "block" : "hidden"}`}
      >
        {menus.map((menu, index) => (
          <span
            key={index}
            className="text-white text-base w-full px-4 transition-all duration-300 ease-in-out font-normal py-2 cursor-pointer block hover:bg-[#2C2C2C]"
            onClick={() => handleMenuClick(menu)} 
          >
            {menu}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
