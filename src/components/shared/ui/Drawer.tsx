"use client";
import { ReactNode, useEffect } from "react";
import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Drawer as HeroUiDrawer,
} from "@heroui/react";

interface DrawerTypes {
  isOpen: boolean;
  title?: string;
  header?: ReactNode;
  padding?: boolean;
  round?: boolean;
  onClose: () => void;
  children?: ReactNode;
  size?:
    | "lg"
    | "xs"
    | "sm"
    | "md"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  [key: string]: unknown;
}

const Drawer: React.FC<DrawerTypes> = ({
  isOpen,
  //   title,
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
