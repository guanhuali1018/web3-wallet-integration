"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 检测是否是移动端
  const isMobile =
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 border-0 rounded-xl bg-white shadow-lg">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 border-0 rounded-xl bg-white shadow-lg">
        <div className="text-emerald-600 font-semibold">
          ✅ Wallet Connected
        </div>
        <div className="text-sm text-slate-600 font-mono bg-slate-100 px-3 py-1 rounded-lg">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <button
          onClick={() => disconnect()}
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Disconnect
        </button>
      </div>
    );
  }

  const hasWalletConnectors = connectors.length > 0;

  return (
    <div className="flex flex-col items-center gap-4 p-6 border-0 rounded-xl bg-white shadow-lg">
      <div className="text-amber-600 font-semibold">
        ⚠️ Wallet Not Connected
      </div>

      {/* 移动端提示 */}
      {isMobile && (
        <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg text-center">
          📱 <strong>Mobile Users:</strong> Use WalletConnect to connect any
          mobile wallet
        </div>
      )}

      {hasWalletConnectors ? (
        <>
          <div className="text-sm text-slate-600 mb-4 text-center">
            {isMobile
              ? "Choose your preferred connection method:"
              : "Please select a method to connect your wallet"}
          </div>

          <div className="flex flex-col gap-3 w-full">
            {connectors.map((connector) => {
              // 为不同的连接器提供更好的描述
              const getConnectorInfo = (connectorName: string) => {
                if (connectorName.includes("WalletConnect")) {
                  return {
                    name: "WalletConnect",
                    description: isMobile
                      ? "📱 For mobile wallets"
                      : "🔗 Scan QR code with mobile wallet",
                    icon: "🔗",
                  };
                }
                if (connectorName.includes("Coinbase")) {
                  return {
                    name: "Coinbase Wallet",
                    description: "🏦 Official Coinbase wallet",
                    icon: "🏦",
                  };
                }
                return {
                  name: connector.name,
                  description: isMobile
                    ? "🦊 In-app browser wallet"
                    : "🦊 Browser extension wallet",
                  icon: "🦊",
                };
              };

              const connectorInfo = getConnectorInfo(connector.name);

              return (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  disabled={isPending}
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:from-slate-400 disabled:to-slate-500 w-full transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  <span className="text-lg">{connectorInfo.icon}</span>
                  <div className="flex flex-col items-start">
                    <span>
                      {isPending ? "Connecting..." : connectorInfo.name}
                    </span>
                    <span className="text-xs opacity-90">
                      {connectorInfo.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="text-slate-600 font-medium">No Wallet Detected</div>
          <div className="text-sm text-slate-500">
            To use this application, you need a Web3 wallet
          </div>

          <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
            {/* 桌面端推荐 */}
            {!isMobile && (
              <>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-lg">
                    🦊
                  </div>
                  <span className="font-medium text-slate-700">
                    Install MetaMask
                  </span>
                </a>

                <a
                  href="https://www.coinbase.com/wallet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-lg">
                    📱
                  </div>
                  <span className="font-medium text-slate-700">
                    Get Coinbase Wallet
                  </span>
                </a>
              </>
            )}

            {/* 移动端推荐 */}
            {isMobile && (
              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-700">
                  Popular Mobile Wallets:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    <span className="text-2xl">🦊</span>
                    <span className="text-sm font-medium text-slate-700">
                      MetaMask
                    </span>
                  </a>
                  <a
                    href="https://trustwallet.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    <span className="text-2xl">🛡️</span>
                    <span className="text-sm font-medium text-slate-700">
                      Trust Wallet
                    </span>
                  </a>
                </div>
              </div>
            )}

            <div className="text-xs text-slate-500 mt-2 bg-slate-50 p-3 rounded-lg">
              {isMobile
                ? "💡 Install a wallet app, then return to this page and use WalletConnect"
                : "💡 Or use a mobile wallet that supports WalletConnect"}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm mt-2 text-center bg-red-50 p-3 rounded-lg border border-red-200">
          <div className="font-medium">Connection Failed</div>
          <div className="text-xs mt-1">{error.message}</div>
          <div className="text-xs mt-2 text-blue-600">
            {isMobile
              ? "Tip: Make sure you have a wallet app installed and try WalletConnect"
              : "Tip: Please install a wallet extension and refresh the page"}
          </div>
        </div>
      )}
    </div>
  );
}
