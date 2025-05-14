import React from "react";
import FinancialOverviewCard from "./FinancialOverviewCard";

const DashboardFinanceSummary = () => {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <FinancialOverviewCard name="Balance" type="earning" amount={50000} />
        <FinancialOverviewCard name="Spending" type="spending" amount={35000} />
      </main>
    </>
  );
};

export default DashboardFinanceSummary;
