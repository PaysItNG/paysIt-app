"use client";

import { BiCheckCircle } from "react-icons/bi";
import Image from "next/image";
import { Button, Progress } from "@heroui/react";

type HeroNotificationPropType = {
  avatar: string;
  message: string;
  className: unknown;
};

const HeroNotification = ({
  avatar,
  message,
  className,
}: HeroNotificationPropType) => (
  <div
    //   absolute -left-16 bottom-1/4 bg-white p-4 rounded-xl shadow-lg animate-float-delayed
    className={`absolute z-40  hidden  bg-white rounded-lg shadow-xl p-3 sm:flex items-center gap-3 animate-float-delayed ${className}`}
  >
    <Image
      src={avatar}
      alt="User avatar"
      width={40}
      height={50}
      className="w-8 h-8 rounded-full"
    />
    <span className="text-sm text-gray-700">{message}</span>
    <BiCheckCircle className="w-4 h-4 text-green-500" />
  </div>
);

const HeroSection = () => (
  <section className="pt-32 pb-20 px-4 overflow-hidden relative bg-white pattern-2">
    <div className="absolute inset-0 top-72 bg-gradient-to-b from-blue-50 to-red-500 -z-10"></div>

    {/* Floating Notifications */}
    <HeroNotification
      avatar="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
      message="Subscription processed successfully"
      className="left-20 md:top-72 top-0"
    />
    <HeroNotification
      avatar="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
      message="Payment successfull"
      className="right-20 md:top-60 top-0"
    />

    <div className="container mx-auto max-w-7xl relative">
      {/* Progress Circle */}
      <div className="absolute -right-20 top-0 w-40 h-40 bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg animate-float hidden md:block">
        <div className="w-full h-full relative ">
          <Progress
            classNames={{
              base: "base-classes",
              labelWrapper: "labelWrapper-classes",
              label: "label-classes",
              value: "value-classes",
              track: "track-classes",
              indicator: "bg-btnColor/60",
            }}
            value={37}
            size="lg"
            className="rounded-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">37%</div>
            <div className="text-xs text-gray-500">Completion</div>
          </div>
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto mb-16">
        {/* <Badge className="mb-6 px-6 py-2 text-sm" variant="flat">
            Trusted by 10,000+ companies worldwide
          </Badge> */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-btnColor to-gray-900">
          Seamless Subscriptions and Faster Payments
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Connecting banks and users for secure, automated transactions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" variant="bordered" className="max-w-40">
            Start Here
          </Button>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="relative">
        {/* <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
              <CardBody>
                      <img src={HeroImage} alt="" />
              </CardBody>
          </Card> */}

        {/* Floating Elements */}
        {/* <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 animate-float">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <div className="absolute -right-8 top-1/3 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 animate-float-delayed">
            <CgLock className="w-6 h-6 text-green-500" />
          </div> */}
      </div>
    </div>
  </section>
);

export default HeroSection;
