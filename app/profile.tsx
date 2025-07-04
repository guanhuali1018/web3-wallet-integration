"use client";
import { useAccount, useEnsName, useChainId } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export function Profile() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  // 只在支持ENS的网络上查询ENS名称
  const supportsENS = chainId === mainnet.id || chainId === sepolia.id;

  const { data, error, status } = useEnsName({
    address,
    chainId: supportsENS ? chainId : mainnet.id, // 如果当前网络不支持ENS，则使用主网查询
    query: {
      enabled: isConnected && supportsENS, // 只在支持ENS的网络上启用查询
    },
  });

  if (!isConnected) {
    return (
      <div className="p-6 border-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg">
        <div className="text-center text-slate-500 font-medium">
          Please connect your wallet to view profile
        </div>
      </div>
    );
  }

  // 获取当前网络名称
  const getCurrentNetworkName = () => {
    switch (chainId) {
      case mainnet.id:
        return "Ethereum";
      case sepolia.id:
        return "Sepolia";
      default:
        return "Current Network";
    }
  };

  if (!supportsENS) {
    return (
      <div className="p-6 border-0 rounded-xl bg-white shadow-lg">
        <div className="text-center space-y-3">
          <div className="text-lg font-semibold text-slate-800">
            <span className="text-slate-500">ENS Not Available</span>
          </div>
          <div className="text-sm text-slate-600 font-mono bg-slate-100 px-3 py-2 rounded-lg inline-block">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            💡 ENS names are only available on Ethereum networks
          </div>
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="p-6 border-0 rounded-xl bg-white shadow-lg">
        <div className="text-center text-slate-600 font-medium">
          Loading ENS name on {getCurrentNetworkName()}...
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="p-6 border-0 rounded-xl bg-white shadow-lg">
        <div className="text-red-600 text-center font-medium">
          Failed to query ENS name: {error?.message}
        </div>
        <div className="text-sm text-slate-600 text-center mt-2 font-mono bg-slate-100 px-3 py-1 rounded-lg inline-block">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border-0 rounded-xl bg-white shadow-lg">
      <div className="text-center space-y-3">
        <div className="text-lg font-semibold text-slate-800">
          {data ? (
            <span className="text-purple-600">{data}</span>
          ) : (
            <span className="text-slate-500">No ENS Name Set</span>
          )}
        </div>
        <div className="text-sm text-slate-600 font-mono bg-slate-100 px-3 py-2 rounded-lg inline-block">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        {supportsENS && (
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            ✅ ENS lookup on {getCurrentNetworkName()}
          </div>
        )}
      </div>
    </div>
  );
}
