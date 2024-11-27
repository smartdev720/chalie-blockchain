import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWallet } from "../../../context/WalletContext";
import "./style.css";

interface MobileNavBarProps {
    isOpen: boolean;
    setWeb3Modal: (value: boolean) => void;
    setOpen: (value: boolean) => void;
    setNavIcon: (value: boolean) => void;
}

const style = {
    link: "text-base font-normal p-2 z-30 hover:bg-gradient-to-r hover:from-[#ce89ca] hover:via-[#5885BF] hover:via-[#7258DF] hover:to-[#75eea3] hover:bg-clip-text hover:text-transparent transition-all duration-300 ease-in-out "
};

const MobileNavBar: React.FC<MobileNavBarProps> = ({isOpen, setWeb3Modal, setOpen, setNavIcon}) => {
    const [active, setActive] = useState<string>("swap");
    const handleActive = (value: string) => {
        setActive(value);
        setNavIcon(false);
        setOpen(false);
    };
    
    const slideIn = useSpring({
        transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
        opacity: isOpen ? 1 : 0,
        config: { tension: 250, friction: 30 },
    });

    return (
            <animated.nav style={{ ...slideIn }} className={`relative mobile-nav top-0 right-0 z-20 h-[2134px] ${isOpen ? "block 2xl:hidden xl:hidden lg:hidden md:hidden sm:block" : "hidden"}`}>
                <div className="flex flex-col items-center justify-center w-full py-2">
                    <Link to="/swap" className={`${style.link} ${active === "swap" ? "gradient-text" : "text-white"}`}
                        onClick={() => handleActive("swap")}
                    >
                        Swap
                    </Link>
                    <Link 
                        to="/staking" 
                        className={`${style.link} ${active === "staking" ? "gradient-text" : "text-white"}`} 
                        onClick={() => handleActive("staking")}
                    >
                        Staking
                    </Link>
                    <Link to="/marketplace" className={`${style.link} ${active === "marketplace" ? "gradient-text" : "text-white"}`}
                        onClick={() => handleActive("marketplace")}
                    >Marketplace</Link>
                    <div className="flex items-center justify-center p-2 w-full">
                        <div className="connect-wrapper w-full h-[60px] bg-gradient relative">
                            <div className="connect-wrapper inset-[3px] bg-white absolute">
                                <ConnectButton label="Connect wallet" accountStatus="address" showBalance={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </animated.nav>
    );
}

export default MobileNavBar;