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

    const {staking, token} = useContract();
    const {chainId} = useWallet();
    const {ensureTokenApprove} = useToken();

    const getStakeHistory = async () => {
        try {
            if(staking) {
                debugger
                const stakesHistory = await staking.getMyStakedHistory();
                if(stakesHistory) {
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
                } else {
                    setStakeHistory(null);
                }
            }
        } catch(error: any) {
            console.error(error);
            if (error.reason) {
                toast.error(error.reason);
            } else {
                toast.error("An unexpected error occurred. Check the console for details.");
            }
            setStakeHistory(null);
        }
    }

    // Stake token
    const stakeToken = async (amount: bigint, lockPeriod: number): Promise<boolean | any> => {
        try {
            debugger
            if (!staking || !token) throw new Error("Contract not initialized");
            if(chainId === REQUIRED_CHAIN_ID) {
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
            } else {
                toast.error("Please change your chain into CHRLE");
            }
            return false;
        } catch(error: any) {
            if (error.reason) {
                toast.error(error.reason);
            } else {
                toast.error("An unexpected error occurred. Check the console for details.");
            }
        }
    }

    // Claim token
    const claimToken = async (leftStakedPercent: number, lockPeriod: number): Promise<any> => {
        try {
            if (!staking || !token) throw new Error("Contract not initialized");
            debugger;
            if (chainId === REQUIRED_CHAIN_ID) {

                // Test mode
                const lockPeriodInSeconds = lockPeriod;
    
                // Send transaction
                const tx = await staking.withdraw(lockPeriodInSeconds, leftStakedPercent);
    
                // Wait for transaction confirmation
                const receipt = await tx.wait();
    
                // Parse the emitted `Withdraw` event from the receipt
                const withdrawEvent = receipt.events?.find((event: any) => event.event === "Withdraw");
    
                if (withdrawEvent) {
                    const [user, withdrawableAmount] = withdrawEvent.args;
                    console.log(`Withdraw Event Detected: User=${user}, Amount=${withdrawableAmount.toString()}`);
                    return {
                        user,
                        withdrawableAmount: ethers.formatUnits(withdrawableAmount, 18),
                    };
                } else {
                    console.warn("Withdraw event not found in transaction receipt.");
                    return null;
                }
            } else {
                toast.error("Please change your chain into CHRLE");
                return null;
            }
        } catch (error: any) {
            if (error.reason) {
                toast.error(error.reason);
            } else {
                toast.error("An unexpected error occurred. Check the console for details.");
            }
            return null;
        }
    };
    
    // const claimToken = async ()

    useEffect(() => {
        if(staking && token) {
            getStakeHistory();
        }
    }, [staking, reloadHistory]);
    
    return {stakeHistory, stakeToken, claimToken};
}

export default useStaking;