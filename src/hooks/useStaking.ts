import { useState, useEffect } from "react";
import useContract from "./useContract";
import { StakesType } from "../types/stakeTypes";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";
import { REQUIRED_CHAIN_ID } from "../constant/wallets";
import useToken from "./useToken";
import { toast } from "react-toastify";

const useStaking = () => {
    const [stakeHistory, setStakeHistory] = useState<StakesType[] | null>(null);
    const [reloadHistory, setReloadHistory] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const {staking, token} = useContract();
    const {chainId} = useWallet();
    const {ensureTokenApprove} = useToken();

    const getStakeHistory = async () => {
        try {
            setLoading(true);
            if(staking) {
                const stakesHistory = await staking.getMyStakedHistory();
                const formattedHistory: StakesType[] = stakesHistory.map((stake: StakesType) => {
                // Convert amounts from BigInt (Wei) to Ether
                const stakedAmountEth = ethers.formatUnits(stake.stakedAmount, 18); // Convert Wei to Ether
                const withdrawAmountEth = ethers.formatUnits(stake.withdrawAmount, 18); // Convert Wei to Ether
                const rewardAmountEth = ethers.formatUnits(stake.rewardAmount, 18); // Convert Wei to Ether
                
                // Format the Unix timestamp into a readable date string
                // const startDate = new Date(Number(stake.start) * 1000); // Convert seconds to milliseconds

                return {
                    stakedAmount: parseFloat(stakedAmountEth), // Convert string to number
                    withdrawAmount: parseFloat(withdrawAmountEth), // Convert string to number
                    rewardAmount: parseFloat(rewardAmountEth), // Convert string to number
                    start: Number(stake.start), // Formatted date string
                    apy: Number(stake.apy), // Convert BigInt to number
                    rewardRate: Number(stake.rewardRate), // Convert BigInt to number
                };
                });
                setStakeHistory(formattedHistory);
                setReloadHistory((prev) => !prev);
            }
        } catch(error: any) {
            if (error.reason) {
                toast.error(error.reason);
            } else {
                toast.error("An unexpected error occurred. Check the console for details.");
            }
            setStakeHistory(null);
        } finally{ 
            setLoading(false);
        }
    }

    const stakeToken = async (amount: bigint, lockPeriod: number): Promise<boolean | any> => {
        try {
            if (!staking || !token) throw new Error("Contract not initialized");
            if(chainId === REQUIRED_CHAIN_ID) {
                setLoading(true);
                // Test mode
                const lockPeriodInSeconds = lockPeriod;

                const approved = await ensureTokenApprove(amount);
                if(approved) {
                    const tx = await staking.stake(amount, lockPeriodInSeconds);
                    console.log("Transaction sent:", tx.hash);
        
                    const receipt = await tx.wait();
                    console.log("Transaction mined:", receipt);
                    
                    const event = receipt.events?.find((e: any) => e.event === "Staked");
                    if (event) {
                        const [user, amount, lockPeriod] = event.args;
                        console.log(`User ${user} staked ${amount} tokens for ${lockPeriod} seconds.`);
                    }
                    return true;
                }
            }
            return false;
        } catch(error: any) {
            if (error.reason) {
                toast.error(error.reason);
            } else {
                toast.error("An unexpected error occurred. Check the console for details.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(staking && token) {
            getStakeHistory();
        }
    }, [staking, reloadHistory]);
    
    return {stakeHistory, loading, stakeToken};
}

export default useStaking;