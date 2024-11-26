import React, { useState } from "react";
import Avatar from "../../../components/common/Avatar";
import "./style.css";
import type { AttributesListItem } from "../../../components/marketplace/AttributesListGroup";
import AttributesListGroup from "../../../components/marketplace/AttributesListGroup";
import PutSaleModal from "../../../components/marketplace/PutSaleModal";
import AlmostReadyModal from "../../../components/marketplace/AlmostReadyModal";
import TransferModal from "../../../components/marketplace/TransferModal";
import EarnedModal from "../../../components/marketplace/EarnedModal";

const attributes: AttributesListItem[] = [
    {title: "Skeleton", description: "Sad Days Better luck next time"},
    {title: "Mouth Traits", description: "Sad Days Better luck next time"},
    {title: "Lasor eye Beams", description: "Grean Beam 1"},
    {title: "Chains With Medallions", description: "Sad Days Better luck next time"},
    {title: "Third eye", description: "Sad Days Better luck next time"},
    {title: "Third eye Beams", description: "Sad Days Better luck next time"},
    {title: "Background", description: "Sunset 1"},
    {title: "Body", description: "Colorful Body Gradient"},
    {title: "Eye Traits", description: "Magenta Eye"},
    {title: "Unihorn", description: "Highlighter Unihorn"},
    {title: "Unihorn Hair", description: "Highlighter Glow"},
];

const NFTCardInfo = () => {
    const [isPutSaleOpen, setIsPustSaleOpen] = useState<boolean>(false);
    const [isAlmostReadyOpen, setIsAlmostReadyOpen] = useState<boolean>(false);
    const [isTransferOpen, setIsTransferOpen] = useState<boolean>(false);
    const [isEarnedOpen, setIsEarnedOpen] = useState<boolean>(false);
    
    const handlePutSaleClick = () => {
        setIsEarnedOpen(true);
        // setIsPustSaleOpen(true);
    };

    const handlePlaceBidClick = () => {
        setIsTransferOpen(true);
    }

    return (
        <div className="flex flex-col 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-col gap-10 items-start justify-center mt-16 h-[116vh]">
            <div className="flex items-center justify-center w-full 2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-full">
                <img src="./assets/NFTinfo.svg" alt="NFT INFO" />
            </div>
            <div className="w-full 2xl:w-[595px] xl:w-[595px] lg:w-[595px] md:w-[595px] sm:w-full">
                <div className="flex items-center justify-between">
                    <h1 className="2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-md text-white text-center font-medium">Sad Days Better</h1>
                    <p className="gradient-text 2xl:text-lg xl:text-lg lg:text-lg md:text-lg sm:text-xs font-semibold">3029 $CHRLE/$5</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-[#747474] font-medium text-base">Owner:</span>
                    <Avatar src="./assets/avatar.jpeg" name="Yumeno" />
                </div>
                <div className="flex flex-row gap-2 items-center justify-between mt-6">
                    <div className="put-sale-wrapper w-full h-[50px] bg-gradient relative">
                        <div className="put-sale-wrapper inset-[3px] bg-white absolute">
                            <button className="text-white put-sale-wrapper inset-[1px] absolute bg-gradient flex items-center justify-center" onClick={handlePutSaleClick}>
                                Put on sale
                            </button>
                        </div>
                    </div>
                    <div className="place-bid-wrapper w-full h-[50px] bg-gradient relative">
                        <div className="place-bid-wrapper inset-[3px] bg-white absolute">
                            <button className="text-white place-bid-wrapper inset-[1px] absolute bg-gradient flex items-center justify-center" onClick={handlePlaceBidClick}>
                                Place a bid
                            </button>
                        </div>
                    </div>
                </div>
                <div className="marketplace-card-attributes-wrapper relative bg-[#2C2C2C] h-[370px] mt-6">
                    <div className="marketplace-card-attributes-wrapper inset-[1px] absolute bg-[#1B1B1B] px-4 py-5 overflow-auto 2xl:overflow-hidden xl:overflow-hidden lg:overflow-hidden md:overflow-auto sm:overflow-auto">
                        <h2 className="text-white text-lg font-normal">Attributes</h2>
                        <AttributesListGroup items={attributes} />
                    </div>
                </div>
            </div>
            <PutSaleModal isOpen={isPutSaleOpen} onClose={() => setIsPustSaleOpen(false)} setIsAlmostReadyOpen={setIsAlmostReadyOpen} />
            <AlmostReadyModal isOpen={isAlmostReadyOpen} onClose={() => setIsAlmostReadyOpen(false)} />
            <TransferModal isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)} />
            <EarnedModal isOpen={isEarnedOpen} onClose={() => setIsEarnedOpen(false)} />
        </div>
    );
}

export default NFTCardInfo;