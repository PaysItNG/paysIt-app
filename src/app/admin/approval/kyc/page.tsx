import KycUsersTable from "@/components/core/admin/approval/kyc/KycUsersTable";
import PageHeader from "@/components/shared/PageHeader";
import PageWrapper from "@/components/shared/PageWrapper";
import { Divider } from "antd";
import React from "react";

const KycApprovalPage = () => {
  const items = [{ name: "Approval" }, { name: "Kyc" }];
  return (
    <>
      <PageWrapper>
        <div>
          <PageHeader title="KYC Approval" breadCrumbItems={items} />

          <Divider orientation="left" orientationMargin="0">
            List of users KYC
          </Divider>
        </div>

        <KycUsersTable />
      </PageWrapper>
    </>
  );
};

export default KycApprovalPage;
