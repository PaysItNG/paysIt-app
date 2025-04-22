import React from "react";
import OverviewSection from "@/components/core/dashboard/OverviewSection";
import CardInfoSectionView from "@/components/core/dashboard/card_info_section/CardInfoSectionView";
import PaymentinfoSection from "@/components/core/dashboard/payment_info_section/PaymentinfoSection";

const Dashboard = () => {
  return (
    <>
      <main className="grid lg:grid-cols-2 gap-4">
        <OverviewSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CardInfoSectionView />
          <PaymentinfoSection />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
