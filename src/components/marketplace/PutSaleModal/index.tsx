import React from "react";
import "./style.css";
import RadioGroup, { RadioItemType } from "../../common/RadioGroup";

interface PutSaleModalProps {
    isOpen: boolean;
    onClose: () => void;
    setIsAlmostReadyOpen: (value: boolean) => void;
}

const radioGroupItems: RadioItemType[] = [
    {label: "ETH", name: "eth", isImg: true, checked: true, src: "./assets/ethIcon.svg"}
];

const PutSaleModal: React.FC<PutSaleModalProps> = ({isOpen, onClose, setIsAlmostReadyOpen}) => {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
    };

    const handleClick = () => {
        onClose();
        setIsAlmostReadyOpen(true);
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}>
        {/* Backdrop */}
        <div
            className="absolute inset-0 bg-black bg-opacity-90"
            onClick={handleBackdropClick}
        >
            
        </div>
        <div className="put-sale-modal-wrapper relative w-[90%] 2xl:w-[736px] xl:w-[736px] lg:w-[736px] md:w-[736px] sm:w-[90%] h-[703px] bg-[#2C2C2C] z-10">
            <div className="put-sale-modal-wrapper absolute inset-[1px] bg-[#1B1B1B] p-4">
                <h1 className="text-white font-semibold text-2xl">Enter a price</h1>
                <div className="put-sale-modal-nft-title-wrapper relative bg-[#2C2C2C] h-[102px] mt-6">
                    <div className="put-sale-modal-nft-title-wrapper inset-[1px] absolute bg-[#1B1B1B] p-4 flex flex-row gap-4 items-center">
                        <img src="./assets/NFTinfo.svg" alt="NFT" className="w-[52px] h-[70px]" />
                        <div className="">
                            <h1 className="text-white font-medium text-xl">NFT Name</h1>
                            <p className="text-[#747474] text-lg font-normal mt-1">NFT collection</p>
                        </div>
                    </div>
                </div>
                <div className="put-sale-modal-choose-coin-wrapper relative bg-[#2C2C2C] h-[132px] mt-4">
                    <div className="put-sale-modal-choose-coin-wrapper inset-[1px] absolute bg-[#1B1B1B] p-4">
                        <h1 className="text-white font-medium text-xl">Choose coin</h1>
                        <div className="mt-6">
                            <RadioGroup items={radioGroupItems} />
                        </div>
                    </div>
                </div>
                <div className="put-sale-item-price-wrapper relative bg-[#2C2C2C] h-[233px] mt-4">
                    <div className="put-sale-item-price-wrapper inset-[1px] absolute bg-[#1B1B1B] p-4">
                        <h1 className="text-white font-medium text-xl">Item’s price</h1>
                        <div className="put-sale-item-price-header-wrapper relative bg-[#2C2C2C] h-[52px] mt-3">
                            <div className="put-sale-item-price-header-wrapper absolute inset-[1px] bg-[#212121] p-4 flex items-center">
                                <img src="./assets/ethIcon.svg" alt="ethIcon" className="w-6 h-6" />
                                <input className="text-[#747474] text-lg font-normal bg-transparent border-none outline-none ml-4 w-full" placeholder="Enter a price" />
                            </div>    
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <div className="flex flex-row gap-2 items-center">
                                <span className="text-[#747474] text-lg font-normal">Service Fee</span>
                                <img src="./assets/dot.svg" alt="dot" className="w-[2px] h-[2px]" />
                                <span className="text-[#927BF5] text-lg font-normal">iH...IOad</span>
                                <img src="./assets/tooltip.svg" alt="tooltip" className="w-4 h-4 cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <div className="flex flex-row gap-2 items-center">
                                <span className="text-[#747474] text-lg font-normal">Creator royalties</span>
                                <img src="./assets/dot.svg" alt="dot" className="w-[2px] h-[2px]" />
                                <span className="text-[#927BF5] text-lg font-normal">iH...IOad</span>
                                <img src="./assets/tooltip.svg" alt="tooltip" className="w-4 h-4 cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <h4 className="text-white text-lg font-medium">You receive</h4>
                            <button>
                                <img src="./assets/dots.svg" alt="dots" className="w-7 h-7 hover:bg-[#212121] transition-all duration-300 ease-in-out rounded-lg" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`put-sale-button-wrapper h-[60px] mt-4 w-full relative bg-gradient`}>
                    <div className={`put-sale-button-wrapper inset-[3px] absolute bg-white`}>
                        <button 
                            className={`put-sale-button-wrapper flex items-center justify-center inset-[1px] transition-all duration-300 ease-in-out cursor-pointer text-white bg-gradient absolute  text-base`} 
                            onClick={handleClick}
                        >
                            Put a sale
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-[#747474] text-sm font-normal text-center flex items-center justify-center">Your balance: <img src="./assets/ethIcon.svg" alt="ETH" className="w-4 h-4 ml-1" /><span className="text-white text-sm font-normal ml-1">0.0002</span></p>
                </div>
            </div>
        </div>
      </div>
    );
}

export default PutSaleModal;