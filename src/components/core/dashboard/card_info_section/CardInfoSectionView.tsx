"use client";

import Title from "@/components/shared/ui/Title";
import AddCardButton from "./add_new_card/AddCardButton";
import CardDetail from "./CardDetail";
import { MasterCard } from "@/lib/design/cards";
import { useProfile } from "@/hooks/use-profile";
import { format, isValid } from "date-fns";

const CardInfoSectionView = () => {
  const { profileData } = useProfile();

  const profileSavedCard = profileData?.allObjects?.card;

  const cardExpiryDate = profileSavedCard?.expiry_date
    ? new Date(profileSavedCard?.expiry_date)
    : "";

  let formattedCardExpiryData = "";

  if (cardExpiryDate) {
    const dateObj = new Date(cardExpiryDate);
    if (isValid(dateObj)) {
      formattedCardExpiryData = format(dateObj, "MM/yy");
    }
  }

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
      <div className="mt-5 space-y-5 md:flex md:gap-5 md:space-y-4 lg:block flex-wrap w-full">
        <div className="w-full">
          <MasterCard
            balance={profileSavedCard?.balance || 0}
            cardNo={profileSavedCard?.last_four}
            expiryDate={formattedCardExpiryData}
          />
        </div>
        <CardDetail />
      </div>
    </main>
  );
};

export default CardInfoSectionView;
