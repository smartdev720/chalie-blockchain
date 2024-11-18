import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";

interface WalletContextProps {
    connectWallet: (walletName: string) => void;
    account: string | null | undefined;
    disconnectWallet: () => void;
    isConnected: boolean;
    isWalletInstalled: (walletName: string) => boolean;
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
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { address, isConnected, chain } = useAccount();
    const network = useSwitchChain();

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
            network.switchChain({chainId: 8453});
        }
    }, [isConnected]);

    return (
        <WalletContext.Provider
            value={{
                connectWallet,
                disconnectWallet,
                account: isConnected ? address : null,
                isConnected,
                isWalletInstalled
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export { WalletProvider, useWallet };
