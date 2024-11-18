import React, {useState} from "react";
import "./style.css";

interface ToggleProps {
    tab1: string;
    tab2: string
}

const Toggle: React.FC<ToggleProps> = ({tab1, tab2}) => {
    const [activeTab, setActiveTab] = useState<number>(1);

    const handleTabClick = (tab: number) => {
      setActiveTab(tab);
    };
  
    return (
      <div className="flex flex-row w-full bg-[#242424] toggle-wrapper relative h-[36px] cursor-pointer">
        <div
          className={`flex basis-2/5 items-center justify-center p-2 transition-all ease-in-out duration-300 ${
            activeTab === 1
              ? "bg-gradient"
              : "bg-transparent"
          }`}
          onClick={() => handleTabClick(1)}
        >
          <span
            className={`text-base ${
              activeTab === 1 ? "text-white" : "text-[#747474]"
            }`}
          >
            {tab1}
          </span>
        </div>
        <div
          className={` basis-3/5 flex items-center justify-center p-2 transition-all ease-in-out duration-300 ${
            activeTab === 2
              ? "bg-gradient"
              : "bg-transparent"
          }`}
          onClick={() => handleTabClick(2)}
        >
          <span
            className={`text-base ${
              activeTab === 2 ? "text-white" : "text-[#747474]"
            }`}
          >
            {tab2}
          </span>
        </div>
      </div>
    );
}

export default Toggle;