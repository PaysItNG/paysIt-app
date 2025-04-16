import React, { FC } from "react";
import Title from "./ui/Title";
import BreadCrumbList from "./ui/BreadCrumbList";

interface PageHeaderPropType {
  title: string;
  breadCrumbItems?: {
    name: string;
  }[];
}

const PageHeader: FC<PageHeaderPropType> = ({ title, breadCrumbItems }) => {
  return (
    <>
      <Title
        title={title}
        sub={
          breadCrumbItems?.length && <BreadCrumbList items={breadCrumbItems} />
        }
        classNames={{
          title: "font-semibold",
          sub: "text-sm tracking-wider text-gray-600",
        }}
      />
    </>
  );
};

export default PageHeader;
