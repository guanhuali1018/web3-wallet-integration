"use client";

import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { mainnet, sepolia, polygon } from "wagmi/chains";

export function ChainInfo() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  if (!isConnected) {
    return (
      <div className="p-6 border-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg">
        <div className="text-center text-slate-500 font-medium">
          Connect wallet to view network information
        </div>
      </div>
    );
  }

  const getCurrentChain = () => {
    switch (chainId) {
      case mainnet.id:
        return {
          name: "Ethereum Mainnet",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          id: chainId,
        };
      case sepolia.id:
        return {
          name: "Sepolia Testnet",
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
          id: chainId,
        };
      case polygon.id:
        return {
          name: "Polygon Mainnet",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          id: chainId,
        };
      default:
        return {
          name: "Unknown Network",
          color: "text-red-600",
          bgColor: "bg-red-50",
          id: chainId,
        };
    }
  };

  const currentChain = getCurrentChain();

  return (
    <div className="p-6 border-0 rounded-xl bg-white shadow-lg">
      <div className="text-center space-y-4">
        <div className={`${currentChain.bgColor} rounded-lg p-4`}>
          <div className="text-sm text-slate-500 font-medium">
            Current Network
          </div>
          <div className={`text-lg font-bold ${currentChain.color}`}>
            {currentChain.name}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">
            Chain ID: {currentChain.id}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-slate-600 font-medium">
            Switch Network:
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {chainId !== mainnet.id && (
              <button
                onClick={() => switchChain({ chainId: mainnet.id })}
                disabled={isPending}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                {isPending ? "Switching..." : "Ethereum"}
              </button>
            )}
            {chainId !== sepolia.id && (
              <button
                onClick={() => switchChain({ chainId: sepolia.id })}
                disabled={isPending}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm hover:from-emerald-600 hover:to-emerald-700 disabled:from-slate-400 disabled:to-slate-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                {isPending ? "Switching..." : "Sepolia"}
              </button>
            )}
            {chainId !== polygon.id && (
              <button
                onClick={() => switchChain({ chainId: polygon.id })}
                disabled={isPending}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm hover:from-purple-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                {isPending ? "Switching..." : "Polygon"}
              </button>
            )}
          </div>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
          💡 Wagmi will interact with the network your wallet is currently
          connected to
        </div>
      </div>
    </div>
  );
}
