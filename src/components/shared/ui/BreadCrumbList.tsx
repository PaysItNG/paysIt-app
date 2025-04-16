"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import React, { FC } from "react";

type PropType = {
  items: {
    name: string;
  }[];
};

const BreadCrumbList: FC<PropType> = ({ items }) => {
  return (
    <Breadcrumbs>
      {items?.map((item, index) => (
        <BreadcrumbItem key={index + "breadcrumb" + item?.name}>
          {item.name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbList;
