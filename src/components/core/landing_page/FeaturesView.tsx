"use client";

import { CiBank } from "react-icons/ci";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoFlashOutline } from "react-icons/io5";
import { Card } from "@heroui/react";

const FeaturesView = () => {
  const features = [
    {
      icon: <CiBank className="w-8 h-8" />,
      title: "Banking assistant service",
      description:
        "Virtual assistant for seamless account management, transactions, and financial support.",
      color: "text-[#ec8631]",
      colorbg: "bg-[#ec8631]/10",
    },
    {
      icon: <MdOutlineSubscriptions className="w-8 h-8" />,
      title: "Subcription management",
      description:
        "A centralized platform to track, manage, and optimize all your subscriptions in one place.",
      color: "text-green-600",
      colorbg: "bg-green-100/50",
    },
    {
      icon: <IoFlashOutline className="w-8 h-8" />,
      title: "Fast payment processing",
      description:
        "A secure and efficient system for instant transactions and seamless fund transfers.",
      color: "text-[#db560c]",
      colorbg: "bg-[#db560c]/10",
    },
  ];

  return (
    <section className="pb-20 pt-14 bg-[#f1f1f1]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            PaysIt Features, Simplified
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to manage your workforce effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-[90%] mx-auto gap-16 min-h-[400px] place-items-center">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg rounded-3xl border-none shadow-none transition-all duration-300 border-0 min-h-[400px] max-w-[400px] h-full"
            >
              <div className="p-8 flex flex-col gap-y-6 justify-betwee h-full">
                <div
                  className={`${feature.color} group-hover:scale-110 transition-transform duration-300 ${feature.colorbg} p-4 rounded-3xl max-w-max`}
                >
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-2 my-5">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 text-lg">{feature.description}</p>
                </div>
                {/* <Button
                  variant="ghost"
                  className="group-hover:translate-x-2 transition-transform duration-300 mt-auto rounded-3xl p-6 max-w-max"
                >
                  Learn more <BsArrowRight className="ml-2 w-4 h-4" />
                </Button> */}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesView;
