"use client";
import { ComponentProps, ReactNode, useEffect } from "react";
import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Drawer as HeroUiDrawer,
} from "@heroui/react";

type HeroDrawerProps = ComponentProps<typeof HeroUiDrawer> & {
  header?: ReactNode;
};

const Drawer: React.FC<HeroDrawerProps> = ({
  isOpen,
  header,
  onClose,
  children,
  size = "lg",
  ...rest
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflowY = "initial";
  }, [isOpen]);

  return (
    <>
      <HeroUiDrawer isOpen={isOpen} onClose={onClose} size={size} {...rest}>
        <DrawerContent>
          <DrawerHeader>{header}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </HeroUiDrawer>
    </>
  );
};

export default Drawer;
