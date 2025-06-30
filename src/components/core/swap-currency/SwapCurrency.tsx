import React, { useState, useEffect } from "react";
import { BiGlobe, BiTrendingUp } from "react-icons/bi";
import { GoZap } from "react-icons/go";
import { LuArrowUpDown } from "react-icons/lu";

const SwapCurrency = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState<number | string>("1000");
  const [convertedAmount, setConvertedAmount] = useState("850.00");
  const [isSwapping, setIsSwapping] = useState(false);
  const [rates] = useState<Record<string, number>>({
    "USD-EUR": 0.85,
    "EUR-USD": 1.18,
    "USD-GBP": 0.73,
  });

  const currencies = [
    { code: "NGN", name: "Naira", flag: "🇳🇬" },
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
  ];

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setIsSwapping(false);
    }, 300);
  };

  const handleAmountChange = (value: number | string) => {
    setAmount(value);
    const rate = rates[`${fromCurrency}-${toCurrency}`] || 0.85;
    const converted = (parseFloat(value as string) * rate).toFixed(2);
    setConvertedAmount(converted);
  };

  useEffect(() => {
    const rate = rates[`${fromCurrency}-${toCurrency}`] || 0.85;
    const converted = (parseFloat(amount as string) * rate).toFixed(2);
    setConvertedAmount(converted);
  }, [fromCurrency, toCurrency, amount, rates]);

  return (
    <div className="min-h-screen b-gradient-to-br from-slate-900 via-[#9ebd87] to-slate-900 p-4 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Main Card */}
        <div className=" backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/20 transform hover:scale-[1.02] transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl mb-4 shadow-lg">
              <BiGlobe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-whit mb-2">Currency Swap</h1>
            <p className="text-gray-400">
              Exchange currencies at live market rates
            </p>
          </div>

          {/* From Currency */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              From
            </label>
            <div className="bg-white/5 rounded-2xl p-4 border hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="bg-transparent text-whit text-lg font-semibold focus:outline-none cursor-pointer"
                >
                  {currencies.map((currency) => (
                    <option
                      key={currency.code}
                      value={currency.code}
                      className="bg-slate-800"
                    >
                      {currency.flag} {currency.code}
                    </option>
                  ))}
                </select>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Balance</div>
                  <div className="text-white font-semibold">$25,430.50</div>
                </div>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full bg-transparent text-2xl font-bold placeholder-gray-600 focus:outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSwap}
              className={`w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 active:scale-95 ${
                isSwapping ? "rotate-180" : ""
              }`}
            >
              <LuArrowUpDown className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* To Currency */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              To
            </label>
            <div className="bg-white/5 rounded-2xl p-4 border hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="bg-transparent text-lg font-semibold focus:outline-none cursor-pointer"
                >
                  {currencies.map((currency) => (
                    <option
                      key={currency.code}
                      value={currency.code}
                      className="bg-slate-800"
                    >
                      {currency.flag} {currency.code}
                    </option>
                  ))}
                </select>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">
                    You&apos;ll receive
                  </div>
                  <div className="text-green-400 font-semibold flex items-center">
                    <BiTrendingUp className="w-4 h-4 mr-1" />~{convertedAmount}
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                {convertedAmount}
              </div>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <div className="bg-green-600/10 rounded-2xl p-4 mb-6 border border-green-500/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Exchange Rate</span>
              <span className="text-green-400 font-semibold">
                1 {fromCurrency} ={" "}
                {(rates[`${fromCurrency}-${toCurrency}`] || 0.85).toFixed(4)}{" "}
                {toCurrency}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-500">Processing Fee</span>
              <span className="text-green-400 font-semibold">$0.00</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-green-500/25 flex items-center justify-center space-x-2">
            <GoZap className="w-5 h-5" />
            <span>Swap Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapCurrency;
