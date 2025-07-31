"use client";
import React, { useState } from "react";
import { BiCreditCard, BiMinus, BiPlus, BiSend } from "react-icons/bi";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { LuArrowUpDown } from "react-icons/lu";
import WalletSelector from "./CurrenyTab";
import { CurrencyType } from "@/lib/utils/typeConfig";
import { useSwapCurrencyStore } from "@/store/swapCurrencyStore";
import { useGetTransactions } from "@/api/transactions";
import QuickTransfer from "../dashboard/payment_activity_section/QuickTransfer";
import Title from "@/components/shared/ui/Title";
import RecentTransaction from "../transaction/RecentTransaction";
import UtilitySection from "../dashboard/payment_activity_section/utility_section/UtilitySection";

type Wallet = {
  balance: number;
  usd_balance: number;
  eur_balance: number;
  currency: string;
  // add other properties if needed
};

const MyWalletView = () => {
  const [balanceVisible, setBalanceVisible] = useState<boolean>(true);
  const [activeWallet, setActiveWallet] = useState<string>("naira");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const { data } = useGetTransactions({});

  const wallet_detail: Wallet | undefined = data?.wallet as Wallet | undefined;

  const { openDrawer } = useSwapCurrencyStore();

  const wallets = {
    naira: {
      currency: "NGN" as CurrencyType,
      symbol: "₦",
      balance: wallet_detail?.balance ?? 0,
      flag: "🇳🇬",
      color: "from-green-600 to-green-700",
      lightColor: "from-green-500 to-green-600",
      accentColor: "bg-green-500",
      transactions: [
        {
          type: "credit",
          amount: 150000,
          desc: "Salary Payment",
          time: "2 hours ago",
        },
        {
          type: "debit",
          amount: 25000,
          desc: "Online Transfer",
          time: "1 day ago",
        },
        {
          type: "credit",
          amount: 75000,
          desc: "Freelance Payment",
          time: "3 days ago",
        },
      ],
    },
    usd: {
      currency: "USD" as CurrencyType,
      symbol: "$",
      balance: wallet_detail?.usd_balance ?? 0,
      flag: "🇺🇸",
      color: "from-blue-600 to-blue-700",
      lightColor: "from-blue-500 to-blue-600",
      accentColor: "bg-blue-500",
      transactions: [
        {
          type: "credit",
          amount: 1200,
          desc: "Crypto Sale",
          time: "5 hours ago",
        },
        {
          type: "debit",
          amount: 850,
          desc: "International Transfer",
          time: "2 days ago",
        },
        {
          type: "credit",
          amount: 2500,
          desc: "Investment Return",
          time: "1 week ago",
        },
      ],
    },
  };

  const formatCurrency = (amount: string | number, currency: CurrencyType) => {
    if (!balanceVisible) return "****";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "NGN" ? "NGN" : "USD",
      minimumFractionDigits: 2,
    }).format(amount as number);
  };

  const handleWalletSwitch = (wallet: string) => {
    if (wallet !== activeWallet) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveWallet(wallet);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSwapCurrency = () => {
    openDrawer();
  };

  const currentWallet = wallets[activeWallet as keyof typeof wallets];

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-5">
        <div className="space-y-5 rounded-2xl border border-gray-300 p-4">
          {/* Wallet Selector */}
          <WalletSelector
            wallets={wallets}
            handleWalletSwitch={handleWalletSwitch}
            activeWallet={activeWallet}
          />
          <div
            className={`bg-gradient-to-br ${
              currentWallet.color
            } rounded-3xl p-8 mb-6 shadow-2xl transform transition-all duration-500 ${
              isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/70 text-sm mb-1">Available Balance</p>
                <div className="flex items-center space-x-3">
                  <h2 className="text-3xl font-bold text-white">
                    {formatCurrency(
                      currentWallet.balance,
                      currentWallet.currency
                    )}
                  </h2>
                  <button
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {balanceVisible ? (
                      <HiEyeOff className="w-5 h-5" />
                    ) : (
                      <HiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/70 text-sm">Account</div>
                <div className="text-white font-semibold">**** 1234</div>
              </div>
            </div>

            {/* Card Details */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/70 text-xs mb-1">Wallet Type</p>
                <p className="text-white font-semibold">
                  {currentWallet.currency} Wallet
                </p>
              </div>
              <div className="flex space-x-1">
                <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                <div className="w-8 h-5 bg-white/40 rounded-sm"></div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between flex-wrap gap-4 mb-6">
            <button
              className="bg-gradient-to-r w-full xl:w-fit from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-104 active:scale-95 shadow-lg flex items-center justify-center space-x-2"
              onClick={handleSwapCurrency}
            >
              <LuArrowUpDown className="w-5 h-5" />
              <span>Swap Currency</span>
            </button>
            <button className="bg-gradient-to-r w-full xl:w-fit from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-104 active:scale-95 shadow-lg flex items-center justify-center space-x-2">
              <BiSend className="w-5 h-5" />
              <span>Bank Transfer</span>
            </button>
          </div>
        </div>
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-4">
            {/* Recent Transactions */}
            <RecentTransaction currentWallet={currentWallet} />
            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-gray-300 p-6 space-y-5">
              <div>
                <Title
                  title="Quick Actions"
                  classNames={{
                    title: "text-base font-medium",
                  }}
                />
                <div className="grid grid-cols-3 gap-4">
                  <button className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <BiPlus className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-xs text-gray-700">Add Money</span>
                  </button>
                  <button className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <BiMinus className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-xs text-gray-700">Send Money</span>
                  </button>
                  <button className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <BiCreditCard className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs text-gray-700">Pay Bills</span>
                  </button>
                  {/* <button className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <GiBanknote className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-xs text-gray-700">Invest</span>
                  </button> */}
                </div>
              </div>
              <QuickTransfer />
              <UtilitySection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWalletView;
