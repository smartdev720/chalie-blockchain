import React, { useEffect, useState } from 'react';
import './App.css';
import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Web3Modal from './components/common/Web3Modal';
import { WagmiProvider } from 'wagmi';
import wagmiConfig from './wagmiClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletProvider } from './context/WalletContext';
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import MobileNavBar from './components/layout/MobileNavbar';
import { ContractProvider } from './context/ContractContext';
import { StakingProvider } from './context/StakingContext';
import RouterComponent from './routes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  const [web3modal, setWeb3modal] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [navIcon, setNavIcon] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/staking");
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WalletProvider>
            <ContractProvider>
              <StakingProvider>
                <Container>
                  <NavBar setWeb3Modal={setWeb3modal} setMobileNavOpen={setMobileNavOpen} mobileNavOpen={mobileNavOpen} navIcon={navIcon} setNavIcon={setNavIcon}  />
                  <MobileNavBar isOpen={mobileNavOpen} setWeb3Modal={setWeb3modal} setOpen={setMobileNavOpen} setNavIcon={setNavIcon} />
                  <RouterComponent />
                  <Footer />
                  <Web3Modal web3modal={web3modal} setWeb3Modal={setWeb3modal} />
                  <ToastContainer theme="dark" />
                </Container>
              </StakingProvider>
            </ContractProvider>
          </WalletProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
