import React from "react";
import Title from "@/components/shared/ui/Title";
import DashboardFinanceSummary from "@/components/core/dashboard/DashboardFinanceSummary";
import DashboardStatisticChart from "./DashboardStatistic";
import MonthlyPaymentSummary from "./monthly_payment_summary/MonthlyPaymentSummary";
const OverviewSection = () => {
  return (
    <>
      <main className="min-h-screen w-full">
        <div className="py-8">
          <Title
            title={"Overview"}
            sub={"Good morning Fixit"}
            classNames={{
              sub: "text-sm",
            }}
          />
          <div className="mt-10 space-y-5">
            <DashboardFinanceSummary />
            <DashboardStatisticChart />
            <MonthlyPaymentSummary />
          </div>
        </div>
      </main>
    </>
  );
};

export default OverviewSection;
