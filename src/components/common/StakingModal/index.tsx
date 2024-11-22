import React, {useEffect, useState} from "react";
import "./style.css";
import Dropdown from "../Dropdown";
import InputField from "../InputField";
import useStaking from "../../../hooks/useStaking";
import { useWallet } from "../../../context/WalletContext";
import { REQUIRED_CHAIN_ID } from "../../../constant/wallets";
import { toast } from "react-toastify";
import { useReadContract } from "wagmi";
import tokenABI from "../../../contracts/TokenA.json";
import useContract from "../../../hooks/useContract";
import useToken from "../../../hooks/useToken";
import { ethers } from "ethers";
import Spinner from "../Spinner";

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
    const [loading, setLoading] = useState(false);
    const {stakeToken} = useStaking();
    const {token} = useContract();
    const {chainId, account} = useWallet();
    const {balanceOf} = useToken();

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setStakeAmount("");
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
                                        className={`stake-button-wrapper flex items-center justify-center inset-[1px] transition-all duration-300 ease-in-out ${btnDisabled ? "cursor-not-allowed text-[#444444]" : "cursor-pointer text-white bg-gradient"} absolute  text-base`} 
                                        disabled={btnDisabled}
                                        onClick={handleStakeClick}
                                    >
                                        Stake {loading && <Spinner size={20} margin={12} />}
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