"use client";
import { Checkbox } from "@heroui/react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { notifier } from "@/lib/utils/notifier";
import { useLoginUser } from "@/api/auth/login";
import { AxiosError } from "axios";
import Input from "@/components/shared/ui/Input";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";
import Button from "@/components/shared/ui/Button";
// import useAuthUser from "@/hooks/useAuthUser";

const Login = () => {
  const router = useRouter();

  const { mutateAsync: loginUser, isPending: isLoginLoading } = useLoginUser();

  const [pswVisible, setPswVisible] = useState(false);

  // const { setAuthUser } = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      remember: false,
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      const payload = {
        email: values?.email,
        password: values?.password,
      };
      const res = await loginUser(payload);
      console.log(res);

      const resData = res?.data;

      if (res?.logged_in) {
        console.log(resData);
        // setAuthUser(res?.data?.data);
        router.push(APP_ROUTES.DASHBOARD);
      } else if (
        res?.message === "This Account is not Activated, Check your mail"
      ) {
        router.push(`${APP_ROUTES.EMAIL_VERIFICATION}?vl=${payload?.email}`);
      }

      notifier({
        message: res?.message || "",
        type: res?.logged_in ? "success" : "error",
      });
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
            <h1 className="text-4xl font-semibold">Login</h1>
            <p className="mt-3 text-xl">
              Enter your credentials below to sign in to your account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
                  inputWrapper: "px-4",
                }}
                isDisabled={isLoginLoading}
              />
              <Input
                type={pswVisible ? "text" : "password"}
                className="w-full"
                variant="bordered"
                label="Password"
                errorMessage={errors?.password?.message}
                isInvalid={!!errors?.password?.message}
                classNames={{
                  inputWrapper: "px-4",
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
                isDisabled={isLoginLoading}
              />
            </div>
            <div className="flex items-center justify-between mt-6">
              <Controller
                name="remember"
                control={control}
                disabled={isLoginLoading}
                render={({ field }) => (
                  <Checkbox
                    isDisabled={field.disabled}
                    checked={field.value}
                    onChange={field.onChange}
                    className="text-[0.95rem]"
                  >
                    Remember me
                  </Checkbox>
                )}
              ></Controller>
              <Link href="" className="opacity-80 text-[0.95rem]">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              radius="sm"
              size="lg"
              className="mt-5 text-base bg-green-800 text-white w-full"
              isLoading={isLoginLoading}
            >
              Login
            </Button>
            <div className="text-default-500 text-base mt-5">
              New to PaysIt?{" "}
              <Link
                href={"/auth/signup"}
                className="text-green-700 font-medium cursor-pointer"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
