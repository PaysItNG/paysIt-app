import Button from "@/components/shared/ui/Button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import {
  statusColor,
  TransactionDataType,
  UtilityViews,
} from "@/lib/utils/typeConfig";
import { useUtilityStore } from "@/store/utilityStore";
import { Chip, Image } from "@heroui/react";
import clsx from "clsx";
import dayjs from "dayjs";
import React from "react";

const TransactionSummaryReceipt = () => {
  const { data: utilityStoreData, closeDrawer } = useUtilityStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    product_img,
    product_name,
    transaction_response,
    transaction_response_msg,
    transaction_response_status,
    utility_type,
  } = utilityStoreData as typeof utilityStoreData & {
    product_img: string;
    product_name: string;
    transaction_response: TransactionDataType;
    utility_type: UtilityViews;
  };

  const fields: {
    label: string;
    key: string;
    isDate?: boolean;
    isCurrency?: boolean;
    value: string;
  }[] = [
    {
      label: "Customer Name",
      key: "customer_name",
      value: transaction_response?.customer_name || "Adeoye John Fixit",
    },
    {
      label: "Customer Address",
      key: "customer_address",
      value:
        transaction_response?.customer_address ||
        "No. 4 Kate Gada str. igwe mgbe Abule egba Ekoro Lagos",
    },
    {
      label: "Meter No",
      key: "meter_no",
      value: transaction_response?.meter_no || "1111111111111",
    },
    {
      label: "Date",
      key: "created_at",
      isDate: true,
      value:
        dayjs(transaction_response.created_at).format("DD MMM. YY") ||
        "10th September, 2025",
    },
    { label: "Product", key: "product_name", value: "Electricity" },
    { label: "Value", key: "units", value: "79.9 kWh" },
    {
      label: "Transaction Ref.",
      key: "transaction_id",
      value: "17575519320447904060695884",
    },
    { label: "Total Paid", key: "amount", isCurrency: true, value: "1000.00" },
    { label: "Status", key: "status", value: "TRANSACTION SUCCESSFUL" },
    { label: "Description", key: "description", value: "26362054405982757802" },
    { label: "TOKEN(stdToken)", key: "token", value: "26362054405982757802" },
  ];
  return (
    <main className="w-full space-y-4">
      <div className="bg-green-100 p-4">
        <div className="flex flex-col items-center justify-center mb-4 gap-3">
          <Image
            src={"/assets/images/paysIt_logo.jpeg"}
            alt="paysIt logo"
            width={40}
            height={40}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
          <div className="flex gap-2 items-center">
            <Image
              src={product_img as string}
              alt="paysIt logo"
              width={30}
              height={30}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
            <h3 className="text-lg font-bold text-gray-800 font-mono">
              {product_name as string}
            </h3>
          </div>
        </div>
      </div>
      <div className="px-6">
        <h3 className="text-center font-semibold font-mono">
          Transasction Summary
        </h3>
        <div
          className={clsx(
            "border p-2 rounded-lg mt-2",
            transaction_response_status === "success"
              ? "bg-green-100 border-green-300"
              : transaction_response_status === "pending"
              ? "bg-yellow-100 border-yellow-300"
              : "bg-red-100 border-red-300"
          )}
        >
          <p>{transaction_response_msg as string}</p>
        </div>
        <div className="mt-4">
          <div className="space-y-3">
            {fields?.map(
              (field, index) =>
                field.key in transaction_response && (
                  <div
                    key={index + "___transaction_summary"}
                    className="flex items-center justify-between gap-6"
                  >
                    <p
                      className={clsx(
                        "text-black text-start font-mono text-sm",
                        field.key === "token"
                          ? "font-semibold"
                          : "font-medium text-[0.95rem]"
                      )}
                    >
                      {field?.label}
                    </p>
                    <p
                      className={clsx(
                        "font-light text-xs text-end font-mono",
                        field.key === "token"
                          ? "font-semibold text-[0.95rem"
                          : "font-medium"
                      )}
                    >
                      {field.isDate ? (
                        dayjs(transaction_response[field.key]).format(
                          "DD MMMM, YYYY"
                        )
                      ) : field.key === "status" ? (
                        <Chip
                          color={
                            statusColor[
                              transaction_response.status?.toLowerCase() as keyof typeof statusColor
                            ]
                          }
                          variant="flat"
                          className="capitalize"
                        >
                          {transaction_response.status}
                        </Chip>
                      ) : field.isCurrency ? (
                        formatCurrency(
                          transaction_response?.[field.key] as string
                        )
                      ) : (
                        transaction_response?.[field.key] || field?.value
                      )}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      <div className="bg-green-200 h-10 w-full"></div>
      <div className="mt-4 flex justify-center">
        <Button color="primary" onPress={() => closeDrawer()}>
          Close
        </Button>
      </div>
    </main>
  );
};

export default TransactionSummaryReceipt;
