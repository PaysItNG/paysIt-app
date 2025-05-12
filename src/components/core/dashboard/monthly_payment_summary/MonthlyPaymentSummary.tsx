import Title from "@/components/shared/ui/Title";
import AddNewPayment from "./AddNewPayment";
import { IoFlashOutline } from "react-icons/io5";
import PayNowButton from "./PayNowButton";
import { formatCurrency } from "@/lib/utils/formatCurrency";

const MonthlyPaymentSummary = () => {
  return (
    <>
      <main className="rounded-large bg-white p-5">
        <div className="flex justify-between">
          <Title
            title="Monthly Payment"
            classNames={{
              title: "text-base font-medium",
            }}
          />
          <AddNewPayment />
        </div>
        <div className="mt-5">
          <div className="flex justify-between">
            <div className="flex gap-x-2 items-center">
              <div className="h-10 w-10 rounded-lg flex justify-center items-center text-white bg-[#fb726b]">
                <IoFlashOutline size={20} />
              </div>
              <div className="flex flex-col">
                <h3 className="font-medium text-[0.9rem] text-black">
                  Electricity
                </h3>
                <p className="text-gray-500 font-light text-[0.80rem]">
                  Pay before 5, July
                </p>
              </div>
            </div>
            <div className="flex gap-x-8 items-center">
              <h4 className="font-medium text-base">
                {formatCurrency(3000, "NGN")}
              </h4>
              <PayNowButton />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MonthlyPaymentSummary;
