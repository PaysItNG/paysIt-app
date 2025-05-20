"use client";
import React from "react";
import Title from "@/components/shared/ui/Title";
import DashboardFinanceSummary from "@/components/core/dashboard/DashboardFinanceSummary";
import DashboardStatisticChart from "./DashboardStatistic";
import MonthlyPaymentSummary from "./monthly_payment_summary/MonthlyPaymentSummary";
import { useProfile } from "@/hooks/use-profile";
import { useGetTransactions } from "@/api/auth/transactions";
const OverviewSection = () => {
  const { profileData } = useProfile();

  const { data } = useGetTransactions({});

  console.log(data);

  return (
    <>
      <main className="min-h-screen w-full">
        <div className="">
          <Title
            title={"Overview"}
            sub={
              <span>
                Good morning{" "}
                <span className="capitalize font-medium">
                  {profileData?.user?.first_name}
                  {/* {profileData?.user?.last_name} */}
                </span>
              </span>
            }
            classNames={{
              sub: "text-sm",
            }}
          />
          <div className="mt-5 space-y-5">
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
