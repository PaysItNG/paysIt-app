import Input from "@/components/shared/ui/Input";
import Title from "@/components/shared/ui/Title";
import { DataPlanType, NetworkType } from "@/lib/utils/typeConfig";
import { validatePhoneNumber } from "@/lib/utils/validatePhoneNumber";
import { Tab, Tabs } from "@heroui/react";
import clsx from "clsx";
import React, { useEffect, useMemo } from "react";
import DataPlanCard from "./DataPlanCard";
import { useDebounce } from "react-haiku";
import { useGetDataPlans } from "@/api/vtu";
import StarLoader from "@/components/shared/ui/loaders/StarLoader";

const colors: Record<NetworkType, string> = {
  MTN: "text-yellow-500",
  AIRTEL: "text-red-500",
  GLO: "text-green-500",
  ETISALAT: "text-blue-500",
  Unknown: "",
  "": "",
};

const DataView = () => {
  const [network, setNetwork] = React.useState<NetworkType>("MTN");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");

  const {
    mutateAsync: mutateGetDataPlans,
    data,
    isPending: isLoadingDataPlans,
  } = useGetDataPlans();

  const debouncedPhoneNumber = useDebounce(phoneNumber, 1000);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 4) {
      setPhoneNumber(value);
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
  }, [debouncedPhoneNumber, mutateGetDataPlans, network]);

  // const allPlans = useMemo
  const provider2Plans = useMemo(() => {
    const fetchedPlans = { ...data };
    return Array.isArray(fetchedPlans?.provider2) ? fetchedPlans.provider2 : [];
  }, [data]);

  console.log(provider2Plans);

  return (
    <>
      <div className="space-y-4">
        <Input
          label="Phone Number"
          labelPlacement="outside"
          type="number"
          variant="bordered"
          size="lg"
          radius="sm"
          autoComplete="true"
          startContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="currency">
                network
              </label>
              <select
                className={clsx(
                  "outline-none border-0 bg-transparent font-semibold text-small",
                  colors[network]
                )}
                id="currency"
                name="currency"
                value={network}
                onChange={(e) => setNetwork(e.target.value as NetworkType)}
              >
                <option value={""}></option>
                <option value={"MTN"}>MTN</option>
                <option value={"AIRTEL"}>AIRTEL</option>
                <option value={"GLO"}>GLO</option>
                <option value={"ETISALAT"}>ETISALAT</option>
              </select>
            </div>
          }
          onChange={onChange}
          classNames={{
            inputWrapper: "px-4 shadow-none border-1",
          }}
        />

        <div className="rounded-large bg-white p-5 space-y-4">
          <div className="space-y-1">
            <Title
              title="Data Plans"
              classNames={{
                title: "text-lg font-medium",
              }}
            />
            {/* <Tabs size="md" color="primary" fullWidth variant="underlined">
              <Tab key={"daily"} title="Daily" />
              <Tab key={"weekly"} title="Weekly" />
              <Tab key={"monthly"} title="Monthly" />
            </Tabs> */}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-3 gap-y-4">
            {isLoadingDataPlans ? (
              <div className="h-52 flex justify-center items-center w-full col-span-3">
                <StarLoader size={30} />
              </div>
            ) : (
              provider2Plans?.map((plan: DataPlanType, index: number) => (
                <DataPlanCard
                  key={index + "___data_plans"}
                  phoneNumber={phoneNumber}
                  plan={plan}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DataView;
