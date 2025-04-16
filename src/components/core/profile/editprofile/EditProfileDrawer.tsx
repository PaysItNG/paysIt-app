"use client";
import Drawer from "@/components/shared/ui/Drawer";
import { useEditProfile } from "@/store/editProfile";
import React, { createElement } from "react";
import EditPersonalInfo from "./EditPersonalInfo";
import EditAddressInfo from "./EditAddressInfo";

const EditProfileDrawer = () => {
  const { data, closeDrawer } = useEditProfile();

  const views = {
    PERSONAL_INFO: EditPersonalInfo,
    ADDRESS_INFO: EditAddressInfo,
  };

  const currentView = data.view as keyof typeof views;

  return (
    <>
      <Drawer
        isOpen={data.isOpen}
        onClose={closeDrawer}
        // size="2xl"
        className="p-2"
      >
        {currentView && createElement(views[currentView])}
      </Drawer>
    </>
  );
};

export default EditProfileDrawer;
