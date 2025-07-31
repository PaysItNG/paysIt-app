"use client";
import { useCreateVirtualCardStore } from "@/store/createVirtualCardStore";
import { Button } from "@heroui/react";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const AddCardButton = () => {
  const { openDrawer } = useCreateVirtualCardStore();
  return (
    <>
      <Button
        size="sm"
        variant="bordered"
        radius="full"
        endContent={<IoMdAdd size={16} />}
        onPress={() => openDrawer()}
      >
        Add
      </Button>
    </>
  );
};

export default AddCardButton;
