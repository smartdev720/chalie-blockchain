import React from "react";
import "./style.css";

interface EarnedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EarnedModal: React.FC<EarnedModalProps> = ({isOpen, onClose}) => {

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
            <div className="relative h-[570px] w-[90%] 2xl:w-[430px] xl:w-[430px] lg:w-[430px] md:w-[430px] sm:w-[90%] flex justify-center">
                <img src="./assets/earnedLogo.svg" alt="earnedLogo" className="w-[170px] h-[198px] mx-auto z-10 absolute" />
                <div className="earned-modal-wrapper relative w-[430px] h-[398px] bg-gradient mt-[100px]">
                    <div className="earned-modal-wrapper absolute inset-[1px] bg-[#1B1B1B] opacity-90 py-5 px-4">
                        <div className="flex items-center justify-between">
                            <span></span>
                            <div className="earned-modal-button-wrapper relative bg-[#747474] h-8 w-8">
                                <button className="earned-modal-button-wrapper absolute inset-[1px] bg-[#121212] opacity-100 flex items-center justify-center" onClick={onClose}>
                                    <img src="./assets/timesGray.svg" alt="times" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h1 className="text-white font-semibold text-2xl text-center">You've earned <span className="gradient-text font-semibold text-2xl">100k</span></h1>
                            <p className="text-[#747474] font-normal text-sm text-center">Twoje biznesy przynosza zysk przez 3 godziny, gdy jestes offline.</p>
                        </div>
                        <div className="earned-modal-component-wrapper relative bg-gradient h-[90px] mt-4">
                            <div className="earned-modal-component-wrapper inset-[1px] absolute bg-[#1B1B1B] h-[91px] flex items-center justify-center">
                                <img src="./assets/earnedLogo.svg" alt="earnedLogo" className="w-[60px] h-[80px]" />
                                <h2 className="gradient-text text-2xl ml-2 font-semibold">100k</h2>
                            </div>
                        </div>
                        <div className={`earned-modal-thank-wrapper h-[60px] mt-4 w-full relative bg-gradient`}>
                            <div className={`earned-modal-thank-wrapper inset-[3px] absolute bg-white`}>
                                <button 
                                    className={`earned-modal-thank-wrapper flex items-center justify-center inset-[1px] transition-all duration-300 ease-in-out cursor-pointer text-white bg-gradient absolute  text-base`} 
                                >
                                    Thanks
                                </button>
                            </div>
                        </div>
                        <p className="text-[#747474] text-center text-sm font-normal mt-2">Nie zapomnij odebrac codziennej nagrody</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EarnedModal;