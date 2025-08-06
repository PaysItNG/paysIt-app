import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Section2View = () => {
  return (
    <>
      <div className="bg-primary pattern-1 relative min-h-[600px]">
        <div className="h-10 w-10 bg-white/5 absolute left-10 top-24 rounded-full"></div>
        <div className="h-16 w-16 bg-white/5 absolute left-32 bottom-24 rounded-full"></div>
        <div className="h-20 w-20 bg-white/15 absolute left-1/3 top-8 rounded-full"></div>

        <div className="h-10 w-10 bg-white/10 absolute right-10 md:right-1/2 top-1/2 rounded-full"></div>
        <div className="h-14 w-14 bg-white/15 absolute right-1/4 top-24 rounded-full"></div>
        <div className="h-32 w-32 bg-white/20 absolute right-[55%] bottom-7 md:bottom-[20%] rounded-full"></div>

        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 md:px-10 lg:px-0 py-14 items-center">
            <div className="order-2 lg:order-1 flex items-center justify-center mt-6 lg:mt-0">
              <div className="relative">
                <div className=" mr-20 w-72 md:w-96 h-72 md:h-96 shadow rounded-3xl rotate-[8deg] bg-white p-2">
                  <div className="bg-[url(https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQTFRuQGRiCJPTSLh0a6vov364IJJkQqiXXc08-np5mm0LflWcE)] bg-no-repeat bg-cover h-full rounded-2xl bg-white"></div>
                </div>
                <div className="-mt-[16rem] ml-32 w-72 md:w-96 h-72 md:h-96 -rotate-12 shadow rounded-3xl bg-primary p-2">
                  <Image
                    src="https://img.freepik.com/free-vector/top-up-credit-concept-illustration_114360-7244.jpg?ga=GA1.1.67237897.1738672990&semt=ais_hybrid&w=740"
                    height={320}
                    width={320}
                    alt="payment-mockup"
                    className="w-[100%] mx-auto rounded-2xl"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-5">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-bold text-4xl md:text-5xl text-white"
              >
                Unlock the freedom that comes with smart money management
              </motion.h2>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:text-lg text-white"
              >
                From seamless payments to goal achievement, our platform puts
                you in control of your financial journey. Celebrate the wins,
                big and small, as you build toward lasting financial success.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2View;
