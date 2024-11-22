import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {rainbowWallet, metaMaskWallet, trustWallet, bitgetWallet, okxWallet} from "@rainbow-me/rainbowkit/wallets";

const projectId = '333d74634b970c7e1d46fc856f2aa167';

const customChain = {
  id: 84532, // Your custom chain ID
  name: 'Base Sepolia',
  rpcUrls: {
    default: 'https://base-sepolia-rpc.publicnode.com',
  },
  nativeCurrency: {
    name: 'TA',
    symbol: 'TA',
    decimals: 18,
  },
  blockExplorers: {
    default: {
        name: "Basescan",
        url: "https://basescan.org",
        apiUrl: "https://api.basescan.org/api",
    },
  }
};

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, metaMaskWallet, trustWallet, bitgetWallet, okxWallet],
    },
  ],
  {
    appName: "Charlie_blockchain",
    projectId
  }
)

const wagmiConfig = createConfig({
    chains: [base],
    connectors,
    transports: {
      [base.id]: http(),
      [customChain.id]: http(),
    },
    ssr: true
});

export default wagmiConfig;