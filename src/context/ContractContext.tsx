import React, {createContext, useEffect, useState, ReactNode} from "react";
import { ethers } from "ethers";
import StakingABI from "../contracts/Staking.json";
import TokenABI from "../contracts/Token.json";
import { STAKING_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constant/contract";

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

    useEffect(() => {
        const initContracts = async () => {
            try {
                let provider: ethers.BrowserProvider | null = null;

                if(window.ethereum) {
                    provider = new ethers.BrowserProvider(window.ethereum);
                } else if(window.bitkeep) {
                    provider = new ethers.BrowserProvider(window.bitkeep);
                } else if(window.okxwallet) {
                    provider = new ethers.BrowserProvider(window.okxwallet);
                }

                if(!provider) {
                    throw new Error("No compatible Ethereum wallet found");
                }

                const signer = await provider.getSigner();

                // Instantiate contract instances
                const stakingInstance = new ethers.Contract(STAKING_CONTRACT_ADDRESS, StakingABI.abi, signer);
                const token = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TokenABI, signer);
                setToken(token);
                setStaking(stakingInstance);
            } catch(err) {
                console.error("Error initializing contracts: ", err);
            }
        }

        initContracts();
    }, []);

    return (
        <ContractContext.Provider value={{staking, token}}>
            {children}
        </ContractContext.Provider>
    )
}

export { ContractProvider, ContractContext };