"use client";

import { CiBank } from "react-icons/ci";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoFlashOutline } from "react-icons/io5";
import { Card } from "@heroui/react";
import clsx from "clsx";

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
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f1f1f1"
          fill-opacity="1"
          d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <section className="pb-20 pt-14 bg-[#f1f1f1] pattern-6">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">
                PaysIt Features, Simplified
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to manage your finances effectively
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-16 min-h-[400px] relative">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={clsx(
                    "group hover:shadow-lg rounded-3xl border-none shadow-none transition-all duration-300 border-0 min-h-[400px] max-w-[400px] h-full"
                  )}
                >
                  <div className="p-8 flex flex-col gap-y-6 justify-betwee h-full">
                    <div
                      className={clsx(
                        `${feature.color} group-hover:scale-110 transition-transform duration-300 ${feature.colorbg} p-4 rounded-3xl max-w-max`
                      )}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex flex-col gap-2 my-5">
                      <h3 className="text-xl font-semibold dark:text-black">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesView;
