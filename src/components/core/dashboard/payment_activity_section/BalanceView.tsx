import { formatCurrency } from "@/lib/utils/formatCurrency";
import { GoArrowUpRight } from "react-icons/go";

const BalanceView = () => {
  return (
    <div className="text-center flex flex-col gap-2 items-center">
      <p className="text-default-500 text-base font-medium">Total Balance</p>
      <h3 className="font-bold text-3xl">{formatCurrency(0)}</h3>
      <div className="flex gap-x-1 items-center">
        <div className="p- bg-orange-200 text-orange-500 rounded-full p-1.5">
          <GoArrowUpRight size={16} />
        </div>
        <p className="text-xs">12.81%</p>
      </div>
    </div>
  );
};

export default BalanceView;
