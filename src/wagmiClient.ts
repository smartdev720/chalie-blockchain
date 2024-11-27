import { http, createConfig } from "wagmi";
import { base, Chain } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {rainbowWallet, metaMaskWallet, trustWallet, bitgetWallet, okxWallet} from "@rainbow-me/rainbowkit/wallets";

const projectId = '333d74634b970c7e1d46fc856f2aa167';

const customChain: Chain = {
  id: 84532,
  name: 'Base Sepolia',
  rpcUrls: {
    default: {http: ["https://base-sepolia-rpc.publicnode.com"], webSocket: ["https://base-sepolia-rpc.publicnode.com"]}
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
      groupName: 'Suggested',
      wallets: [ metaMaskWallet, trustWallet, bitgetWallet, okxWallet, rainbowWallet],
    },
  ],
  {
    appName: "Charlie_blockchain",
    projectId
  }
)

const wagmiConfig = createConfig({
    chains: [customChain],
    connectors,
    transports: {
      // [base.id]: http(),
      [customChain.id]: http(),
    },
    ssr: true
});

export default wagmiConfig;