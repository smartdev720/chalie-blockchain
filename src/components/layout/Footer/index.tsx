import React from "react";
import "./style.css";
import SocialButtonGroup from "../../common/SocialButtonGroup";
import BuyCharlieButton from "../../common/BuyCharlieButton";

const Footer = () => {
    return (
        <div className="mt-[270px] 2xl:mt-52 xl:mt-52 lg:md-52 md:mt-20 sm:mt-[270px]">
        <div className="footer-wrapper h-[72px] bg-[#444444] relative">
          <div className="w-full footer-wrapper inset-[1px] flex items-center justify-between px-4 absolute bg-[#1C1C1C]">
            <SocialButtonGroup />
            <div className="">
              <BuyCharlieButton />
            </div>
          </div>
      </div>
    </div>
    );
}

export default Footer;