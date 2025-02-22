"use client";

import Input from "@/components/shared/ui/Input";
import { Button, Checkbox } from "@heroui/react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <div className="">
          {/* I want to have a background gradiant animated on the login page */}
        </div>
        <div className=" bg-white rounded-lg shadow border w-[30rem]">
          <form className="mt-5 space-y-4 px-12 pt-5 pb-10">
            <div className="flex justify-center">
              <Image
                src={
                  "https://www.paysit.net/static/media/paysit.7d63ac152631fed8fe7d.png"
                }
                alt="paysit logo"
                width={50}
                height={50}
              />
            </div>
            <h2 className="font-semibold text-2xl text-gray-800">
              Sign in to your account
            </h2>
            <div>
              <label htmlFor="" className="font-medium text-sm mb-2">
                Email
              </label>
              <Input
                type="text"
                className="w-full"
                variant="bordered"
                radius="sm"
                size="lg"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="" className="font-medium text-sm">
                  Password
                </label>
                <label
                  htmlFor=""
                  className="text-green-700 text-sm font-medium cursor-pointer"
                >
                  Forgot your Password?
                </label>
              </div>
              <Input
                type="password"
                className="w-full"
                variant="bordered"
                radius="sm"
                size="lg"
              />
            </div>
            <div>
              <Checkbox>Remember me on this device</Checkbox>
            </div>
            <div>
              <Button
                className="w-full bg-green-700 font-medium text-white"
                size="lg"
                radius="sm"
              >
                Sign in
              </Button>
            </div>
          </form>
          <div className="bg-default-100 text-center text-default-500 p-4">
            New to PaysIt?{" "}
            <span className="text-green-700 font-medium cursor-pointer">
              Create account
            </span>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
