"use client";
import Button from "@/components/shared/ui/Button";
import React from "react";

const KYCView = () => {
  return (
    <>
      <main className="container my-auto">
        <div className="space-y-6 flex flex-col items-center px-6">
          <div className="h-52 w-52 rounded-full bg-default-200"></div>
          <Button
            type="submit"
            radius="sm"
            size="lg"
            className="mt-5 text-base bg-green-800 text-white w-full"
          >
            Continue
          </Button>
        </div>
      </main>
    </>
  );
};

export default KYCView;
