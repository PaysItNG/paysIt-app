"use client";
import { Button } from "@heroui/react";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const AddNewPayment = () => {
  return (
    <>
      <Button size="sm" variant="bordered" endContent={<IoMdAdd size={16} />}>
        Add
      </Button>
    </>
  );
};

export default AddNewPayment;
