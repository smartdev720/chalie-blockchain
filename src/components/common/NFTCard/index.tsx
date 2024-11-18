import React, { useState } from "react";
import "./style.css";

const NFTCard = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-full h-[228px] 2xl:h-[260px] xl:h-[260px] lg:h-[260px] md:h-[260px] sm:h-[228px] mt-4">
      <div
        className={`-inset-2 transition-all duration-300 ease-in-out ${
          hovered ? "absolute" : "hidden"
        }`}
        style={{ filter: "blur(8px)" }}
      >
        <div className="w-full h-full transition-all duration-300 ease-in-out opacity-30 nft-card-shadow blur-sm bg-gradient-br"></div>
      </div>
      <div
        className="nft-card-wrapper relative w-full bg-gradient-br"
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="nft-card-wrapper inset-[1px] relative bg-[#1C1C1C] opacity-90 flex flex-col">
          {/* Desktop */}
          <div className="hidden 2xl:block xl:block lg:block md:block sm:hidden">
            <div className="relative">
              <img src="./assets/NFTbg.svg" alt="NFTBG" />
              <div
                className="absolute top-2 left-2 w-[30px] h-[30px]"
                style={{ background: "url('./assets/cryptocurrencyBg.svg')" }}
              >
                <img
                  src="./assets/ethereum.svg"
                  alt="cryptocurrency"
                  className="z-50 mt-[3px] ml-[3px]"
                />
              </div>
            </div>
            <div className="px-4 py-2">
              <h3 className="text-lg text-white font-normal">
                CharlieCollection
              </h3>
              <div className="flex items-center justify-between mt-2">
                <div className="">
                  <p className="text-white/50 text-xs font-medium">
                    FLOOR PRICE
                  </p>
                  <h3 className="text-lg text-white font-normal">
                    25.25497 <span className="text-lg text-white/50">ETH</span>
                  </h3>
                </div>
                <div className="">
                  <p className="text-white/50 text-xs font-medium">
                    1d VOL. CHANGE
                  </p>
                  <h3 className="tracking-[-0.052em] block text-lg font-semibold bg-gradient-to-r from-[#ce89ca] to-[#75eea3] bg-clip-text text-transparent">
                    813%
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile */}
          <div className="2xl:hidden xl:hidden lg:hidden md:hidden sm:block">
            <div className="relative w-full">
              <img src="./assets/NFTMobilebg.svg" alt="NFTBG" />
              <div
                className="absolute top-2 left-2 w-[30px] h-[30px]"
                style={{ background: "url('./assets/cryptocurrencyBg.svg')" }}
              >
                <img
                  src="./assets/ethereum.svg"
                  alt="cryptocurrency"
                  className="z-50 mt-[3px] ml-[3px]"
                />
              </div>
            </div>
            <div className="p-[14px]">
              <h3 className="text-sm text-white font-normal">
                CharlieCollection
              </h3>
              <div className="mt-2">
                <p className="text-white/50 text-[10px] font-medium">
                  FLOOR PRICE
                </p>
                <h3 className="text-sm text-white font-normal">
                  25.25497{" "}
                  <span className="text-sm text-white/50 font-normal">ETH</span>
                </h3>
              </div>
              <div className="mt-2">
                <p className="text-white/50 text-[10px] font-medium">
                  1d VOL. CHANGE
                </p>
                <h3 className="tracking-[-0.052em] block text-sm font-normal bg-gradient-to-r from-[#ce89ca] to-[#75eea3] bg-clip-text text-transparent">
                  813%
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;