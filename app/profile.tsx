"use client";
import { useAccount, useEnsName } from "wagmi";

export function Profile() {
  const { address, isConnected } = useAccount();
  const { data, error, status } = useEnsName({ address });

  if (!isConnected) {
    return (
      <div className="p-6 border-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg">
        <div className="text-center text-slate-500 font-medium">
          Please connect your wallet to view profile
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="p-6 border-0 rounded-xl bg-white shadow-lg">
        <div className="text-center text-slate-600 font-medium">
          Loading ENS name...
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
      </div>
    </div>
  );
}
