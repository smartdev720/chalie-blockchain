import { useState } from "react";
import useContract from "./useContract"
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { STAKING_CONTRACT_ADDRESS } from "../constant/contract";
import { useWallet } from "../context/WalletContext";
import { REQUIRED_CHAIN_ID } from "../constant/wallets";

const useToken = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { token } = useContract();
    const {chainId} = useWallet();

    const ensureTokenApprove = async (amount: bigint): Promise<boolean | null | undefined> => {
        if(!token) throw new Error("Invalid Token Approve");
        if(chainId === REQUIRED_CHAIN_ID) {
            setLoading(true);
            const txApprove = await token.approve(STAKING_CONTRACT_ADDRESS, amount); 
            await txApprove.wait();
            return true;
        } else {
            toast.error("Please change your current chain");
        }
    }
    
    const balanceOf = async (address: string): Promise<string | null | undefined> => {
        try {
            if(!token) throw new Error("Invalid token contract");
            if(chainId === REQUIRED_CHAIN_ID) {
                setLoading(true);
                const balanceInBigInt = await token.balanceOf(address);
                const balanceInEth = ethers.formatUnits(balanceInBigInt, 18);
                return balanceInEth;
            } else {
                toast.error("Please change your current chain");
            }
        } catch(error: any) {
            if(error.reason) {
                toast.error(error.reason);
            } else {
                toast.error("An unexpected error occurred. Check the console for details.");
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, balanceOf, ensureTokenApprove}
}

export default useToken;