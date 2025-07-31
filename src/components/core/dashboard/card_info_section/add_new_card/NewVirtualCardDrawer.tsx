"use client";

import Drawer from "@/components/shared/ui/Drawer";
import React from "react";
import NewVirtualCardView from "./NewVirtualCardView";
import { useCreateVirtualCardStore } from "@/store/createVirtualCardStore";

const NewVirtualCardDrawer = () => {
  const {
    data: { isOpen },
    closeDrawer,
  } = useCreateVirtualCardStore();
  return (
    <>
      <Drawer size="2xl" isOpen={isOpen} onClose={closeDrawer}>
        <NewVirtualCardView />
      </Drawer>
    </>
  );
};

export default NewVirtualCardDrawer;
