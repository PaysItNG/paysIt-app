"use client";

import React from "react";
import { FaUserFriends } from "react-icons/fa";
import HeaderCard from "./HeaderCard";

const StatisticCard = () => {
  const items = [
    { label: "Total User", icon: FaUserFriends, value: 0 },
    { label: "Users Under Approval", icon: FaUserFriends, value: 9 },
  ];

  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items?.map((item, index) => (
          <HeaderCard
            key={index + "_____statistic_cards"}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </main>
    </>
  );
};

export default StatisticCard;
