import { Image } from "@heroui/react";
import React from "react";

const Section2View = () => {
  return (
    <>
      <div className="bg-primary pattern-1">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-2 gap-8 px-5 md:px-8 lg:px-12 py-14 items-center">
            <div className="">
              <Image
                src="https://img.freepik.com/free-vector/top-up-credit-concept-illustration_114360-7244.jpg?ga=GA1.1.67237897.1738672990&semt=ais_hybrid&w=740"
                alt=""
                className="w-[80%] mx-auto"
              />
            </div>
            <div className="space-y-5">
              <h2 className="font-bold text-4xl text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </h2>
              <p className="lg:text-lg text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
                doloribus eaque modi qui distinctio aperiam a quibusdam eius
                laudantium, nam est reprehenderit! In inventore, ad accusamus
                iusto eos veritatis repellendus?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2View;
