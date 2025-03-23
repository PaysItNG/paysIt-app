"use client";
import Title from "@/components/shared/ui/Title";
import { Tab, Tabs } from "@heroui/react";
import React from "react";
import DashboardStatisticChart from "./DashboardStatisticChart";

const DashboardStatistic = () => {
  return (
    <>
      <main>
        <div className="flex justify-between">
          <Title title="Statistic" />
          <Tabs size="md" color="primary">
            <Tab key={"earning"} title="Earning" />
            <Tab key={"spending"} title="Spending" />
          </Tabs>
        </div>
        <div>
          <DashboardStatisticChart />
        </div>
      </main>
    </>
  );
};

export default DashboardStatistic;
