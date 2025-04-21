import Title from "@/components/shared/ui/Title";
import React from "react";
import AddCardButton from "./add_new_card/AddCardButton";
import CardDetail from "./CardDetail";

const CardInfoSectionView = () => {
  return (
    <main>
      <div className="flex justify-between gap-2">
        <Title
          title="Your Card"
          classNames={{
            title: "text-lg font-medium",
          }}
        />
        <AddCardButton />
      </div>
      <div className="mt-5 space-y-5">
        <div>{/* card here */}</div>
        <div>
          <CardDetail />
        </div>
      </div>
    </main>
  );
};

export default CardInfoSectionView;
