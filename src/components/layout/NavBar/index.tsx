import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useWallet } from "../../../context/WalletContext";
import { WalletButton } from "@rainbow-me/rainbowkit";

const style = {
  link: "text-base font-normal z-10 hover:bg-gradient-to-r hover:from-[#ce89ca] hover:via-[#5885BF] hover:via-[#7258DF] hover:to-[#75eea3] hover:bg-clip-text hover:text-transparent transition-all duration-300 ease-in-out "
};

interface NavBarProps {
  setWeb3Modal: (value: boolean) => void;
  setMobileNavOpen: (value: boolean) => void;
  mobileNavOpen: boolean;
}

const NavBar: React.FC<NavBarProps> = ({setWeb3Modal, setMobileNavOpen, mobileNavOpen}) => {
  const [active, setActive] = useState<string>("swap");
  const [navIcon, setNavIcon] = useState<boolean>(false);
  const handleActive = (value: string) => setActive(value);
  const {account, disconnectWallet, isConnected} = useWallet();

  return (
      <header className="w-full flex flex-row gap-2">
        {/* Desktop */}
        <nav className="basis-5/6 nav-wrapper relative h-[60px] bg-[#444444]">
          <div className="flex items-center nav-wrapper justify-between inset-[1px] absolute bg-[#1C1C1C] px-5">
            <div className="flex flex-row items-center justify-center gap-20">
              <h3 className="gradient-text font-semibold text-2xl">Logo</h3>
              <div className="hidden 2xl:block xl:block lg:block md:hidden sm:hidden">
                <div className="flex flex-row items-center gap-20">
                  <Link to="/swap" className={`${style.link} ${active === "swap" ? "gradient-text" : "text-white"}`}
                    onClick={() => handleActive("swap")}
                  >Swap</Link>
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
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="basis-1/6">
          <div className="connect-wrapper w-full h-[60px] bg-gradient relative">
            <div className="connect-wrapper inset-[3px] bg-white absolute">
              <div className="hidden 2xl:block xl:block lg:block md:block sm:hidden">
                <WalletButton.Custom wallet="rainbow">
                  {({ ready, connect }) => {
                    return (
                        <button className="text-white connect-wrapper inset-[1px] absolute bg-gradient flex items-center justify-center" onClick={() => {
                          if(account) {
                            disconnectWallet();
                          } else {
                            setWeb3Modal(true);
                          }
                        }}>
                          {account ? `${account.slice(0, 20)}.....` : "Connect wallet"}
                        </button>
                    )
                  }}
                </WalletButton.Custom>
              </div>
              <div className="block 2xl:hidden xl:hidden lg:hidden md:hidden sm:block">
                <button className="text-white connect-wrapper inset-[1px] absolute bg-gradient flex items-center justify-center">
                  <img src={`./assets/${navIcon ? "times" : "burgar"}.svg`} alt="navIcon" className={`transition-all duration-300 ease-in-out transform`} onClick={
                    () => {
                      setNavIcon(!navIcon)
                      if(mobileNavOpen) {
                        setMobileNavOpen(false);
                      } else {
                        setMobileNavOpen(true);
                      }
                    }
                  }/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
}

export default NavBar