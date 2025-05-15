import Input from "@/components/shared/ui/Input";
import Title from "@/components/shared/ui/Title";
import { DataPlanType, NetworkType } from "@/lib/utils/typeConfig";
import { validatePhoneNumber } from "@/lib/utils/validatePhoneNumber";
// import { Tab, Tabs } from "@heroui/react";
import clsx from "clsx";
import React, { useEffect, useMemo } from "react";
import DataPlanCard from "./DataPlanCard";
import { useDebounce } from "react-haiku";
import { useGetDataPlans } from "@/api/vtu";
import StarLoader from "@/components/shared/ui/loaders/StarLoader";
import { useUtilityStore } from "@/store/utilityStore";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Button from "@/components/shared/ui/Button";
import { HiOutlineChevronDown } from "react-icons/hi";

const colors: Record<NetworkType, string> = {
  MTN: "text-amber-500",
  AIRTEL: "text-red-500",
  GLO: "text-green-500",
  ETISALAT: "text-blue-500",
  "": "",
};

const PlanView = () => {
  const {
    data: { phoneNumber: storedPhone },
  } = useUtilityStore();

  const [network, setNetwork] = React.useState<NetworkType>("MTN");
  const [phoneNumber, setPhoneNumber] = React.useState<string>(
    (storedPhone as string) || ""
  );

  const {
    mutateAsync: mutateGetDataPlans,
    data,
    isPending: isLoadingDataPlans,
  } = useGetDataPlans();

  const debouncedNetwork = useDebounce(network, 1000);

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
  }, [debouncedNetwork, mutateGetDataPlans, network]);

  // const allPlans = useMemo
  const provider2Plans = useMemo(() => {
    const fetchedPlans = { ...data };
    return Array.isArray(fetchedPlans?.provider2) ? fetchedPlans.provider2 : [];
  }, [data]);

  const NetworkDropDown = () => {
    const pl: Record<NetworkType, string> = {
      MTN: "https://cdn.worldvectorlogo.com/logos/mtn-new-logo.svg",
      AIRTEL:
        "https://s3-ap-southeast-1.amazonaws.com/bsy/iportal/images/airtel-logo-white-text-vertical.jpg",
      GLO: "https://static-00.iconduck.com/assets.00/globacom-limited-icon-2048x2048-uovm3iz4.png",
      ETISALAT:
        "https://logo-download.com/wp-content/data/images/png/Etisalat-logo.png",
      "": "",
    };

    return (
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            size="lg"
            radius="sm"
            className="rounded-r-none flex gap-1"
            endContent={<HiOutlineChevronDown />}
          >
            <div>
              <Avatar
                src={pl[network] || ""}
                radius="full"
                className="h-7 w-7"
              />
            </div>
            {/* {network} */}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dropdown menu with icons"
          variant="faded"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={new Set([network])}
          onSelectionChange={(key) => setNetwork(key.anchorKey as NetworkType)}
        >
          <DropdownItem key="MTN" textValue="MTN">
            <div className="flex gap-1">
              <div>
                <Avatar src={pl["MTN"]} radius="full" className="h-6 w-6" />
              </div>
              MTN
            </div>
          </DropdownItem>
          <DropdownItem key="AIRTEL" textValue="AIRTEL">
            <div className="flex gap-1">
              <div>
                <Avatar src={pl["AIRTEL"]} radius="full" className="h-6 w-6" />
              </div>
              AIRTEL
            </div>
          </DropdownItem>
          <DropdownItem key="GLO" textValue="GLO">
            <div className="flex gap-1">
              <div>
                <Avatar src={pl["GLO"]} radius="full" className="h-6 w-6" />
              </div>
              GLO
            </div>
          </DropdownItem>
          <DropdownItem key="ETISALAT" textValue="ETISALAT">
            <div className="flex gap-1">
              <div>
                <Avatar
                  src={pl["ETISALAT"]}
                  radius="full"
                  className="h-6 w-6"
                />
              </div>
              ETISALAT
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center">
          <NetworkDropDown />
          <Input
            // label="Phone Number"
            // labelPlacement="outside"
            type="number"
            variant="bordered"
            placeholder="e.g 0910000000"
            size="lg"
            radius="sm"
            autoComplete="true"
            onChange={onChange}
            value={phoneNumber}
            className="placeholder:text-gray-400 text-sm"
            classNames={{
              inputWrapper: "px-4 shadow-none border-1 rounded-l-none",
            }}
          />
        </div>

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
                  network={network}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanView;
