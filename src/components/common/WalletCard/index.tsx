import React from "react";
import "./style.css";

interface WalletCardProps {
    logo: string;
    name: string;
    setSelected: (value: string) => void;
    selected: string | null;
}

const WalletCard: React.FC<WalletCardProps> = ({logo, name, setSelected, selected}) => {
    return (
        <div className="relative cursor-pointer" onClick={() => setSelected(name)}>
            <div className="wallet-card-wrapper relative bg-[#2C2C2C] h-[100px]">
                <div className={`wallet-card-wrapper absolute hover:bg-black transition-all duration-300 ease-in-out inset-[1px] bg-[#212121] flex flex-col items-center justify-center
                    ${selected === name ? "bg-black" : ""}`}>
                    <img src={logo} alt={name} />
                </div>
            </div>
            <div className="flex items-center justify-center mt-1">
                <span className="text-[#747474] text-sm font-medium">{name}</span>
            </div>
        </div>
    );
}

export default WalletCard;