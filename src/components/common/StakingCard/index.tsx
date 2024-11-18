import React, { useState } from "react";
import "./style.css";
import type { StakingCardInfoItem } from "../../../types/componentTypes";


interface StakingCardProps {
    items: StakingCardInfoItem[]
}

const StakingCard: React.FC<StakingCardProps> = ({items}) => {
    const [hovered, setHovered] = useState<boolean>(false);
    return (
        <div className="relative w-full h-[450px] 2xl:h-[438px] xl:h-[438px] lg:h-[438px] md:h-[450px] sm:h-[450px] mt-4">
            <div
                className={`-inset-2 transition-all duration-300 ease-in-out ${
                hovered ? "absolute" : "hidden"
                }`}
                style={{ filter: "blur(8px)" }}
            >
                <div className="w-full h-full transition-all duration-300 ease-in-out opacity-30 staking-card-shadow blur-sm bg-gradient-br"></div>
            </div>
            <div
                className="staking-card-wrapper relative w-full h-full bg-gradient-br transition-all ease-in-out duration-300"
                onMouseOver={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="staking-card-container absolute bg-[#1C1C1C] opacity-90 flex flex-col p-4">
                <div className="staking-card-header w-full">
                    <div className="wrapper w-full h-full p-[1px] flex items-center justify-center bg-gradient">
                    <div className="container bg-[#2B2B2B] opacity-90 p-4 flex items-center justify-between">
                        <img src="./assets/bitcoin.svg" alt="bitcoin" />
                        <div className="flex items-center justify-between">
                        <span className="text-white text-base font-semibold mr-2 cursor-pointer">
                            PHCF-BTC CHRLE
                        </span>
                        <button className="font-semibold w-[56px] h-[32px] text-base text-white bg-gradient">
                            100x
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="w-full mt-6">
                <div className="w-full flex flex-col">
                    {items.map((item, index) => (
                        <div className="flex items-center justify-between mb-1" key={index}>
                        <span className="text-[#747474] text-base font-normal">
                            {item.key}:
                        </span>
                        <span className="text-white text-base font-normal">{item.value}</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between mb-2">
                        <span className="tracking-[-0.052em] text-base font-semibold gradient-text">
                        PHCF
                        </span>
                        <span className="text-white text-base font-normal">Earned</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xl font-semibold text-[#747474]">0</span>
                        <span className="bg-[#242424] font-semibold text-base info-container px-2 py-1 text-[#747474]">
                            Harvest
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="tracking-[-0.052em] text-base font-semibold gradient-text">
                        PHCF-BTC CHRLE
                        </span>
                        <span className="text-white text-base font-normal">Staked</span>
                    </div>
                    </div>
                    {/* <InfoGroup items={infos} /> */}
                    <div className="connect-wallet-wrapper h-[54px] mt-4 w-full relative bg-gradient">
                    <div className="connect-wallet-container bg-white absolute">
                        <button className="cursor-pointer absolute text-white text-base bg-gradient">
                        Connect wallet
                        </button>
                    </div>
                    </div>
                    <div className="flex items-center justify-center">
                    <button className="mt-3 tracking-[-0.052em] block text-base font-semibold gradient-text">
                        Details
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default StakingCard;