import { useState, useEffect } from "react";
import useContract from "./useContract";
import { StakesType } from "../types/stakeTypes";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";
import { REQUIRED_CHAIN_ID } from "../constant/wallets";
import { STAKING_CONTRACT_ADDRESS } from "../constant/contract";
import { toast } from "react-toastify";

const useStaking = () => {
    const [stakeHistory, setStakeHistory] = useState<StakesType[] | null>(null);
    const [reloadHistory, setReloadHistory] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const {staking, token} = useContract();
    const {chainId} = useWallet();

    const ensureTokenApprove = async (amount: bigint) => {
        try {
            if(!token) throw new Error("Invalid Token Approve");
            const txApprove = await token.approve(STAKING_CONTRACT_ADDRESS, amount); 
            await txApprove.wait();
        } catch(error) {
            console.error("Invalid Token Approve : ", error);
        }
    }

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
        } catch(error) {
            
            console.error(error);
            setStakeHistory(null);
        } finally{ 
            setLoading(false);
        }
    }

    const stakeToken = async (amount: string, lockPeriod: number): Promise<boolean | any> => {
        try {
            if (!staking || !token) throw new Error("Contract not initialized");
            if(chainId === REQUIRED_CHAIN_ID) {
                setLoading(true);
                const amountInWei = ethers.parseUnits(amount, 18);

                // Test mode
                const lockPeriodInSeconds = lockPeriod;
                
                // const txApprove = await token.approve(STAKING_CONTRACT_ADDRESS, amountInWei);
                // await txApprove.wait();

                await ensureTokenApprove(amountInWei);

                const tx = await staking.stake(amountInWei, lockPeriodInSeconds);
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
            return false;
        } catch(error: any) {
            if (error.reason) {
                console.error("Revert reason:", error.reason);
                alert(`Error: ${error.reason}`);
            } else {
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred. Check the console for details.");
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