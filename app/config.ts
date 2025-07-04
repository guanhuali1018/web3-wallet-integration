import { http, createConfig } from "wagmi";
import { mainnet, sepolia, polygon } from "wagmi/chains";
import { injected, coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia, polygon],
  connectors: [
    injected({
      target: {
        id: "injected",
        name: "浏览器钱包 (MetaMask/其他)",
        provider: () =>
          typeof window !== "undefined" ? window.ethereum : undefined,
      },
    }),
    coinbaseWallet({
      appName: "Web3 Wallet",
      appLogoUrl: "https://avatars.githubusercontent.com/u/37784886",
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
});
