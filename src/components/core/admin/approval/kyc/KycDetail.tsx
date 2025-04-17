import { useApproveOrRejectKyc, useGetKycDetail } from "@/api/kyc";
import ProfileHeaderInfoView from "@/components/core/profile/ProfileHeaderInfoView";
import ProfilePersonalInfoView from "@/components/core/profile/ProfilePersonalInfoView";
import Button from "@/components/shared/ui/Button";
import { notifier } from "@/lib/utils/notifier";
import { UserKycType } from "@/lib/utils/typeConfig";
import { useViewKycDetailStore } from "@/store/viewKycDetail";
import { AxiosError } from "axios";
import React, { useState } from "react";

const KycDetail = () => {
  const { data } = useViewKycDetailStore();

  const userData = data?.userData as UserKycType;

  //================get the kyc detail================
  const { data: kycData } = useGetKycDetail(userData?.id);
  console.log(kycData);
  //============

  return (
    <>
      <main className="space-y-4">
        <section className="space-y-4 min-h-[35rem]">
          <ProfileHeaderInfoView />
          <ProfilePersonalInfoView />
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
    executeAction("rejected");
  };
  const handleApproveKyc = () => {
    setAction("APPROVE");
    executeAction("approved");
  };

  const executeAction = async (status: string) => {
    const payload = {
      status,
    };
    console.log(payload);
    try {
      const res = await mutateAction(payload);
      notifier({ type: "success", message: res?.message || "" });
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
