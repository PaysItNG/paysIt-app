"use client";
import { Button } from "@heroui/react";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const AddCardButton = () => {
  return (
    <>
      <Button
        size="sm"
        variant="bordered"
        radius="full"
        endContent={<IoMdAdd size={16} />}
      >
        Add
      </Button>
    </>
  );
};

export default AddCardButton;
