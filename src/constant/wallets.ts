export const Wallets = [
    {name: "MetaMask", logo: "./assets/metamask.svg", src: "https://metamask.io/download/"},
    {name: "Trust", logo: "./assets/trust.svg", src: "https://trustwallet.com/download"},
    {name: "Bitget", logo: "./assets/bitget.svg", src: "https://web3.bitget.com/en/wallet-download"},
    {name: "OKX", logo: "./assets/okx.svg", src: "https://www.okx.com/download"},
];

export const getWalletSrc = (walletName: string): string | null => {
    const selectedWallet = Wallets.find(wallet => wallet.name === walletName);
    return selectedWallet ? selectedWallet.src : null;
}