import { CurrencyType } from "@/lib/utils/typeConfig";
import { FC } from "react";

type PropType = {
  wallets: {
    [key: string]: {
      currency: CurrencyType;
      symbol: string;
      balance: number | string;
      flag: string;
      color: string;
      lightColor: string;
      accentColor: string;
    };
  };
  handleWalletSwitch: (wallet: string) => void;
  activeWallet: string;
};
const WalletSelector: FC<PropType> = ({
  wallets,
  handleWalletSwitch,
  activeWallet,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl mb-6 border border-gray-300">
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(wallets).map(([key, wallet]) => (
          <button
            key={key}
            onClick={() => handleWalletSwitch(key)}
            className={`p-4 rounded-xl transition-all duration-300 ${
              activeWallet === key
                ? `bg-gradient-to-r ${wallet.color} text-white shadow-lg scale-105`
                : "text-gray-500 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">{wallet.flag}</span>
              <span className="font-semibold">{wallet.currency}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletSelector;
