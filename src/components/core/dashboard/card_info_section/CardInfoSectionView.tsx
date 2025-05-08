import Title from "@/components/shared/ui/Title";
import React from "react";
import AddCardButton from "./add_new_card/AddCardButton";
import CardDetail from "./CardDetail";
import { MasterCard } from "@/lib/design/cards";

const CardInfoSectionView = () => {
  return (
    <main className="order-2 lg:order-1">
      <div className="flex justify-between gap-2">
        <Title
          title="Your Card"
          classNames={{
            title: "text-lg font-medium",
          }}
        />
        <AddCardButton />
      </div>
      <div className="mt-5 space-y-5 md:flex md:gap-5 md:space-y-0 lg:block flex-wrap w-full">
        <div className="w-full">
          <MasterCard balance={0} cardNo="123456789392" expiryDate={"09/26"} />
        </div>
        <CardDetail />
      </div>
    </main>
  );
};

export default CardInfoSectionView;
