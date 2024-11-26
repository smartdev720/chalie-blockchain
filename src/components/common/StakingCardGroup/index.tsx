import React, { useEffect, useState } from "react";
import "./style.css";
import { StakesType } from "../../../types/stakeTypes";
import { useWallet } from "../../../context/WalletContext";
import { extendPercentsOf, isValidWithdraw, formatTime } from "../../../lib/stake";
import { useStaking } from "../../../context/StakingContext";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

interface StakingCardProps {
    items: StakesType[] | null;
    setModalOpen: (value: boolean) => void;
    setModalInfo: (info: any) => void; 
}

const StakingCardGroup: React.FC<StakingCardProps> = ({ items, setModalOpen, setModalInfo }) => {
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const [remainingTimes, setRemainingTimes] = useState<{ [key: number]: number }>({});
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const {isConnected} = useWallet();
    
    const {unstakeToken} = useStaking();

    const handleStakeClick = (apy: number, rewardRate: number) => {
        const info = {apy, rewardRate};
        setModalInfo(info);
        setModalOpen(true);
    }

    const handleClaimClick = (apy: number, rewardRate: number, extendPercents: number[]) => {
        const info = {apy, rewardRate, extendPercents};
        setModalInfo(info);
        setModalOpen(true);
    }

    const handleUnstakeClick = async (index: number, apy: number) => {
        try {
            setLoading((prev) => ({ ...prev, [index]: true }));
            const unstakedAmount = await unstakeToken(apy);
            if(unstakedAmount) {
                toast.success(`Thank you for your unstaking ${unstakedAmount}. We are missing you.`);
            }
        } catch(error: any) {
            toast.error(error.reason || "An error occurred while unstaking.");
        } finally {
            setLoading((prev) => ({ ...prev, [index]: false }));
        }
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
          setRemainingTimes((prevTimes) => {
            const updatedTimes = { ...prevTimes };
            Object.keys(updatedTimes).forEach((index) => {
              if (updatedTimes[+index] > 0) {
                updatedTimes[+index] -= 1;
              }
            });
            return updatedTimes;
          });
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      useEffect(() => {
        if (items) {
            debugger;
          const initialTimes: { [key: number]: number } = {};
          items.forEach((item, index) => {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const timeRemaining = item.apy - (currentTimestamp - item.start);
            initialTimes[index] = Math.max(timeRemaining, 0);
          });
          setRemainingTimes(initialTimes);
        }
      }, [items]);

    return (
        <>
            {items &&
                items.map((item, index) => {
                    const isWithdrawValid = isValidWithdraw(item.start, item.apy);
                    const remainingTime = remainingTimes[index];
                    return (
                        <div
                            className={`relative w-full transition-all duration-300 ease-in-out ${(item.stakedAmount !== 0 && item.rewardAmount === 0) ? "h-[505px] 2xl:h-[505px] xl:h-[505px] lg:h-[505px] md:h-[517px] sm:h-[517px]" : "h-[450px] 2xl:h-[438px] xl:h-[438px] lg:h-[438px] md:h-[450px] sm:h-[450px]"} mt-4`}
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
                                                <img src="./assets/cardLogo.svg" alt="cardLogo" />
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
                                                <span className="text-white text-base font-normal">{item.rewardRate}%</span>
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
                                                {item.rewardAmount === 0 &&
                                                    <div className={`connect-wallet-wrapper h-[54px] mt-4 w-full relative ${isWithdrawValid ? "bg-gradient" : "bg-[#212121]"}`}>
                                                        <div className={`connect-wallet-container absolute ${isWithdrawValid ? "bg-white" : "bg-[#444444]"}`}>
                                                            <button 
                                                                className={`${isWithdrawValid ? "cursor-pointer text-white bg-gradient" : "cursor-not-allowed bg-[#212121] text-[#444444]"} absolute  text-base`}
                                                                disabled={!isWithdrawValid}
                                                                onClick={() => {handleClaimClick(item.apy, item.rewardRate, extendPercentsOf(item.apy))}}
                                                            >
                                                                Claim {!isWithdrawValid && formatTime(remainingTime)}
                                                            </button>
                                                        </div>
                                                    </div>
                                                }
                                                <div
                                                    className={`connect-wallet-wrapper h-[54px] mt-4 w-full relative ${
                                                        loading[index]
                                                            ? "bg-[#212121]"
                                                            : isWithdrawValid
                                                            ? "bg-gradient"
                                                            : "bg-[#212121]"
                                                    }`}
                                                >
                                                    <div
                                                        className={`connect-wallet-container absolute ${
                                                            loading[index]
                                                                ? "bg-[#444444]"
                                                                : isWithdrawValid
                                                                ? "bg-white"
                                                                : "bg-[#444444]"
                                                        }`}
                                                    >
                                                        <button
                                                            className={`absolute flex items-center justify-center text-base ${
                                                                loading[index]
                                                                    ? "cursor-not-allowed text-[#444444] bg-[#212121]"
                                                                    : isWithdrawValid
                                                                    ? "cursor-pointer text-white bg-gradient"
                                                                    : "cursor-not-allowed text-[#444444] bg-[#212121]"
                                                            }`}
                                                            disabled={!isWithdrawValid || loading[index]}
                                                            onClick={() => handleUnstakeClick(index, item.apy)}
                                                        >
                                                            Unstake {!isWithdrawValid && formatTime(remainingTime)} {loading[index] && <Spinner size={20} margin={12} />}
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
                    );
                })}
        </>
    );
};

export default StakingCardGroup;
