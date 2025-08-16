"use client";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { notifier } from "@/lib/utils/notifier";
import { useGoogleAuthToken, useLoginUser } from "@/api/auth/login";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";
import Button from "@/components/shared/ui/Button";
import useAuthUser from "@/hooks/useAuthUser";
import GoogleAuthProviderButton from "./GoogleAuthProviderButton";
import { useSession } from "next-auth/react";
import { catchErrFunc } from "@/lib/utils/catchErrFunc";
import { UserType } from "@/lib/utils/typeConfig";
import { useSingleEffect } from "react-haiku";
import Input from "@/components/shared/ui/Input";
import { Checkbox } from "@heroui/react";

const Login = () => {
  const router = useRouter();

  const { mutateAsync: loginUser, isPending: isLoginLoading } = useLoginUser();

  const [pswVisible, setPswVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { setAuthUser, removeAuthUser } = useAuthUser();

  const { data: session, status } = useSession();

  const { mutateAsync: googleAuthToken } = useGoogleAuthToken();

  // const { logoutUser } = useProfile();

  //=======remove user from local storage if gotten here and token is still in save
  useSingleEffect(() => {
    removeAuthUser();
  });

  //==================ends here===================

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

      const resData = res?.data;
      const tokens = res?.token as
        | { access: string | null; refresh: string | null }
        | undefined;

      if (res?.logged_in && tokens) {
        afterLoginSuccessfull({
          userData: resData as UserType,
          tokens: tokens,
        });
        // setAuthUser({
        //   data: resData,
        //   token: tokens,
        // });
        // if (resData?.role === "user") {
        //   router.push(APP_ROUTES.DASHBOARD);
        // } else {
        //   router.push(APP_ROUTES.ADMIN_DASHBOARD);
        // }
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

  const afterLoginSuccessfull = useCallback(
    ({
      userData,
      tokens,
    }: {
      userData: UserType;
      tokens: { access: string | null; refresh: string | null };
    }) => {
      setAuthUser({
        data: userData,
        token: tokens,
      });
      if (userData?.role === "user") {
        router.push(APP_ROUTES.DASHBOARD);
      } else {
        router.push(APP_ROUTES.ADMIN_DASHBOARD);
      }
    },
    [router, setAuthUser]
  );

  useEffect(() => {
    const sendTokentoBackend = async () => {
      setIsLoading(true);
      try {
        const res = await googleAuthToken({
          access_token: session?.accessToken as string,
        });
        afterLoginSuccessfull({
          userData: res?.user as UserType,
          tokens: res?.token as {
            access: string | null;
            refresh: string | null;
          },
        });
      } catch (err) {
        catchErrFunc(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (status === "authenticated") {
      // ✅ You can now send this to your backend
      sendTokentoBackend();
    }
  }, [status, session, googleAuthToken, afterLoginSuccessfull]);

  return (
    <div className="container my-auto">
      <div className="py-20">
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
          </form>
          <div className="text-center">
            <div className="text-default-500 text-base mt-5">
              New to PaysIt?{" "}
              <Link
                href={"/auth/signup"}
                className="text-green-700 font-medium cursor-pointer"
              >
                Create account
              </Link>
            </div>
            <div className="flex gap-1 justify-center my-3 items-center">
              <div className="border-[0.5px] border-gray-400 w-full"></div>
              <span>or</span>
              <div className="border-[0.5px] border-gray-400 w-full"></div>
            </div>
            <div>
              <GoogleAuthProviderButton
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
