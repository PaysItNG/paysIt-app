"use client";
import React, { useState } from "react";
import { BiCheckCircle, BiCreditCard, BiPlus, BiShield } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { CiLock } from "react-icons/ci";

const NewVirtualCardView = () => {
  const [activeTab, setActiveTab] = useState<"create" | "request">("create");
  const [cardName, setCardName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [spendingLimit, setSpendingLimit] = useState("");
  const [requestReason, setRequestReason] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreateCard = () => {
    if (cardName && spendingLimit) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setCardName("");
      setPurpose("");
      setSpendingLimit("");
    }
  };

  const handleRequestCard = () => {
    if (requestReason) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setRequestReason("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-white border-l-4 border-green-600 rounded-lg shadow-lg p-4 z-50 animate-pulse">
          <div className="flex items-center">
            <BiCheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-gray-800 font-medium">
              {activeTab === "create"
                ? "Virtual card created successfully!"
                : "Card request submitted!"}
            </span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6">
            <BiCreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Virtual Card Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create instant virtual cards or request new cards for your business
            needs
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-sm border">
            <button
              onClick={() => setActiveTab("create")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "create"
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              Create Card
            </button>
            <button
              onClick={() => setActiveTab("request")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "request"
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              Request Card
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            {activeTab === "create" ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-green-600 px-8 py-6">
                  <div className="flex items-center">
                    <BiPlus className="w-6 h-6 text-white mr-3" />
                    <h2 className="text-2xl font-bold text-white">
                      Create Virtual Card
                    </h2>
                  </div>
                  <p className="text-green-100 mt-2">
                    Generate a new virtual card instantly
                  </p>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Name *
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="e.g., Marketing Campaigns"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Purpose (Optional)
                    </label>
                    <input
                      type="text"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="What will this card be used for?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Spending Limit *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={spendingLimit}
                        onChange={(e) => setSpendingLimit(e.target.value)}
                        placeholder="1000"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <BiShield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Secure & Instant
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Your virtual card will be generated immediately with
                        bank-level security
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCreateCard}
                    disabled={!cardName || !spendingLimit}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center group"
                  >
                    Create Virtual Card
                    <BsArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-green-600 px-8 py-6">
                  <div className="flex items-center">
                    <CiLock className="w-6 h-6 text-white mr-3" />
                    <h2 className="text-2xl font-bold text-white">
                      Request New Card
                    </h2>
                  </div>
                  <p className="text-green-100 mt-2">
                    Submit a request for admin approval
                  </p>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Request Reason *
                    </label>
                    <textarea
                      value={requestReason}
                      onChange={(e) => setRequestReason(e.target.value)}
                      placeholder="Please explain why you need a new virtual card and how it will be used..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <CiLock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          Review Process
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Requests are typically reviewed within 1-2 business
                          days
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleRequestCard}
                    disabled={!requestReason}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center group"
                  >
                    Submit Request
                    <BsArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVirtualCardView;
