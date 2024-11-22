import React, { useState } from "react";
import "./style.css";

interface SwitchProps {
  isOn: boolean;
  setIsOn: (value: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({isOn, setIsOn}) => {

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
      <div className="switch-wrapper w-[64px] h-[36px] relative">
        <div
          className={`switch-container cursor-pointer absolute ${
            isOn
              ? "bg-gradient"
              : "bg-[#242424]"
          }`}
          onClick={handleToggle}
        >
          <button
            className={`mt-[3px] ml-[3px] transition-all duration-300 hover:bg-white absolute ${
              isOn ? "transform translate-x-full bg-white" : "bg-[#2F2F2F]"
            }`}
          ></button>
        </div>
      </div>
  );
};

export default Switch;