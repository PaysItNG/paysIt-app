import Button from "@/components/shared/ui/Button";
import Input from "@/components/shared/ui/Input";
import NumberInput from "@/components/shared/ui/NumberInput";
import { NetworkType } from "@/lib/utils/typeConfig";
import { validatePhoneNumber } from "@/lib/utils/validatePhoneNumber";
import clsx from "clsx";
import React from "react";

const colors: Record<NetworkType, string> = {
  MTN: "text-yellow-500",
  AIRTEL: "text-red-500",
  GLO: "text-green-500",
  ETISALAT: "text-blue-500",
  Unknown: "",
  "": "",
};

const AirtimeView = () => {
  const [network, setNetwork] = React.useState<NetworkType>("MTN");
  const [amount, setAmount] = React.useState<number | string>(0);
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 4) {
      setPhoneNumber(value);
      const validationResult = validatePhoneNumber(value);
      setNetwork(validationResult.network);
    }
  };

  const handleOnChangeAmount = (value: string | number) => {
    setAmount(value);
  };

  const handleTopup = () => {
    // Handle top-up logic here
    console.log("Top-up initiated with", { network, amount, phoneNumber });
  };

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
        <div className="flex gap-3 items-center justify-center">
          {[100, 200, 500, 1000].map((amt, index) => (
            <div
              key={index + "___suggested_amount"}
              className={clsx(
                "border-2 w-16 h-14 rounded-lg flex items-center justify-center cursor-pointer font-medium",
                amount === Number(amt)
                  ? "border-green-800"
                  : "border-default-200"
              )}
              onClick={() => handleOnChangeAmount(amt)}
            >
              {amt}
            </div>
          ))}
        </div>
        <NumberInput
          label="Amount"
          variant="bordered"
          placeholder="Enter the amount"
          radius="sm"
          step={10}
          onValueChange={(value) => handleOnChangeAmount(value)}
        />
        <div className="flex justify-end">
          <Button
            radius="sm"
            size="lg"
            className="mt-3 text-base bg-green-800 text-white"
            onPress={handleTopup}
          >
            Top-up
          </Button>
        </div>
      </div>
    </>
  );
};

export default AirtimeView;
