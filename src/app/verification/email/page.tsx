"use client";

import { InputOtp } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import logo from "@/assets/images/paysIt_logo.jpeg";
import Image from "next/image";
import { useActivateAccount } from "@/api/auth/verification";
import { notifier } from "@/lib/utils/notifier";
import { AxiosError } from "axios";
// import { APP_ROUTES } from "@/lib/routes";
import Button from "@/components/shared/ui/Button";

type FormData = {
  otp: string;
};

const EmailVerification = () => {
  const searchParams = useSearchParams();

  // const router = useRouter();

  const emailToVerify = searchParams.get("vl");

  const { mutateAsync: mutateActivateAccount, isPending: isActivating } =
    useActivateAccount();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
    mode: "onBlur",
    criteriaMode: "all",
    shouldUseNativeValidation: false,
  });

  const onSubmit = async (values: FormData) => {
    const payload = {
      email: emailToVerify || "",
      otp: values?.otp,
    };

    try {
      const res = await mutateActivateAccount(payload);

      console.log(res);

      // const resData = res?.data;

      notifier({ message: res?.message || "", type: "success" });
      // router.push(APP_ROUTES.LOGIN); //redirect to login to login again
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      notifier({
        message:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong, please try again",
        type: "error",
      });
    }
  };

  return (
    <>
      <main className="h-screen flex items-center justify-center flex-1 bg-green-100 pattern-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-8 flex items-center justify-center flex-col gap-y-3 m-4 w-full max-w-lg shadow"
        >
          <div>
            <Image src={logo} alt="logo" height={70} width={70} />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-medium text-center">
              Please Check your email
            </h2>
            <p className="text-[0.9rem] text-gray-500 text-center">
              We&apos;ve sent a code to{" "}
              <span className="font-medium text-black">{emailToVerify}</span>
            </p>
          </div>
          <div className="">
            <Controller
              control={control}
              name="otp"
              render={({ field }) => (
                <InputOtp
                  {...field}
                  variant="bordered"
                  errorMessage={errors.otp && errors.otp.message}
                  isInvalid={!!errors.otp}
                  length={6}
                  size="lg"
                  classNames={{
                    segmentWrapper: "gap-x-2 flex justify-center",
                    segment:
                      "border-1.5 shadow-none h-[3rem w-[3rem border-zinc-300 outline-none shadow-none transition",
                    helperWrapper: "text-center",
                  }}
                />
              )}
              rules={{
                required: "OTP is required, please check your email",
                minLength: {
                  value: 6,
                  message: "Please enter a valid OTP",
                },
              }}
            />
          </div>
          <Button
            type="submit"
            radius="sm"
            size="lg"
            className="text-base bg-green-800 text-white w-full"
            isLoading={isActivating}
          >
            Verify
          </Button>
        </form>
      </main>
    </>
  );
};

export default EmailVerification;
