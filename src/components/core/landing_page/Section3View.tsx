import Image from "next/image";
import React from "react";

const Section3View = () => {
  const items = [
    {
      // img: img1,
      img: "https://img.freepik.com/free-photo/warehouse-worker-hand-pointing-inventory-statistics-tablet_482257-77702.jpg?ga=GA1.1.67237897.1738672990&semt=ais_hybrid&w=740",
      desc: "Smart Subscription Management: Track and control all your recurring payments",
    },
    {
      // img: img2,
      img: "https://img.freepik.com/free-photo/medium-shot-man-restaurant-with-smartphone_23-2150384768.jpg?ga=GA1.1.67237897.1738672990&semt=ais_hybrid&w=740",
      desc: "Send Money Instantly: Transfer funds to anyone, anywhere with just a few taps",
    },
    {
      // img: img3,
      img: "https://img.freepik.com/premium-photo/african-american-man-shopping-online-using-laptop-credit-card-home_13339-378424.jpg?ga=GA1.1.67237897.1738672990&semt=ais_hybrid&w=740",
      desc: "Secure Bill Payments: Never miss a due date with automated reminders",
    },
  ];

  return (
    <>
      <main className="bg-white pattern-2">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8 lg:w-[80%]">
          <div className="text-center mb-16 mx-auto lg:w-[80%]">
            <h2 className="text-4xl font-bold mb-4">
              Simplify Your Financial Life
            </h2>
            <p className="text-lg text-gray-600">
              PaySit helps you manage all your payments in one place. Pay bills,
              manage subscriptions, send money to friends and family, and keep
              track of your finances with ease.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {items?.map((item, index) => (
              <div key={index + "______"} className="relative w-[300px]">
                <Image
                  src={item.img}
                  alt={"img" + index}
                  width={300}
                  height={300}
                  className="rounded-lg shadow"
                />

                <div className="absolute -bottom-10 font-medium text-[#717171] shadow rounded-lg bg-[#F5F7FA] px-4 py-3 text-[0.91rem] text-center mx-6 min-h-32">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Section3View;
