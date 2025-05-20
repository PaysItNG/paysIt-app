import Input from "@/components/shared/ui/Input";
import Title from "@/components/shared/ui/Title";
import { DataPlanType, NetworkType } from "@/lib/utils/typeConfig";
import { validatePhoneNumber } from "@/lib/utils/validatePhoneNumber";
import { Tab, Tabs } from "@heroui/react";
import React, { useEffect, useMemo } from "react";
import DataPlanCard from "./DataPlanCard";
import { useDebounce } from "react-haiku";
import { useGetDataPlans } from "@/api/vtu";
import StarLoader from "@/components/shared/ui/loaders/StarLoader";
import { useUtilityStore } from "@/store/utilityStore";
import { MdOutlineHourglassEmpty } from "react-icons/md";
import { Divider } from "@heroui/react";
import NetworkDropDown from "../NetworkProviderDropdown";
import { serviceProvider } from "@/lib/utils/serviceProvider";

const PlanView = () => {
  const {
    data: { phoneNumber: storedPhone },
  } = useUtilityStore();

  const [network, setNetwork] = React.useState<NetworkType>("MTN");
  const [durationTab, setDurationTab] = React.useState<string>("daily");
  const [phoneNumber, setPhoneNumber] = React.useState<string>(
    storedPhone as string
  );

  const {
    mutateAsync: mutateGetDataPlans,
    data,
    isPending: isLoadingDataPlans,
  } = useGetDataPlans();

  const debouncedNetwork = useDebounce(network, 1000);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value.length >= 4) {
      const validationResult = validatePhoneNumber(value);
      setNetwork(validationResult.network);
    }
  };

  useEffect(() => {
    const dataQueryParam = {
      service_id: network?.toLowerCase(),
      service_type: "data",
    };
    mutateGetDataPlans(dataQueryParam);
  }, [debouncedNetwork, mutateGetDataPlans, network]);

  // const allPlans = useMemo
  const allPlans = useMemo(() => {
    const fetchedPlans = Array.isArray(data?.data)
      ? (data?.data as DataPlanType[])
      : [];
    return fetchedPlans || [];
  }, [data]);

  const currentTabPlans = useMemo(() => {
    const filteredPlans = allPlans?.filter((plan: DataPlanType) => {
      return plan?.duration === durationTab;
    });
    return filteredPlans;
  }, [allPlans, durationTab]);

  return (
    <>
      <div className="space-y-4 overflow-y-clip">
        <div className="flex items-center">
          <NetworkDropDown network={network} setNetwork={setNetwork} />
          <Input
            type="number"
            variant="bordered"
            placeholder="e.g 0910000000"
            size="lg"
            radius="sm"
            autoComplete="true"
            onChange={onChange}
            value={phoneNumber}
            className="placeholder:text-gray-400 text-xs"
            classNames={{
              inputWrapper: "px-4 shadow-none border-1 rounded-l-none",
            }}
          />
        </div>

        <div className="rounded-large bg-white p-5 space-y-4">
          <div className="space-y-1">
            <Title
              title="Data Plan"
              classNames={{
                title: "text-lg font-medium",
              }}
            />
            <Divider />
            <Tabs
              size="md"
              color="primary"
              fullWidth
              variant="underlined"
              onSelectionChange={(key) => setDurationTab(key as string)}
            >
              <Tab key={"daily"} title="Daily" />
              <Tab key={"weekly"} title="Weekly" />
              <Tab key={"monthly"} title="Monthly" />
            </Tabs>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-3 gap-y-4 max-h-[30rem] overflow-y-scroll">
            {isLoadingDataPlans ? (
              <div className="h-52 flex justify-center items-center w-full col-span-3">
                <StarLoader size={28} />
              </div>
            ) : currentTabPlans?.length > 0 ? (
              currentTabPlans?.map((plan: DataPlanType, index: number) => (
                <DataPlanCard
                  key={index + "___data_plans"}
                  phoneNumber={phoneNumber}
                  plan={plan}
                  network={network}
                  product_img={serviceProvider[network]}
                />
              ))
            ) : (
              <div className="h-52 flex flex-col gap-3 justify-center items-center w-full col-span-3 text-gray-400">
                <MdOutlineHourglassEmpty size={30} className="animate" />
                <Title
                  title={`No ${durationTab} Data Plans Available`}
                  classNames={{
                    title: "text-sm text-gray-400 font-medium",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanView;
