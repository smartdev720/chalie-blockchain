import React from "react";
import "./style.css";

const BuyCharlieButton = () => {
  return (
    <div className="buy-charlie-btn-wrapper w-[154px] h-[44px] relative bg-gradient">
      <div className="buy-charlie-btn-container absolute bg-white">
        <button className="absolute bg-gradient text-white text-base">
          Buy CHARLIE
        </button>
      </div>
    </div>
  );
};

export default BuyCharlieButton;