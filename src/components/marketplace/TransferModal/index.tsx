import React from "react";
import "./style.css";

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TransferModal: React.FC<TransferModalProps> = ({isOpen, onClose}) => {

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-90"
                onClick={handleBackdropClick}
            >
            </div>
            <div className="transfer-modal-wrapper relative bg-[#2C2C2C] h-[479px] 2xl:h-[449px] xl:h-[449px] lg:h-[449px] md:h-[449px] sm:h-[479px] w-[90%] 2xl:w-[736px] xl:w-[736px] lg:w-[736px] md:w-[736px] sm:w-[90%]">
                <div className="transfer-modal-wrapper absolute inset-[1px] bg-[#1B1B1B] px-4 py-6">
                    <h1 className="text-white font-semibold text-2xl">Transfer</h1>
                    <div className="transfer-modal-nft-title-wrapper relative bg-[#2C2C2C] h-[102px] mt-4">
                        <div className="transfer-modal-nft-title-wrapper inset-[1px] absolute bg-[#1B1B1B] p-4 flex flex-row gap-4 items-center">
                            <img src="./assets/NFTinfo.svg" alt="NFT" className="w-[52px] h-[70px]" />
                            <div className="">
                                <h1 className="text-white font-medium text-xl">NFT Name</h1>
                                <p className="text-[#747474] text-lg font-normal mt-1">NFT collection</p>
                            </div>
                        </div>
                    </div>
                    <div className="transfer-modal-enter-wallet-wrapper relative bg-[#2C2C2C] h-[195px] 2xl:h-[160px] xl:h-[160px] md:h-[160px] sm:h-[195px] mt-4">
                        <div className="transfer-modal-enter-wallet-wrapper inset-[1px] absolute bg-[#1B1B1B] p-4">
                            <h2 className="text-white font-normal text-xl">Enter the recipient’s address</h2>
                            <p className="text-[#7F7F7F] font-normal text-sm mt-4">The NFT will be sent to this address. Be careful when sending an NFT to another user.</p>
                            <div className="transfer-modal-input relative bg-[#2C2C2C] h-[52px] mt-2">
                                <div className="transfer-modal-input absolute inset-[1px] bg-[#212121]">
                                    <input type="text" className="text-[#747474] bg-transparent h-[52px] font-normal text-lg outline-none border-none w-full p-4" placeholder="Wallet address" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`transfer-modal-button-wrapper h-[60px] mt-5 w-full relative bg-gradient`}>
                        <div className={`transfer-modal-button-wrapper inset-[3px] absolute bg-white`}>
                            <button 
                                className={`transfer-modal-button-wrapper flex items-center justify-center inset-[1px] transition-all duration-300 ease-in-out cursor-pointer text-white bg-gradient absolute  text-base`} 
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransferModal;