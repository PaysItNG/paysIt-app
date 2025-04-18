import { useApproveOrRejectKyc, useGetKycDetail } from "@/api/kyc";
import Button from "@/components/shared/ui/Button";
import { notifier } from "@/lib/utils/notifier";
import { UserKycType } from "@/lib/utils/typeConfig";
import { useViewKycDetailStore } from "@/store/viewKycDetail";
import { AxiosError } from "axios";
import React, { useState } from "react";
import KycDetailHeader from "./KycDetailHeader";
import KycIdentification from "./KycIdentification";

const KycDetail = () => {
  const { data } = useViewKycDetailStore();

  const userData = data?.userData as UserKycType;

  //================get the kyc detail================
  const { data: getKycData, isPending: isLoading } = useGetKycDetail(
    userData?.id
  );

  const kycData = getKycData?.data as UserKycType;

  //============

  return (
    <>
      <main className="space-y-4">
        <section className="space-y-4 min-h-[35rem]">
          <KycDetailHeader
            user={userData.user}
            isLoading={isLoading}
            submitted_at={kycData?.submitted_at}
            submitted={kycData?.submitted as boolean}
            status={kycData?.status}
          />
          <KycIdentification kycData={kycData} isLoading={isLoading} />
        </section>

        {<KycActionButtons data={userData} />}
      </main>
    </>
  );
};

export default KycDetail;

const KycActionButtons = ({ data }: { data: UserKycType }) => {
  const [action, setAction] = useState<string>("");

  const { mutateAsync: mutateAction, isPending: isLoading } =
    useApproveOrRejectKyc(data?.id);
  const handleRejectKyc = () => {
    setAction("REJECT");
    executeAction("rejected", "rejected");
  };
  const handleApproveKyc = () => {
    setAction("APPROVE");
    executeAction("approved", "approved");
  };

  const executeAction = async (status: string, action: string) => {
    const payload = {
      status,
    };
    try {
      const res = await mutateAction(payload);
      const resMsg = res?.message || `KYC ${action} successfully`;
      notifier({
        type: "success",
        message: resMsg,
      });
    } catch (err) {
      const errMsg =
        (err as AxiosError<{ message: string }>)?.response?.data?.message ||
        (err instanceof Error ? err.message : "An unknown error occurred");
      notifier({ message: errMsg, type: "error" });
    }
  };

  return (
    <div className="flex justify-between">
      <Button
        color="danger"
        onPress={handleRejectKyc}
        isLoading={action === "REJECT" && isLoading}
        isDisabled={isLoading}
      >
        Reject
      </Button>
      <Button
        color="primary"
        onPress={handleApproveKyc}
        isLoading={action === "APPROVE" && isLoading}
        isDisabled={isLoading}
      >
        Approve
      </Button>
    </div>
  );
};
