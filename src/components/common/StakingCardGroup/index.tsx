import React, { useEffect, useState } from "react";
import "./style.css";
import { StakesType } from "../../../types/stakeTypes";
import { useWallet } from "../../../context/WalletContext";
import { isValidWithdraw } from "../../../lib/stake";

interface StakingCardProps {
    items: StakesType[] | null;
    setModalOpen: (value: boolean) => void;
    setModalInfo: (info: any) => void; 
}

const StakingCardGroup: React.FC<StakingCardProps> = ({ items, setModalOpen, setModalInfo }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const {isConnected} = useWallet();
    

    const handleStakeClick = (apy: number, rewardRate: number) => {
        const info = {apy, rewardRate};
        setModalInfo(info);
        setModalOpen(true);
    }

    return (
        <>
            {items &&
                items.map((item, index) => (
                    <div
                        className={`relative w-full transition-all duration-300 ease-in-out ${item.stakedAmount !== 0 ? "h-[505px] 2xl:h-[505px] xl:h-[505px] lg:h-[505px] md:h-[517px] sm:h-[517px]" : "h-[450px] 2xl:h-[438px] xl:h-[438px] lg:h-[438px] md:h-[450px] sm:h-[450px]"} mt-4`}
                        key={index}
                    >
                        {/* Hover effect */}
                        <div
                            className={`-inset-2 blur-effect transition-all duration-300 ease-in-out ${
                                hoveredIndex === index ? "blur-effect-hover absolute" : "hidden"
                            }`}
                            style={{ filter: "blur(8px)" }}
                        >
                            <div className="w-full h-full opacity-30 staking-card-shadow bg-gradient-br"></div>
                        </div>

                        {/* Staking card */}
                        <div
                            className="staking-card-wrapper relative w-full h-full bg-gradient-br transition-all ease-in-out duration-300"
                            onMouseOver={() => {
                                if (item.apy) setHoveredIndex(index); // Set hovered index
                            }}
                            onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index
                        >
                            <div className="staking-card-container absolute bg-[#1C1C1C] opacity-90 flex flex-col p-4">
                                <div className="staking-card-header w-full">
                                    <div className="wrapper w-full h-full p-[1px] flex items-center justify-center bg-gradient">
                                        <div className="container bg-[#2B2B2B] opacity-90 p-4 flex items-center justify-between">
                                            <img src="./assets/bitcoin.svg" alt="bitcoin" />
                                            <div className="flex items-center justify-between">
                                                <span className="text-white text-base font-semibold mr-2">
                                                    CHRLE
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card content */}
                                <div className="w-full mt-6">
                                    <div className="w-full flex flex-col">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[#747474] text-base font-normal">APY:</span>
                                            <span className="text-white text-base font-normal">{item.rewardRate}</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[#747474] text-base font-normal">Earn:</span>
                                            <span className="text-white text-base font-normal">CHRLE</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[#747474] text-base font-normal">Deposit Fee:</span>
                                            <span className="text-white text-base font-normal">0%</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[#747474] text-base font-normal">Harvest Lockup:</span>
                                            <span className="text-white text-base font-normal">{item.apy} days</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="tracking-[-0.052em] text-base font-semibold gradient-text">
                                                CHRLE
                                            </span>
                                            <span className="text-white text-base font-normal">Earned</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xl font-semibold text-[#747474]">{item.stakedAmount} CHRLE</span>
                                            <span className="bg-[#242424] font-semibold text-base info-container px-2 py-1 text-[#747474]">
                                                Harvest
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="tracking-[-0.052em] text-base font-semibold gradient-text">
                                                CHRLE
                                            </span>
                                            <span className="text-white text-base font-normal">Staked</span>
                                        </div>
                                    </div>

                                    {/* Connect wallet */}
                                    {item.stakedAmount !== 0 ? 
                                        <>
                                            <div className={`connect-wallet-wrapper h-[54px] mt-4 w-full relative ${isValidWithdraw(item.start, item.apy) ? "bg-gradient" : "bg-[#212121]"}`}>
                                                <div className={`connect-wallet-container absolute ${isValidWithdraw(item.start, item.apy) ? "bg-white" : "bg-[#444444]"}`}>
                                                    <button 
                                                        className={`${isValidWithdraw(item.start, item.apy) ? "cursor-pointer text-white bg-gradient" : "cursor-not-allowed bg-[#212121] text-[#444444]"} absolute  text-base`}
                                                        disabled={!isValidWithdraw(item.start, item.apy)}
                                                    >
                                                        Claim
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={`connect-wallet-wrapper h-[54px] mt-4 w-full relative ${isValidWithdraw(item.start, item.apy) ? "bg-gradient" : "bg-[#212121]"}`}>
                                                <div className={`connect-wallet-container absolute ${isValidWithdraw(item.start, item.apy) ? "bg-white" : "bg-[#444444]"}`}>
                                                    <button 
                                                        className={`${isValidWithdraw(item.start, item.apy) ? "cursor-pointer text-white bg-gradient" : "cursor-not-allowed bg-[#212121] text-[#444444]"} absolute  text-base`}
                                                        disabled={!isValidWithdraw(item.start, item.apy)}
                                                    >
                                                        Unstake
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                        : 
                                        <div className="connect-wallet-wrapper h-[54px] mt-4 w-full relative bg-gradient">
                                            <div className="connect-wallet-container bg-white absolute">
                                                {!isConnected ? 
                                                    <button className="cursor-pointer absolute text-white text-base bg-gradient">
                                                        Connect wallet
                                                    </button>
                                                :   <button className="cursor-pointer absolute text-white text-base bg-gradient" onClick={() => handleStakeClick(item.apy, item.rewardRate)}>
                                                        Stake
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    }

                                    {/* Details button */}
                                    <div className="flex items-center justify-center">
                                        <button className="mt-3 tracking-[-0.052em] block text-base font-semibold gradient-text">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default StakingCardGroup;
