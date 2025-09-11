import Button from "@/components/shared/ui/Button";
import { useUtilityStore } from "@/store/utilityStore";
import { Image } from "@heroui/react";
import clsx from "clsx";
import React from "react";

// const doomydata = {
//   data: {
//     id: 28,
//     to_from: null,
//     sender_name: null,
//     transaction_type: "subscription",
//     amount: "4000.00",
//     status: "completed",
//     payment_type: "debit",
//     paystack_data: null,
//     paystack_ref: null,
//     vt_request_id: null,
//     description: "Ikeja electric Prepaid unit purchase",
//     reference_id: "8z22axcr53",
//     created_at: "2025-09-11T00:52:11.480868Z",
//     updated_at: "2025-09-11T00:52:21.279542Z",
//     user: "de4a66cf-31da-437f-9641-0ff132d36281",
//     otp: null,
//   },
//   message: "completed",
//   pin: {
//     code: "000",
//     content: {
//       transactions: {
//         status: "delivered",
//         product_name: "Ikeja Electric Payment - IKEDC",
//         unique_element: "1111111111111",
//         unit_price: "4000",
//         quantity: 1,
//         service_verification: null,
//         channel: "api",
//         commission: 60,
//         total_amount: 3940,
//         discount: null,
//         type: "Electricity Bill",
//         email: "apaysit@gmail.com",
//         phone: "09073502641",
//         name: null,
//         convinience_fee: 0,
//         amount: "4000",
//         platform: "api",
//         method: "api",
//         transactionId: "17575519320447904060695884",
//         commission_details: {
//           amount: 60,
//           rate: "1.50",
//           rate_type: "percent",
//           computation_type: "default",
//         },
//       },
//     },
//     response_description: "TRANSACTION SUCCESSFUL",
//     requestId: "8z22axcr53",
//     amount: 4000,
//     transaction_date: "2025-09-11T00:52:12.000000Z",
//     purchased_code: "Token : 26362054405982757802",
//     customerName: "N/A",
//     customerAddress: "N/A",
//     meterNumber: "N/A",
//     token: "Token : 26362054405982757802",
//     tokenAmount: 1860.47,
//     exchangeReference: "40532461",
//     resetToken: "N/A",
//     configureToken: "N/A",
//     units: "79.9 kWh",
//     fixChargeAmount: 0,
//     tariff: "R2 SINGLE PHASE RESIDENTIAL",
//     taxAmount: 0,
//     debtAmount: 0,
//     kct1: "N/A",
//     kct2: "N/A",
//     penalty: 0,
//     costOfUnit: 0,
//     announcement: "N/A",
//     meterCost: 0,
//     currentCharge: 0,
//     lossOfRevenue: 0,
//     tariffBaseRate: 0,
//     installationFee: 0,
//     reconnectionFee: 0,
//     meterServiceCharge: 0,
//     administrativeCharge: 0,
//   },
// };

const TransactionSummaryReceipt = () => {
  const { data: utilityStoreData, closeDrawer } = useUtilityStore();

  const { product_img, product_name, transaction_response } = utilityStoreData;

  console.log(transaction_response);

  const fields = [
    {
      label: "Customer Name",
      key: "customer_name",
      value: "Adeoye John Fixit",
    },
    {
      label: "Address",
      key: "address",
      value: "No. 4 Kate Gada str. igwe mgbe Abule egba Ekoro Lagos",
    },
    { label: "Meter No", key: "meter_no", value: "1111111111111" },
    { label: "Date", key: "date", value: "10th September, 2025" },
    { label: "Product", key: "product", value: "Electricity" },
    { label: "Provider", key: "product", value: "IBADAN" },
    { label: "Value", key: "value", value: "79.9 kWh" },
    {
      label: "Transaction Ref.",
      key: "transaction_ref",
      value: "17575519320447904060695884",
    },
    { label: "Total Paid", key: "total_paid", value: "1000.00" },
    { label: "Status", key: "status", value: "TRANSACTION SUCCESSFUL" },
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
        <div className="mt-4">
          <div className="space-y-3">
            {fields?.map((field, index) => (
              <div
                key={index + "___transaction_summary"}
                className="flex items-center justify-between gap-6"
              >
                <p
                  className={clsx(
                    "text-black text-start font-mono text-sm",
                    field.key === "token" ? "font-semibold" : "font-medium"
                  )}
                >
                  {field?.label}
                </p>
                <p
                  className={clsx(
                    "font-light text-xs text-end font-mono",
                    field.key === "token" ? "font-semibold" : "font-medium"
                  )}
                >
                  {field?.value}
                </p>
              </div>
            ))}
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
