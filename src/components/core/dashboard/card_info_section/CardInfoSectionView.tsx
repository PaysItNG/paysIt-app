"use client";

import Title from "@/components/shared/ui/Title";
import React, { useCallback, useEffect } from "react";
import AddCardButton from "./add_new_card/AddCardButton";
import CardDetail from "./CardDetail";
import { MasterCard } from "@/lib/design/cards";
import { useStripe } from "@stripe/react-stripe-js";
import { useProfile } from "@/hooks/use-profile";
import { useGetEphemeralKeys } from "@/api/virtual-card";

const CardInfoSectionView = () => {
  const { mutateAsync: mutateGetEphemeralKeys } = useGetEphemeralKeys();

  const { profileData } = useProfile();

  const stripe = useStripe();

  const cardData = profileData?.allObjects?.card;

  const customerId = cardData?.card_ref_id;

  const fetchCardPreview = useCallback(async () => {
    if (!stripe || !customerId) return null;
    try {
      const nonceResult = await stripe.createEphemeralKeyNonce({
        issuingCard: customerId,
      });

      if (!nonceResult.nonce) {
        throw new Error("Failed to create ephemeral key nonce");
      }
      // 1. Get ephemeral key from your backend
      const ephemeralResponse = await mutateGetEphemeralKeys({
        card_id: customerId,
        nonce: nonceResult.nonce,
      });

      // 2. Use ephemeral key to query customer’s saved cards
      const paymentMethodsRes = await fetch(
        `https://api.stripe.com/v1/payment_methods?customer=${customerId}&type=card`,
        {
          headers: {
            Authorization: `Bearer ${ephemeralResponse?.data}`,
            "Stripe-Version": "2025-07-30.basil",
          },
        }
      );
      const data = await paymentMethodsRes.json();

      console.log(data);

      // 3. Extract preview data
      // return data.data.map((pm) => ({
      //   brand: pm.card.brand,
      //   last4: pm.card.last4,
      //   expMonth: pm.card.exp_month,
      //   expYear: pm.card.exp_year,
      // }));
    } catch (err) {
      console.log(err);
    }
  }, [customerId, mutateGetEphemeralKeys, stripe]);

  useEffect(() => {
    fetchCardPreview().then(console.log);
  }, [fetchCardPreview]);

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
          <MasterCard balance={0} cardNo="123456789392" expiryDate={"09/26"} />
        </div>
        <CardDetail />
      </div>
    </main>
  );
};

export default CardInfoSectionView;
