import React, { useCallback, useEffect, useState } from "react";
import Modal from "../Modal";
import { Wallets, getWalletSrc } from "../../../constant/wallets";
import WalletCard from "../WalletCard";
import ConnectWalletButton from "../ConnectWalletButton";
import { useWallet } from "../../../context/WalletContext";

interface Web3ModalProps {
    web3modal: boolean;
    setWeb3Modal: (value: boolean) => void;
}

const Web3Modal: React.FC<Web3ModalProps> = ({web3modal, setWeb3Modal}) => {
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const {connectWallet, account, isWalletInstalled} = useWallet();
    const [isInstalled, setIsInstalled] = useState<boolean>(true);

    const handleConnectWallet = async () => {
        try {
            if(selectedWallet) {
                connectWallet(selectedWallet);
            }
        } catch(err) {
            console.error("Failed wallet connection:", err);
        }
    }

    const handleWalletInstall = (walletName: string | null) => {
        if (walletName) {
            const walletSrc = getWalletSrc(walletName);
            if (walletSrc) {
                window.open(walletSrc, "_blank");
            }
        }
    }

    useEffect(() => {
        if(account) setWeb3Modal(false);
    }, [account]);

    useEffect(() => {
        if(!web3modal) {
            setSelectedWallet(null);
            setIsInstalled(true)
        }
    }, [web3modal]);

    useEffect(() => {
        if(selectedWallet) {
            if(isWalletInstalled(selectedWallet)) {
                setIsInstalled(true);
            } else {
                setIsInstalled(false);
            }
        }
    }, [selectedWallet]);

    return (
        <Modal isOpen={web3modal} isInstalled={isInstalled} onClose={() => setWeb3Modal(false)}>
            <div className="z-20 p-[32px]">
                <h1 className="font-semibold text-2xl text-white">Connect wallet</h1>
                <p className="text-md font-normal text-white mt-2">Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely. Never share them with anyone.</p>
                <div className="grid grid-cols-4 gap-1 mt-6">
                    {Wallets.map((wallet, index) => (
                        <WalletCard logo={wallet.logo} name={wallet.name} key={index} selected={selectedWallet} setSelected={setSelectedWallet} />
                    ))}
                </div>
                <div className="mt-4">
                    <ConnectWalletButton handleClick={handleConnectWallet} disabled={!isInstalled} />
                </div>
                { !isInstalled &&
                    <div className="mt-4 flex flex-col items-center justify-center">
                        <span className="text-white font-light text-xs">Please install the selected wallet</span>
                        <p className="text-white font-light text-xs">Click  
                            <span className="gradient-text text-xs font-light cursor-pointer" onClick={() => {
                                handleWalletInstall(selectedWallet)
                            }}>
                                {selectedWallet ? getWalletSrc(selectedWallet) : ""}
                            </span>
                        </p>
                    </div>
                }
            </div>
        </Modal>
    );
}

export default Web3Modal;