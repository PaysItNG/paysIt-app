import Button from "@/components/shared/ui/Button";
import Input from "@/components/shared/ui/Input";
import NumberInput from "@/components/shared/ui/NumberInput";
import { notifier } from "@/lib/utils/notifier";
import { NetworkType, PreviewDataType } from "@/lib/utils/typeConfig";
import { validatePhoneNumber } from "@/lib/utils/validatePhoneNumber";
import clsx from "clsx";
import React from "react";
import NetworkDropDown from "../NetworkProviderDropdown";
import { serviceProvider } from "@/lib/utils/serviceProvider";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useUtilityStore } from "@/store/utilityStore";

const AirtimeInitialView = () => {
  const {
    data: { phoneNumber: storedPhone, product_amount: storedAmount },
    updateData,
  } = useUtilityStore();
  const [network, setNetwork] = React.useState<NetworkType>("MTN");
  const [amount, setAmount] = React.useState<number>(storedAmount as number);
  const [phoneNumber, setPhoneNumber] = React.useState<string>(
    storedPhone as string
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value.length >= 4) {
      const validationResult = validatePhoneNumber(value);
      setNetwork(validationResult.network);
    }
  };

  const handleOnChangeAmount = (value: number) => {
    setAmount(value);
  };

  const handleTopup = () => {
    if (!phoneNumber) {
      notifier({ message: "Please enter Recipient Number", type: "error" });
      return;
    } else if (!amount) {
      notifier({ message: "Please Select or Enter Amount", type: "error" });
      return;
    }

    //<<<<<<<<<<<<<<<<<<< PREVIEW DATA >>>>>>>>>>>>>>>>>>>>
    const previewData: PreviewDataType[] = [
      {
        key: "product_name",
        label: "Product Name",
        value: "Mobile Data",
        product_img: serviceProvider[network],
      },
      { key: "recipient", label: "Recipient", value: phoneNumber },
      // {
      //   key: "data_bundle",
      //   label: "Data Bundle",
      //   value: `${plan?.qty} - ${
      //     validity[plan?.duration as keyof typeof validity]
      //   }`,
      // },
      { key: "amount", label: "Amount", value: formatCurrency(amount) },
    ];
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>
    updateData({
      phoneNumber,
      network,
      product_amount: amount,
      currentView: "preview",
      previewData,
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center">
          <NetworkDropDown network={network} setNetwork={setNetwork} />
          <Input
            aria-label="phone_number"
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

        <NumberInput
          aria-label="airtime_amount"
          variant="bordered"
          placeholder="Enter the amount"
          radius="sm"
          step={10}
          value={amount}
          classNames={{
            input: "text-lg font-medium",
          }}
          onValueChange={(value) => handleOnChangeAmount(value)}
        />
        {/* <div className="flex gap-3 items-center justify-center">
          {[100, 200, 500, 1000].map((amt, index) => (
            <div
              key={index + "___suggested_amount"}
              className={clsx(
                "border-1.5 w-16 h-14 rounded-lg flex items-center justify-center cursor-pointer font-medium text-lg",
                amount === Number(amt)
                  ? "border-green-800"
                  : "border-default-200"
              )}
              onClick={() => handleOnChangeAmount(amt)}
            >
              {amt}
            </div>
          ))}
        </div> */}
        <div className="flex justify-end">
          <Button
            radius="sm"
            size="lg"
            className="mt-3 text-base bg-green-800 text-white"
            onPress={handleTopup}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default AirtimeInitialView;
