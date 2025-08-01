"use client";

import { CiBank } from "react-icons/ci";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoFlashOutline } from "react-icons/io5";
import clsx from "clsx";
import { motion } from "framer-motion";

const FeaturesView = () => {
  const features = [
    {
      icon: <CiBank className="w-8 h-8" />,
      title: "Banking assistant service",
      description:
        "Virtual assistant for seamless account management, transactions, and financial support.",
      color: "text-[#ec8631]",
      colorbg: "bg-[#ec8631]/20",
      cardBg: "bg-[#ec8631]/40",
    },
    {
      icon: <MdOutlineSubscriptions className="w-8 h-8" />,
      title: "Subcription management",
      description:
        "A centralized platform to track, manage, and optimize all your subscriptions in one place.",
      color: "text-primary",
      colorbg: "bg-green-100/40",
      cardBg: "bg-primary/30",
    },
    {
      icon: <IoFlashOutline className="w-8 h-8" />,
      title: "Fast payment processing",
      description:
        "A secure and efficient system for instant transactions and seamless fund transfers.",
      color: "text-[#db560c]",
      colorbg: "bg-[#db560c]/20",
      cardBg: "bg-[#db560c]/40",
    },
  ];

  return (
    <>
      <section className="pb-10 bg-[#f1f1f1]">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:px-0">
          <div className="">
            <div className="text-center mb-10">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold mb-4"
              >
                PaysIt Features, Simplified
              </motion.h2>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-lg text-gray-600"
              >
                Everything you need to manage your finances effectively
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-10 min-h-[350px] relative">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={clsx(
                    "group hover:shadow-lg rounded-3xl border-none shadow-none transition-all duration-300 border-0 min-h-[300px] max-w-[400px] h-full relative",
                    feature.cardBg
                  )}
                >
                  <div
                    className={clsx(
                      "absolute top-0 -left-[60px] h-full w-20 space-y-10 py-10",
                      index === 0 && "hidden"
                    )}
                  >
                    <div className="h-[12px] w-full rounded-full bg-white"></div>
                    <div className="h-[12px] w-full rounded-full bg-white"></div>
                    <div className="h-[12px] w-full rounded-full bg-white"></div>
                    <div className="h-[12px] w-full rounded-full bg-white"></div>
                    <div className="h-[12px] w-full rounded-full bg-white"></div>
                    <div className="h-[12px] w-full rounded-full bg-white"></div>
                  </div>
                  <div className="p-10 flex flex-col gap-y-6 justify-betwee h-full">
                    <div
                      className={clsx(
                        `${feature.color} group-hover:scale-110 transition-transform duration-300 ${feature.colorbg} p-4 rounded-3xl max-w-max`
                      )}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex flex-col gap-2 mb-5">
                      <h3 className="text-xl font-semibold dark:text-black">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesView;
