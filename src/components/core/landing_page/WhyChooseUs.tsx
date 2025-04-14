"use client";
import { motion } from "framer-motion";
import { IoIosCloudDone } from "react-icons/io";
import { GiArtificialIntelligence } from "react-icons/gi";
import { FaUserCheck } from "react-icons/fa";
import { RiLinksLine } from "react-icons/ri";
import { Image } from "@heroui/react";
import { ElementType } from "react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: IoIosCloudDone,
      label: "Save Time and Money",
      desc: "Automated payment tracking helps you identify unused subscriptions and avoid late fees.",
    },
    {
      icon: GiArtificialIntelligence,
      label: "AI-Powered Case Routing",
      desc: "Leverage artificial intelligence to assign cases intelligently based on priority and complexity.",
    },
    {
      icon: FaUserCheck,
      label: "User-Friendly Interface",
      desc: "Intuitive and easy-to-use dashboard for quick adoption and minimal training requirements.",
    },
    {
      icon: RiLinksLine,
      label: "Seamless Integrations",
      desc: "Connect with existing software like CRM, ERP, and email platforms for a unified workflow.",
    },
  ];

  return (
    <main>
      <div className="bg-[#F5F7FA] w-full">
        <div className="mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-3 gap-8 px-5 md:px-8 lg:px-12 py-14">
          <div className="relative h-full flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-red/50 via-black/30 to-slate-500 rounded-lg" />
            <Image
              src="https://img.freepik.com/premium-photo/marketing-research-agency-group-leader-pointing-out-business-statistics-data-tablet-african-american-business-man-informing-office-colleague-about-necessity-budget-cutting_482257-41515.jpg?ga=GA1.1.67237897.1738672990&semt=ais_hybrid"
              alt="Team collaborating on case management"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>
          <div className="lg:col-span-2">
            <div className="">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-3xl lg:text-4xl font-bold text-center lg:text-left"
              >
                Why Choose PaysIt
              </motion.h2>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-lg text-gray-600 mt-2"
              >
                Manage your banking, subscriptions, and payments in one secure
                platform. No more juggling multiple apps or websites.
              </motion.p>
            </div>

            {/* Centered Grid */}
            <div className="flex justify-center mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {reasons?.map((item, index) => (
                  <ReasonCard
                    key={index + "____reasons_to_choose_us"}
                    icon={item?.icon}
                    title={item?.label}
                    description={item.desc}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

type ReasonCardType = {
  icon: ElementType;
  title: string;
  description: string;
};

const ReasonCard: React.FC<ReasonCardType> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="g-slate-700/50 p-6 rounded- shado-lg h-full"
    >
      <div className="flex justify-cente mb-4">
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-cente">{title}</h3>
      {description && <p className="text-gray-500 text-cente">{description}</p>}
    </motion.div>
  );
};

export default WhyChooseUs;
