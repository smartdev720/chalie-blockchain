import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {rainbowWallet, metaMaskWallet, trustWallet, bitgetWallet, okxWallet} from "@rainbow-me/rainbowkit/wallets";

const projectId = '333d74634b970c7e1d46fc856f2aa167';

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
    },
    ssr: true
});

export default wagmiConfig;