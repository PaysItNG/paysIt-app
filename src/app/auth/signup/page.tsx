"use client";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { notifier } from "@/lib/utils/notifier";
import { AxiosError } from "axios";
import Input from "@/components/shared/ui/Input";
import { useSignupUser } from "@/api/auth/signup";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";
import Button from "@/components/shared/ui/Button";
// import useAuthUser from "@/hooks/useAuthUser";

const Signup = () => {
  const [pswVisible, setPswVisible] = useState(false);
  const [confirmPswVisible, setConfirmPswVisible] = useState(false);

  // const { setAuthUser } = useAuthUser();

  const router = useRouter();

  const { mutateAsync: signupUser, isPending: isSignupLoading } =
    useSignupUser();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      remember: false,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      const payload = {
        first_name: values?.first_name,
        last_name: values?.last_name,
        email: values?.email,
        password: values?.password,
      };
      const res = await signupUser(payload);

      const resData = res?.data;

      notifier({ message: res?.message, type: "success" });
      router.push(`${APP_ROUTES.EMAIL_VERIFICATION}?vl=${resData?.email}`);
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
    <div className="container my-auto">
      <div className="container py-20">
        <div className="w-full max-w-md mx-auto rounded-xl">
          <div className="mb-10">
            <h1 className="text-4xl font-semibold">Signup</h1>
            <p className="mt-3 text-xl">
              Enter your Information below to create your account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                label="First Name"
                variant="bordered"
                autoComplete="true"
                {...register("first_name", {
                  required: "First Name is required",
                })}
                errorMessage={errors?.first_name?.message}
                isInvalid={!!errors?.first_name?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isSignupLoading}
              />
              <Input
                label="Last Name"
                variant="bordered"
                autoComplete="true"
                {...register("last_name", {
                  required: "Last Name is required",
                })}
                errorMessage={errors?.last_name?.message}
                isInvalid={!!errors?.last_name?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isSignupLoading}
              />
              <Input
                label="Email"
                variant="bordered"
                autoComplete="true"
                {...register("email", {
                  required: "email address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                    message: "email address is invalid",
                  },
                })}
                errorMessage={errors?.email?.message}
                isInvalid={!!errors?.email?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isSignupLoading}
              />
              <Input
                type={pswVisible ? "text" : "password"}
                className="w-full"
                variant="bordered"
                label="Password"
                errorMessage={errors?.password?.message}
                isInvalid={!!errors?.password?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                endContent={
                  <Button
                    isIconOnly
                    onPress={() => setPswVisible(!pswVisible)}
                    size="sm"
                    className="bg-transparent"
                    disableRipple={true}
                  >
                    {pswVisible ? (
                      <IoEye size={20} className="text-default-400" />
                    ) : (
                      <IoEyeOff size={20} className="text-default-400" />
                    )}
                  </Button>
                }
                {...register("password", {
                  required: "Password is required",
                })}
                isDisabled={isSignupLoading}
              />
              <Input
                type={confirmPswVisible ? "text" : "password"}
                className="w-full"
                variant="bordered"
                label="Confirm Password"
                errorMessage={errors?.confirm_password?.message}
                isInvalid={!!errors?.confirm_password?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                endContent={
                  <Button
                    isIconOnly
                    onPress={() => setConfirmPswVisible(!confirmPswVisible)}
                    size="sm"
                    className="bg-transparent"
                    disableRipple={true}
                  >
                    {confirmPswVisible ? (
                      <IoEye size={20} className="text-default-400" />
                    ) : (
                      <IoEyeOff size={20} className="text-default-400" />
                    )}
                  </Button>
                }
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) => {
                    return (
                      value === watch("password") ||
                      "Confirm password do not match with password"
                    );
                  },
                })}
                isDisabled={isSignupLoading}
              />
            </div>

            <Button
              type="submit"
              radius="sm"
              size="lg"
              className="mt-5 text-base bg-green-800 text-white w-full"
              isLoading={isSignupLoading}
            >
              Create Account
            </Button>
            <div className="text-default-500 text-base mt-5">
              Already have account on PaysIt?{" "}
              <Link
                href={"/auth/login"}
                className="text-green-700 font-medium cursor-pointer"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
