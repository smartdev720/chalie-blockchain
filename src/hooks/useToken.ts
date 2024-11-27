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
        if(!token) {
            return false;
        }
        if(chainId === REQUIRED_CHAIN_ID) {
            setLoading(true);
            const txApprove = await token.approve(STAKING_CONTRACT_ADDRESS, amount); 
            await txApprove.wait();
            return true;
        } else {
            toast.error("Please change your current chain");
        }
        return false;
    }
    
    const balanceOf = async (address: string): Promise<string | null | undefined> => {
        if(!token) {
            toast.error("Please change your current chain");
            return null;
        }
        if(chainId === REQUIRED_CHAIN_ID) {
            setLoading(true);
            const balanceInBigInt = await token.balanceOf(address);
            const balanceInEth = ethers.formatUnits(balanceInBigInt, 18);
            return balanceInEth;
        } else {
            toast.error("Please change your current chain");
        }
        return null;
    }

    return {loading, balanceOf, ensureTokenApprove}
}

export default useToken;