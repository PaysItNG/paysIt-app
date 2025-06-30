import React from "react";
import FinancialOverviewCard from "./FinancialOverviewCard";
import { useGetTransactions } from "@/api/transactions";

const DashboardFinanceSummary = () => {
  const { data } = useGetTransactions({});

  const credit_debit_amount: { credit: number; debit: number } =
    (data?.amount as { credit: number; debit: number }) || {
      credit: 0,
      debit: 0,
    };

  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <FinancialOverviewCard
          name="Credit"
          type="earning"
          amount={credit_debit_amount.credit}
        />
        <FinancialOverviewCard
          name="Debit"
          type="spending"
          amount={credit_debit_amount.debit}
        />
      </main>
    </>
  );
};

export default DashboardFinanceSummary;
