import { Profile } from "./profile";
import { ConnectWallet } from "./connect-wallet";
import { ChainInfo } from "./chain-info";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Web3 Wallet Application
        </h1>

        <div className="max-w-md mx-auto space-y-6">
          <ConnectWallet />
          <ChainInfo />
          <Profile />
        </div>
      </div>
    </div>
  );
}
