import { APP_ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

type PropTypes = {
  currentWallet: {
    transactions: {
      type: string;
      amount: string | number;
      desc: string;
      time: string;
    }[];
    symbol: string;
  };
};

const RecentTransaction: FC<PropTypes> = ({ currentWallet }) => {
  const router = useRouter();

  const goToAllTransaction = () => {
    router.push(APP_ROUTES.TRANSACTIONS);
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-gray-300 py-6">
      <div className="flex justify-between items-center mb-4 px-6">
        <h3 className="font-semibold">Recent Transactions</h3>
        <button
          className="text-green-500 text-sm hover:text-green-500/80 transition-colors"
          onClick={goToAllTransaction}
        >
          View All
        </button>
      </div>
      <div className="space-y-4">
        {currentWallet.transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-6 hover:bg-gray-200/60 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  transaction.type === "credit"
                    ? "bg-green-500/20"
                    : "bg-red-500/20"
                }`}
              >
                {transaction.type === "credit" ? (
                  <BiPlus className="w-5 h-5 text-green-400" />
                ) : (
                  <BiMinus className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.desc}</p>
                <p className="text-gray-400 text-xs">{transaction.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  transaction.type === "credit"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {transaction.type === "credit" ? "+" : "-"}
                {currentWallet.symbol}
                {transaction.amount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;
