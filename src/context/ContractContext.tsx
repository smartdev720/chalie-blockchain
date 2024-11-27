import React, {createContext, useEffect, useState, ReactNode} from "react";
import { ethers } from "ethers";
import StakingABI from "../contracts/Staking.json";
import TokenABI from "../contracts/Token.json";
import { STAKING_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constant/contract";
import { useAccount,} from "wagmi";
import { toast } from "react-toastify";
import { useEthersSigner } from "../hooks/useEthersSigner";

interface ContractContextType {
    staking: ethers.Contract | null;
    token: ethers.Contract | null;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

interface ContractProviderProps {
    children: ReactNode;
}

const ContractProvider: React.FC<ContractProviderProps> = ({children}) => {
    const [staking, setStaking] = useState<ethers.Contract | null>(null);
    const [token, setToken] = useState<ethers.Contract | null>(null);

    const { isConnected } = useAccount();
    const signer = useEthersSigner();

    useEffect(() => {
        const initContracts = async () => {
            try {
                if(signer && isConnected) {
                    const stakingInstance = new ethers.Contract(STAKING_CONTRACT_ADDRESS, StakingABI.abi, signer);
                    const tokenInstance =  new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TokenABI.abi, signer);
                    setToken(tokenInstance);
                    setStaking(stakingInstance);
                }
            } catch(err) {
                console.error(err);
                toast.warning("Rejected");
            }
        }
        initContracts();
    }, [isConnected, signer]);

    return (
        <ContractContext.Provider value={{staking, token}}>
            {children}
        </ContractContext.Provider>
    )
}

export { ContractProvider, ContractContext };