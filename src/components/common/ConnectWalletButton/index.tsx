import React from "react";
import "./style.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface ConnectWalletButtonProps {
    handleClick: () => void;
    disabled: boolean;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({handleClick, disabled}) => {
    return (
        <div className="connect-wallet-wrapper w-full h-[60px] bg-gradient relative">
            <div className="connect-wallet-wrapper inset-[3px] bg-white absolute">
                <div className="">
                    <ConnectButton label="Connect wallet">
                        {/* <button className={`text-white connect-wallet-wrapper inset-[1px] absolute ${disabled ? "cursor-not-allowed" : "cursor-pointer"} bg-gradient flex items-center justify-center`} onClick={handleClick} disabled={disabled}>
                            Connect wallet
                        </button> */}
                    </ConnectButton>
                </div>
            </div>
        </div>
    );
}

export default ConnectWalletButton;