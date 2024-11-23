import React, {useCallback, useEffect, useState} from "react";
import "./style.css";
import Dropdown from "../Dropdown";
import InputField from "../InputField";
import useStaking from "../../../hooks/useStaking";
import { useWallet } from "../../../context/WalletContext";
import { toast } from "react-toastify";
import useToken from "../../../hooks/useToken";
import { ethers } from "ethers";
import Spinner from "../Spinner";
import {FaPercent} from "react-icons/fa";
import {extaRewardRateOf} from "../../../lib/stake";

type StakingModalItemType = {
    apy: number;
    rewardRate: number;
    extendPercents: number[] | null;
}

interface StakingModalProps {
    isOpen: boolean;
    onClose: () => void;
    info: StakingModalItemType | any;
    onStakedSuccess: (stakedAmount: string, apy: number, rewardRate: number) => void;
}

const StakingModal: React.FC<StakingModalProps> = ({isOpen, onClose, info, onStakedSuccess}) => {
    const [stakeAmount, setStakeAmount] = useState<string>("");
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);
    const [selectedPercent, setSelectedPercent] = useState<number>(100);
    const [extraPercent, setExtraPercent] = useState<string>("0");
    const {stakeToken, claimToken} = useStaking();
    const {account} = useWallet();
    const {balanceOf} = useToken();

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setStakeAmount("");
            setSelectedPercent(100);
            setExtraPercent("0");
            setBtnDisabled(true);
            onClose();
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setStakeAmount(e.target.value);

    const handleStakeClick = async () => {
        try {
            if(account) {
                setLoading(true);
                const balance = await balanceOf(account);
                const balanceInWei = ethers.parseUnits(balance as string, 18);
                const stakeAmountInWei = ethers.parseUnits(stakeAmount, 18);
                if(balanceInWei >= stakeAmountInWei) {
                    const staked = await stakeToken(stakeAmountInWei, info.apy);
                    if(staked) {
                        onStakedSuccess(stakeAmount, info.apy, info.rewardRate);
                        toast.success(`Thank you for your staking ${stakeAmount} CHRLE`);
                        setStakeAmount("");
                        onClose();
                    }
                } else {
                    toast.warning("Your amount is not required for current staking amount");
                }
            }
        } catch(error) {
            toast.error("An unexpected error occurred. Check the console for details.");
        } finally {
            setLoading(false);
        }
    }
    
    const handleClaimClick = async () => {
        try {
            setLoading(true);
            const claimData = await claimToken(selectedPercent, info.apy);
            if(claimData) {
                // toast.success(`Thank you for your restaking amount ${} CHRLE`);
                setSelectedPercent(100);
                setExtraPercent("0");
                onClose();
            }
        } catch {
            toast.error("Unexpected error");
        } finally {
            setLoading(false);
        }
    }

    
    const handleSelectPercent = (percent: any) => {
        const extra = extaRewardRateOf(info.apy, percent);
        setSelectedPercent(percent);
        setExtraPercent(extra);
    }


    useEffect(() => {
        if(!info.extendPercents) {
            if(stakeAmount && !isNaN(Number(stakeAmount))) {
                setBtnDisabled(false);
            } else{
                setBtnDisabled(true);
            }
        } else {

        }
    }, [stakeAmount]);

    useEffect(() => {
        if (isOpen && info.apy && info.extendPercents) {
            const initialExtraPercent = extaRewardRateOf(info.apy, selectedPercent);
            setExtraPercent(initialExtraPercent);
        }
    }, [isOpen, info.apy, info.extendPercents, selectedPercent]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-80"
                onClick={handleBackdropClick}
            ></div>

            <div className={`relative w-[361px] h-[280px] 2xl:w-[600px] xl:w-[600px] lg:w-[600px] md:w-[600px] sm:w-[361px] modal-wrapper z-10 max-w-md p-6 bg-gradient-br shadow-lg transform transition-transform duration-300`}>
                <div className="absolute modal-wrapper inset-[1px] bg-[#1B1B1B] p-10">
                    
                    {!info.extendPercents ?
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <span className="tracking-[-0.052em] text-base font-semibold gradient-text">
                                    APY :
                                </span>
                                <span className="text-white text-base font-normal">{info.rewardRate}</span>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="tracking-[-0.052em] text-base font-semibold gradient-text">
                                    Harvest Lockup :
                                </span>
                                <span className="text-white text-base font-normal">{info.apy} days</span>
                            </div>
                            <div className="mb-4">
                                <InputField onChange={handleOnChange} value={stakeAmount} placeholder="Stake Amount" />
                            </div>
                            <div className={`stake-button-wrapper h-[54px] mt-10 w-full relative ${(btnDisabled) ? "bg-[#212121]" : "bg-gradient"}`}>
                                <div className={`stake-button-wrapper inset-[3px] absolute ${(btnDisabled) ? "bg-[#212121]" : "bg-white"}`}>
                                    <button 
                                        className={`stake-button-wrapper flex items-center justify-center inset-[1px] transition-all duration-300 ease-in-out ${(btnDisabled) ? "cursor-not-allowed text-[#444444]" : "cursor-pointer text-white bg-gradient"} absolute  text-base`} 
                                        disabled={(btnDisabled || loading)}
                                        onClick={handleStakeClick}
                                    >
                                        Stake {loading && <Spinner size={20} margin={12} />}
                                    </button>
                                </div>
                            </div>
                        </>
                        : <>
                            <div className="flex items-center justify-between mt-4">
                                <span className="tracking-[-0.052em] text-base font-semibold gradient-text">
                                    APY :
                                </span>
                                <span className="text-white text-base font-normal">{info.apy} days</span>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="tracking-[-0.052em] text-base font-semibold gradient-text">
                                    Remaining :
                                </span>
                                <div className="flex flex-row gap-4 items-center">
                                    <Dropdown menus={info.extendPercents} width={200} setSelected={handleSelectPercent} selected={selectedPercent} />
                                    <FaPercent size={12} color="white" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="tracking-[-0.052em] text-base font-semibold gradient-text">
                                    Extra Staking Percent :
                                </span>
                                <div className="flex flex-row items-center">
                                    <span className="text-white text-base font-normal mr-2">
                                        {extraPercent}
                                    </span>
                                    <FaPercent size={12} color="white" />
                                </div>
                                
                            </div>
                            <div className={`stake-button-wrapper h-[54px] mt-6 w-full relative bg-gradient`}>
                                <div className={`stake-button-wrapper inset-[3px] absolute bg-white`}>
                                    <button 
                                        className={`stake-button-wrapper flex items-center justify-center inset-[1px] transition-all duration-300 ease-in-out cursor-pointer text-white bg-gradient absolute  text-base`} 
                                        onClick={handleClaimClick}
                                    >
                                        Claim {loading && <Spinner size={20} margin={12} />}
                                    </button>
                                    </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default StakingModal;