import { http, createConfig } from "wagmi";
import { mainnet, sepolia, polygon } from "wagmi/chains";
import { injected, coinbaseWallet, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia, polygon],
  connectors: [
    injected({
      target: {
        id: "injected",
        name: "Browser Wallet (MetaMask/Others)",
        provider: () =>
          typeof window !== "undefined" ? window.ethereum : undefined,
      },
    }),
    walletConnect({
      projectId: "2f05ae7f1116030fde2d36508f472bfb", // 公共演示ID，生产环境请替换为您自己的
      metadata: {
        name: "Web3 Wallet Application",
        description: "A Web3 wallet application built with Next.js and wagmi",
        url:
          typeof window !== "undefined"
            ? window.location.origin
            : "https://localhost:3000",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
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
