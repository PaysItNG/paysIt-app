import Link from "next/link";
import React, { ReactNode } from "react";
import { FaFileAlt, FaLock } from "react-icons/fa";
import { HiMiniDocumentCheck } from "react-icons/hi2";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen md:grid md:h-screen md:min-h-0 md:grid-cols-12 md:overflow-hidden">
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="pattern-4 flex h-full flex-col gap-7 justify-between overflow-hidden rounded-r-md md:rounded-r-2xl bg-green-900 px-8 py-12 text-white md:px-16 md:py-20">
            <div className="space-y-7">
              <Link
                href={"/"}
                className="font-extrabold text-white text-xl md:text-[2.7rem]"
              >
                PAYSIT
              </Link>
              <p className="text-xl !leading-[1.2] md:text-[2.7rem] font-extrabold">
                Seamless Subscriptions and Faster Payments
              </p>
              <p className="text-base tracking-wide">
                Connecting banks and users for secure, automated transactions.
              </p>
            </div>
            <div className="border-1 border-green-800 rounded-small flex justify-evenly p-6">
              {[
                { name: "Efficiency", icon: FaFileAlt },
                { name: "Confidentiality", icon: FaLock },
                { name: "Integrity", icon: HiMiniDocumentCheck },
                { name: "Availability", icon: FaLock },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center flex-col gap-y-2 justify-center"
                >
                  <item.icon />
                  <p>{item?.name}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="font-medium text-[0.9rem] tracking-wide">
                Need help? Our support team is available 24/7 to assist you with
                any inquiries.
              </p>
              <p className="font-medium text-[0.9rem] tracking-wide">
                Address: Makurdi, Benue state,Nigeria.
              </p>
              <p className="font-medium text-[0.9rem] tracking-wide">
                paysit.info@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto text-xl md:col-span-5 order-1 md:order-2">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
