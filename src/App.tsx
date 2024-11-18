import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Staking from './pages/Staking';
import Footer from './components/layout/Footer';
import Marketplace from './pages/Marketplace';
import Web3Modal from './components/common/Web3Modal';
import { WagmiProvider } from 'wagmi';
import wagmiConfig from './wagmiClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletProvider } from './context/WalletContext';
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import MobileNavBar from './components/layout/MobileNavbar';

const queryClient = new QueryClient();

function App() {
  const [web3modal, setWeb3modal] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WalletProvider>
            <Container>
              <NavBar setWeb3Modal={setWeb3modal} setMobileNavOpen={setMobileNavOpen} mobileNavOpen={mobileNavOpen} />
              <MobileNavBar isOpen={mobileNavOpen} setWeb3Modal={setWeb3modal} />
              <Routes>
                <Route path='/staking' element={<Staking />} />
                <Route path='/marketplace' element={<Marketplace />} />
              </Routes>
              <Footer />
              <Web3Modal web3modal={web3modal} setWeb3Modal={setWeb3modal} />
            </Container>
          </WalletProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
