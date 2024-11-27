import React, {createContext, useEffect, useState, ReactNode} from "react";
import { ethers } from "ethers";
import StakingABI from "../contracts/Staking.json";
import TokenABI from "../contracts/Token.json";
import { STAKING_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constant/contract";
import { useAccount, useClient} from "wagmi";
import { getContract } from "viem";
import wagmiClient from "../wagmiClient";
import { REQUIRED_CHAIN_ID } from "../constant/wallets";
import { toast } from "react-toastify";

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

    const { address, isConnected, chainId } = useAccount();

    useEffect(() => {
        const initContracts = async () => {
            try {
                debugger;
                if (!isConnected || !address) {
                    return;
                  }
          
                  if (chainId !== REQUIRED_CHAIN_ID) {
                    return;
                  }
                  let provider = null;
                  if (window.ethereum) {
                    provider = new ethers.BrowserProvider(window.ethereum); // MetaMask, Trust Wallet, etc.
                  } else if (window.bitkeep) {
                    provider = new ethers.BrowserProvider(window.bitkeep); // BitKeep wallet
                  } else if (window.okxwallet) {
                    provider = new ethers.BrowserProvider(window.okxwallet); // OKX wallet
                  } else {
                    throw new Error("No compatible wallet found");
                  }
                if(!provider) {
                    throw new Error("No compatible wallet found");
                }
                const signer = await provider.getSigner();
                const stakingInstance = new ethers.Contract(STAKING_CONTRACT_ADDRESS, StakingABI.abi, signer);
                const tokenInstance =  new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TokenABI.abi, signer);
        
                console.log("Staking Contract:", stakingInstance);
                console.log("Token Contract:", tokenInstance);
                setToken(token);
                setStaking(stakingInstance);
            } catch(err) {
                toast.warning("Rejected");
            }
        }

        initContracts();
    }, [isConnected, chainId]);

    return (
        <ContractContext.Provider value={{staking, token}}>
            {children}
        </ContractContext.Provider>
    )
}

export { ContractProvider, ContractContext };