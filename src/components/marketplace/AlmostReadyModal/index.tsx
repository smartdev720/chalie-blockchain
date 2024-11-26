import React from "react";
import "./style.css";

interface AlmostReadyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AlmostReadyModal: React.FC<AlmostReadyModalProps> = ({isOpen, onClose}) => {
    
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
            <div className="almost-ready-modal-wrapper relative bg-[#2C2C2C] h-[375px] 2xl:h-[355px] xl:h-[355px] lg:h-[355px] md:h-[355px] sm:h-[375px] w-[90%] 2xl:w-[738px] xl:w-[738px] lg:w-[738px] md:w-[738px] sm:w-[90%]">
                <div className="almost-ready-modal-wrapper absolute inset-[1px] bg-[#1B1B1B] py-4 px-6">
                    <h1 className="text-white font-semibold text-2xl">Almost ready</h1>
                    <div className="almost-ready-modal-component-wrapper relative h-[97px] 2xl:h-[84px] xl:h-[84px] lg:h-[84px] md:h-[84px] sm:h-[97px] bg-[#2C2C2C] mt-6">
                        <div className="almost-ready-modal-component-wrapper absolute inset-[1px] bg-[#1B1B1B] flex items-center justify-between p-4">
                            <div className="flex flex-row gap-2 items-center">
                                <div className="almost-ready-modal-icon-wrapper absolute h-[52px] w-[52px] bg-[#2C2C2C]">
                                    <div className="almost-ready-modal-icon-wrapper absolute h-[52px] w-[52px] bg-[#212121] flex items-center justify-center">
                                        <img src="./assets/wallet.svg" alt="wallet" className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className="ml-16">
                                    <h3 className="text-white font-normal text-md 2xl:text-lg xl:text-lg lg:text-lg md:text-lg sm:text-md">Transaction</h3>
                                    <p className="text-[#747474] font-normal text-sm 2xl:text-md xl:text-md lg:text-md md:text-md sm:text-sm mt-1">Go to the wallet app and confirm the transaction</p>
                                </div>
                            </div>
                            <div className="mr-3">
                                <button>
                                    <img src="./assets/rightArrow.svg" alt="rightArrow" className="w-8 h-8 hover:bg-[#212121] transition-all duration-300 ease-in-out rounded-lg" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="almost-ready-modal-component-wrapper relative h-[97px] 2xl:h-[84px] xl:h-[84px] lg:h-[84px] md:h-[84px] sm:h-[97px] bg-[#2C2C2C] mt-4">
                        <div className="almost-ready-modal-component-wrapper absolute inset-[1px] bg-[#1B1B1B] flex items-center justify-between p-4">
                            <div className="flex flex-row gap-2 items-center">
                                <div className="almost-ready-modal-icon-wrapper absolute h-[52px] w-[52px] bg-[#2C2C2C]">
                                    <div className="almost-ready-modal-icon-wrapper absolute h-[52px] w-[52px] bg-[#212121] flex items-center justify-center">
                                        <img src="./assets/wallet.svg" alt="wallet" className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className="ml-16">
                                    <h3 className="text-white font-normal text-md 2xl:text-lg xl:text-lg lg:text-lg md:text-lg sm:text-md">Checking payment</h3>
                                    <p className="text-[#747474] font-normal text-sm 2xl:text-md xl:text-md lg:text-md md:text-md sm:text-sm mt-1">We are checking your payment. It may take some time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {`almost-ready-button-wrapper h-[60px] mt-4 w-full relative bg-gradient`} */}
                    {/* {`almost-ready-button-wrapper inset-[3px] absolute bg-white`} */}
                    {/* {`almost-ready-button-wrapper flex items-center justify-center inset-[1px] transition-all duration-300 ease-in-out cursor-pointer text-white bg-gradient absolute text-base`} */}
                    <div className={`almost-ready-button-wrapper h-[60px] mt-6 w-full relative bg-[#242424]`}>
                    <div className={`almost-ready-button-wrapper inset-[3px] absolute bg-[#747474]`}>
                        <button 
                            className={`almost-ready-button-wrapper flex items-center justify-center inset-[1px] transition-all duration-300 ease-in-out cursor-not-allowed 
                                text-[#747474] bg-[#242424] absolute text-base`}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default AlmostReadyModal;