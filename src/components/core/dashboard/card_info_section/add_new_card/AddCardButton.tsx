"use client";
import { useCreateVirtualCard } from "@/api/virtual-card";
import { useProfile } from "@/hooks/use-profile";
import { useCreateVirtualCardStore } from "@/store/createVirtualCardStore";
import { Button } from "@heroui/react";
import React from "react";
import { IoMdAdd, IoMdEye } from "react-icons/io";

const AddCardButton = () => {
  const { openDrawer } = useCreateVirtualCardStore();

  const { profileData } = useProfile();

  const cardData = profileData?.allObjects?.card;

  const updateVCardData = useCreateVirtualCardStore(
    (state) => state.updateData
  );

  const { mutateAsync: mutateCreateVCard, isPending: isCreatingVCard } =
    useCreateVirtualCard();

  const handleCreateVCard = async () => {
    if (cardData?.card_ref_id) {
      updateVCardData({
        cardId: cardData?.card_ref_id,
        ...cardData,
      });
    } else {
      const res = await mutateCreateVCard();
      updateVCardData({
        cardId: res?.data?.card_ref_id || res?.data?.id,
        ...res?.data,
      });
    }
    openDrawer();
  };

  return (
    <>
      <Button
        size="sm"
        variant="bordered"
        radius="full"
        endContent={
          cardData?.card_ref_id ? <IoMdEye size={16} /> : <IoMdAdd size={16} />
        }
        onPress={handleCreateVCard}
        isLoading={isCreatingVCard}
      >
        {cardData?.card_ref_id ? "View Card" : "Add"}
      </Button>
    </>
  );
};

export default AddCardButton;
