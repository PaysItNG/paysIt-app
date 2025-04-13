import React from "react";
import OverviewSection from "@/components/core/dashboard/OverviewSection";

const Dashboard = () => {
  return (
    <>
      <main className="grid lg:grid-cols-2">
        <OverviewSection />
        <div></div>
      </main>
    </>
  );
};

export default Dashboard;
