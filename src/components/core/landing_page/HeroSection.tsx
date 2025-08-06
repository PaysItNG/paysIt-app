"use client";
import { APP_ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { BiCheckCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/shared/ui/Button";

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
    className={`absolute z-40  hidden  bg-white rounded-lg shadow-xl p-1 lg:p-2 sm:flex items-center gap-2 lg:gap-3 animate-float-delayed ${className}`}
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

const HeroSection = () => {
  const router = useRouter();

  const handleStartHere = () => {
    router.push(APP_ROUTES.SIGNUP);
  };

  return (
    <div className="pt-36 lg:pt-44 pb-20 relative z-10 px-10">
      {/* Floating Notifications */}

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <h2 className="text-6xl lg:text-8xl font-bold text-white uppercas">
              Seamless Subscriptions
            </h2>
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-cyan-500">
              And Faster Payments
            </h2>
          </div>
          <div className="w-full max-w-2xl">
            <hr className="h-[1px] border-green-400 bg-green-300" />
          </div>
          <h3 className="text-gray-200 text-lg">
            Connecting banks and users for secure, automated transactions.
          </h3>
          <div>
            <Button
              size="lg"
              variant="bordered"
              className=" text-white"
              onPress={handleStartHere}
            >
              Start Here
            </Button>
          </div>
        </div>

        <div className="relative hidden md:block overflow-x-cli">
          {
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateY: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              // Hover animations
              whileHover={{
                scale: 1.05,
                rotateY: 15,
                rotateX: 5,
                transition: {
                  rotateX: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                  rotateY: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                },
              }}
              // Add perspective to parent for 3D effect
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              className="relative flex justify-center lg:justify-start md:-mt-[3.5rem] lg:-mt-[5.5rem] lg:-ml-[6rem] items-center h-full"
            >
              <motion.div
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              >
                <HeroNotification
                  avatar="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                  message="Subscription processed successfully"
                  className="top-16 lg:top-24 -left-10 rotate-6 lg:left-0 lg:-ml-32"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{
                  y: -20,
                  rotateX: 10,
                  rotateY: -10,
                  transition: {
                    duration: 0.4,
                    ease: "easeOut",
                  },
                }}
                className="relative"
              >
                <div className="w-[400px] h-[550px] lg:h-[750px]">
                  <Image
                    src={"/assets/images/dashboard_phone_mockup.png"}
                    alt="dashboard phone mockup"
                    fill
                    className="object-contain"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 100, scale: 1 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
                >
                  <HeroNotification
                    avatar="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                    message="Payment successfull"
                    className="right-20 lg:-right-12 bottom-[22%]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          }
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
