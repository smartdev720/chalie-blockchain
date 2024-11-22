import React, {useEffect, useState} from "react";
import "./style.css";
import Dropdown from "../Dropdown";
import InputField from "../InputField";
import useStaking from "../../../hooks/useStaking";
import { useWallet } from "../../../context/WalletContext";
import { REQUIRED_CHAIN_ID } from "../../../constant/wallets";
import { toast } from "react-toastify";

type StakingModalItemType = {
    apy: number;
    rewardRate: number;
    extendPercents: number[] | null;
}

interface StakingModalProps {
    isOpen: boolean;
    onClose: () => void;
    info: StakingModalItemType | any
}

const StakingModal: React.FC<StakingModalProps> = ({isOpen, onClose, info}) => {
    const [stakeAmount, setStakeAmount] = useState<string>("");
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

    const {stakeToken} = useStaking();
    const {balance, chainId} = useWallet();

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setStakeAmount("");
            onClose();
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setStakeAmount(e.target.value);

    const handleStakeClick = async () => {
        debugger;
        if(balance && chainId === REQUIRED_CHAIN_ID) {
            if(Number(balance) >= Number(stakeAmount)) {
                const staked = await stakeToken(stakeAmount, info.apy);
                if(staked) {
                    setStakeAmount("");
                    onClose();
                }
            }
        }
        // if (balance) {
        //     if(chainId === REQUIRED_CHAIN_ID) {
        //         const userBalance = balance.data?.value;
        //         const sAmount = BigInt(stakeAmount);
        //         if (userBalance && sAmount) {
        //             const userBalanceInWei = ethers.parseUnits(userBalance.toString(), 18);
        //             const stakeAmountInWei = ethers.parseUnits(stakeAmount.toString(), 18);
        //             if (userBalanceInWei >= stakeAmountInWei) {
        //                 // const staked = await stakeToken(stakeAmount, info.apy);
        //                 // if(staked) {
        //                 //     onClose();
        //                 // }
        //             }
        //         }
        //     } else {
        //         toast.info("Please change your current chain in your wallet");
        //     }
        // }
    }

    useEffect(() => {
        if(stakeAmount && !isNaN(Number(stakeAmount))) {
            setBtnDisabled(false);
        } else{
            setBtnDisabled(true);
        }
    }, [stakeAmount]);
    
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
                    {/* <Dropdown menus={} /> */}
                    {!info.extendPercents &&
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
                            <div className={`stake-button-wrapper h-[54px] mt-10 w-full relative ${btnDisabled ? "bg-[#212121]" : "bg-gradient"}`}>
                                <div className={`stake-button-wrapper inset-[3px] absolute ${btnDisabled ? "bg-[#212121]" : "bg-white"}`}>
                                    <button 
                                        className={`stake-button-wrapper inset-[1px] transition-all duration-300 ease-in-out ${btnDisabled ? "cursor-not-allowed text-[#444444]" : "cursor-pointer text-white bg-gradient"} absolute  text-base`} 
                                        disabled={btnDisabled}
                                        onClick={handleStakeClick}
                                    >
                                        Stake
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