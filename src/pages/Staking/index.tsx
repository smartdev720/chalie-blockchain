import React, { useEffect, useState } from "react";
import "./style.css";
import Switch from "../../components/common/Switch";
import Toggle from "../../components/common/Toggle";
import Search from "../../components/common/Search";
import Dropdown from "../../components/common/Dropdown";
import StakingCardGroup from "../../components/common/StakingCardGroup";
import useStaking from "../../hooks/useStaking";
import { StakesType } from "../../types/stakeTypes";
import { initialStakingCardGroup } from "../../constant/staking";
import StakingModal from "../../components/common/StakingModal";

const Staking = () => {
    const [history, setHistory] = useState<StakesType[] | null>(null);
    const [stakedToggleOn, setStakedToggleOn] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState<any>(false);
    const {stakeHistory} = useStaking();

    useEffect(() => {
        if (stakeHistory) {
            const sHistory: StakesType[] = initialStakingCardGroup.map((stake: StakesType) => {
                const selectedHistory = stakeHistory.find((history: StakesType) => history.apy === stake.apy);
                return selectedHistory ? selectedHistory : stake;
            });
            setHistory(sHistory);
        } else {
            setHistory(initialStakingCardGroup);
        }
    }, [stakeHistory]);

    useEffect(() => {
        if(stakedToggleOn) setHistory(stakeHistory);
        else {
            if (stakeHistory) {
                const sHistory: StakesType[] = initialStakingCardGroup.map((stake: StakesType) => {
                    const selectedHistory = stakeHistory.find((history: StakesType) => history.apy === stake.apy);
                    return selectedHistory ? selectedHistory : stake;
                });
                setHistory(sHistory);
            } else {
                setHistory(initialStakingCardGroup);
            }
        }
    }, [stakedToggleOn]);

    return (
        <div className="2xl:w-[90%] xl:x-[90%] lg:w-full mx-auto mt-20">
            {/* Title bar */}
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl text-white text-center font-semibold">Farms</h1>
                <p className="text-base font-normal text-center text-white/50 mt-2">Stake your LP Token to earn CHARLIE</p>
            </div>
            {/* Filter bar */}
            <div className="filter-wrapper relative bg-[#444444] h-[245px] 2xl:h-[72px] xl:h-[72px] lg:h-[72px] md:h-[245px] sm:h-[245px] top-10">
                <div className="inset-[1px] filter-wrapper flex flex-row items-center justify-between absolute bg-[#1C1C1C] px-5">
                    <div className="hidden 2xl:block xl:block lg:block md:hidden sm:hidden w-full">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex items-center flex-row gap-4 2xl:basis-1/3 xl:basis-1/2">
                                <div className="flex flex-row items-center justify-between gap-4">
                                    <span className="text-white text-base font-normal">Staked only</span>
                                    <Switch isOn={stakedToggleOn} setIsOn={setStakedToggleOn} />
                                </div>
                                <div>
                                    <Toggle tab1="Active" tab2="Liquidity" />
                                </div>
                            </div>
                            <div className="flex flex-row gap-4 items-center justify-between 2xl:basis-1/3 xl:basis-1/2">
                                <span></span>
                                <Search />
                            </div>
                        </div>
                        
                    </div>
                    <div className="block 2xl:hidden xl:hidden lg:hidden md:block sm:block w-full">
                        <div className="flex items-center justify-between">
                            <span className="text-white text-base font-normal">Staked only</span>
                            <Switch isOn={stakedToggleOn} setIsOn={setStakedToggleOn} />
                        </div>
                        <div className="w-full mt-4">
                            <Toggle tab1="Active" tab2="Liquidity" />
                        </div>
                        <div className="w-full mt-[66px]">
                            <Search />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between px-5 mt-[-135px] 2xl:mt-[-13px] xl:mt-[-13px] lg:mt-[-13px] md:mt-[-135px] sm:mt-[-135px]">
                <div className=""></div>
                <div className="2xl:flex xl:flex lg:flex flex-row items-center justify-between md:hidden sm:hidden">
                    <div className="flex flex-row 2xl:gap-4 xl:gap-4 lg:gap-4 md:gap-0 sm:gap-0 items-center justify-between">
                        <Dropdown menus={["APR", "Multiplier", "Earned", "Liquidity", "Fees"]} />
                        <span className="2xl:w-[200px] xl:w-[200px] lg:w-[200px] md:w-0 sm:w-0"></span>
                    </div>
                </div>
                <div className="w-full mt-[60px] block 2xl:hidden xl:hidden lg:hidden md:block sm:block">
                    <div className="flex flex-row 2xl:gap-4 xl:gap-4 lg:gap-4 md:gap-0 sm:gap-0 items-center justify-between">
                        <Dropdown menus={["APR", "Multiplier", "Earned", "Liquidity", "Fees"]} />
                        <span className="2xl:w-[200px] xl:w-[200px] lg:w-[200px] md:w-0 sm:w-0"></span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-[92px] 2xl:mt-4 xl:mt-4 lg:mt-4 md:mt-[92px] sm:mt-[92px]">
                <StakingCardGroup items={history} setModalOpen={setModalOpen} setModalInfo={setModalInfo} />
            </div>
            <StakingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} info={modalInfo} />
        </div>
    );
}

export default Staking;