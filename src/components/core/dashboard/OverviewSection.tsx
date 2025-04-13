"use client";
import React from "react";
import Title from "@/components/shared/ui/Title";
import DashboardFinanceSummary from "@/components/core/dashboard/DashboardFinanceSummary";
import DashboardStatisticChart from "./DashboardStatistic";
import MonthlyPaymentSummary from "./monthly_payment_summary/MonthlyPaymentSummary";
import { useProfile } from "@/hooks/use-profile";
const OverviewSection = () => {
  const { profileData } = useProfile();

  return (
    <>
      <main className="min-h-screen w-full">
        <div className="py-8">
          <Title
            title={"Overview"}
            sub={
              <span>
                Good morning{" "}
                <span className="capitalize">
                  {profileData?.user?.first_name} {profileData?.user?.last_name}
                </span>
              </span>
            }
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
