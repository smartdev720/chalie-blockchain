import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain, useBalance } from "wagmi";
import { ethers } from "ethers";

interface WalletContextProps {
    connectWallet: (walletName: string) => void;
    account: string | null | undefined;
    balance: string | null;
    disconnectWallet: () => void;
    isConnected: boolean;
    isWalletInstalled: (walletName: string) => boolean;
    chainId: number | null | undefined;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

const useWallet = (): WalletContextProps => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be within a WalletProvider");
    }
    return context;
}

interface WalletProviderProps {
    children: ReactNode;
}

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    // const [balance, setBalance] = useState<string | null>(null);
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { address, isConnected, chainId } = useAccount();
    const network = useSwitchChain();
    const balance = useBalance({address, token: "0x463C342E3353b67c6Da2a6F570a0A4E20B6C74e0"});

    const isWalletInstalled = (walletName: string): boolean => {
        if(!window.ethereum.isMetaMask && walletName === "MetaMask") {
            return false;
        }
        if(!window.trustwallet && walletName === "Trust") {
            return false;
        }
        if(!window.bitkeep && walletName === "Bitget") {
            return false;
        }
        if(!window.okxwallet && walletName === "OKX") {
            return false;
        }
        return true;
    }

    const connectWallet = (walletName: string) => {
        try {
            const selectedConnector = connectors.find(connector =>
                (connector.rkDetails as { name: string }).name.includes(walletName)
            );
            if (selectedConnector) {
                connect({ connector: selectedConnector });
            } else {
                throw new Error("Wallet type not found");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const disconnectWallet = () => {
        disconnect();
    };

    useEffect(() => {
        if(isConnected) {
            network.switchChain({chainId: 84532});
        }
    }, [isConnected]);

    useEffect(() => {
        const b = balance;
        const i = 0;
        console.log(balance.data);
        // if (isConnected && userBalance) {
        //     const balanceInETH = ethers.formatUnits(userBalance.value, 18);
        //     setBalance(balanceInETH);
        // }
    }, [isConnected]);


    return (
        <WalletContext.Provider
            value={{
                connectWallet,
                disconnectWallet,
                account: isConnected ? address : null,
                isConnected,
                isWalletInstalled,
                chainId: isConnected ? chainId : null,
                balance: "0",
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export { WalletProvider, useWallet };
