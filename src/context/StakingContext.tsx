import React, {useContext, createContext, useEffect, ReactNode, useState} from "react";
import { StakesType } from "../types/stakeTypes";
import useContract from "../hooks/useContract";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useWallet } from "./WalletContext";
import { REQUIRED_CHAIN_ID } from "../constant/wallets";
import useToken from "../hooks/useToken";

interface StakingContextProps {
    stakeHistory: StakesType [] | null;
    stakeToken: (amount: bigint, lockPeriod: number) => Promise<boolean | any>;
    claimToken: (leftStakedPercent: number, lockPeriod: number) => Promise<boolean | number>;
    unstakeToken: (lockPeriod: number) => Promise<boolean | number>;
}

const StakingContext = createContext<StakingContextProps | undefined>(undefined);

export const useStaking = (): StakingContextProps => {
    const context = useContext(StakingContext);
    if (!context) {
      throw new Error("useWallet must be within a WalletProvider");
    }
    return context;
};

interface StakingProviderProps {
    children: ReactNode
}

export const StakingProvider: React.FC<StakingProviderProps> = ({children}) => {
    const [stakeHistory, setStakeHistory] = useState<StakesType[] | null>(null);

    const {staking, token} = useContract();
    const {chainId, isDisconnected} = useWallet();

    const {ensureTokenApprove} = useToken();

    const getStakeHistory = async () => {
        try {
            if(staking) {
                const stakesHistory = await staking.getMyStakedHistory();
                if(stakesHistory) {
                    const formattedHistory: StakesType[] = stakesHistory.map((stake: StakesType) => {
                        // Convert amounts from BigInt (Wei) to Ether
                        const stakedAmountEth = ethers.formatUnits(stake.stakedAmount, 18); // Convert Wei to Ether
                        const withdrawAmountEth = ethers.formatUnits(stake.withdrawAmount, 18); // Convert Wei to Ether
                        const rewardAmountEth = ethers.formatUnits(stake.rewardAmount, 18); // Convert Wei to Ether
                        
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
                } else {
                    setStakeHistory(null);
                }
            }
        } catch(error: any) {
            console.error(error);
            if (error.reason) {
                toast.error(error.reason);
            }
            setStakeHistory(null);
        }
    }

    // Stake token
    const stakeToken = async (amount: bigint, lockPeriod: number): Promise<boolean | any> => {
        try {
            if (!staking || !token) throw new Error("Contract not initialized");
            if(chainId === REQUIRED_CHAIN_ID) {
                const approved = await ensureTokenApprove(amount);
                if(approved) {
                    const tx = await staking.stake(amount, lockPeriod);
                    await tx.wait();
                    await getStakeHistory();
                    return true;
                }
            } else {
                toast.error("Please change your chain into CHRLE");
            }
            return false;
        } catch(error: any) {
            console.error(error);
            if (error.reason) {
                toast.error(error.reason);
            }
        }
    }

    const claimToken = async (leftStakedPercent: number, lockPeriod: number): Promise<boolean | number> => {
        try {
            if (!staking || !token) throw new Error("Contract not initialized");
            if (chainId === REQUIRED_CHAIN_ID) {
    
                // Send the transaction
                const tx = await staking.withdraw(lockPeriod, leftStakedPercent);
    
                // Wait for transaction confirmation
                const receipt = await tx.wait();
    
                // Set up the filter for the Withdraw event
                const filter = staking.filters.Withdraw(); // Adjust the filter arguments as needed
                const logs = await staking.queryFilter(filter, receipt.blockNumber, receipt.blockNumber);
    
                let withdrawableMoney = 0;
    
                if (logs.length > 0) {
                    // Parse the logs to extract event arguments
                    const event = staking.interface.parseLog(logs[0]);
                    if (event && event.args) {
                        withdrawableMoney = parseFloat(ethers.formatUnits(event.args[1], 18)); // Assuming amount is the second argument
                    }
                } else {
                    toast.warn("No Withdraw event found in the transaction logs.");
                }
    
                // Refresh stake history
                await getStakeHistory();
    
                return withdrawableMoney;
            } else {
                toast.error("Please change your chain into CHRLE");
            }
            return false;
        } catch (error: any) {
            console.error(error);
            if (error.reason) {
                toast.error(error.reason);
            }
            return false;
        }
    };

    const unstakeToken = async (lockPeriod: number): Promise<boolean | number> => {
        try {
            if (!staking || !token) throw new Error("Contract not initialized");
            if (chainId === REQUIRED_CHAIN_ID) {
                
                // Send the transaction
                const tx = await staking.unstake(lockPeriod);
                // Wait for transaction confirmation
                const receipt = await tx.wait();
    
                // Set up the filter for the Unstaked event
                const filter = staking.filters.Unstaked(); // Adjust the filter arguments as needed
                const logs = await staking.queryFilter(filter, receipt.blockNumber, receipt.blockNumber);
    
                let UnstakedMoney = 0;
                debugger;
    
                if (logs.length > 0) {
                    // Parse the logs to extract event arguments
                    const event = staking.interface.parseLog(logs[0]);
                    if (event && event.args) {
                        UnstakedMoney = parseFloat(ethers.formatUnits(event.args[1], 18)); // Assuming amount is the second argument
                    }
                } else {
                    toast.warn("No Withdraw event found in the transaction logs.");
                }
    
                // Refresh stake history
                await getStakeHistory();
    
                return UnstakedMoney;
            } else {
                toast.error("Please change your chain into CHRLE");
            }
            return false;
        } catch(error: any) {
            console.error(error);
            if (error.reason) {
                toast.error(error.reason);
            }
            return false;
        }
    }

    useEffect(() => {
        if(isDisconnected) {
            setStakeHistory(null);
        }
    }, [isDisconnected])

    useEffect(() => {
        if(staking) {
            getStakeHistory();
        }
    }, [staking]);

    return (
        <StakingContext.Provider value={{stakeHistory, stakeToken, claimToken, unstakeToken}}>
            {children}
        </StakingContext.Provider>
    );
}