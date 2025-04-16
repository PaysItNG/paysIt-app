"use client";
import { useUpdateProfile } from "@/api/profile";
import Button from "@/components/shared/ui/Button";
import Input from "@/components/shared/ui/Input";
import UploadImage from "@/components/shared/ui/UploadImage";
import { useProfile } from "@/hooks/use-profile";
import { filePrefix } from "@/lib/utils/filePrefix";
import { notifier } from "@/lib/utils/notifier";
import { useEditProfile } from "@/store/editProfile";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

interface FormData {
  file: File | null;
  image: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  bvn?: string | number | null;
}

const EditPersonalInfo = () => {
  const { closeDrawer } = useEditProfile();

  const { profileData } = useProfile();

  const { mutateAsync: mutateUpdateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      file: null,
      image: "",
    },
  });

  useEffect(() => {
    if (profileData) {
      reset({
        first_name: profileData?.user?.first_name || "",
        last_name: profileData?.user?.last_name || "",
        phone_number: profileData?.user?.phone_number || "",
        image: profileData.profile_picture
          ? filePrefix + profileData.profile_picture
          : "",
        file: null,
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (values: FieldValues) => {
    const { email, first_name, last_name, phone, file, bvn } = values;
    const formData = new FormData();

    formData.append("email", email);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("phone", phone);
    formData.append("phone", phone);
    formData.append("bvn", bvn);
    formData.append("profile_picture", file);

    try {
      const res = await mutateUpdateProfile(formData);
      //   reloadUser();
      notifier({ type: "success", message: res?.message || "" });
      reset({});
      closeDrawer();
    } catch (err) {
      const errMsg =
        (err as AxiosError<{ message: string }>)?.response?.data?.message ||
        (err instanceof Error ? err.message : "An unknown error occurred");
      notifier({ message: errMsg, type: "error" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Edit Personal Information</h1>
          <p className="mt-1 text-[0.9rem]">
            Update your details to keep your profile up-to-date.
          </p>
        </div>
        <div className="grid gap-7 md:grid-cols-1">
          <div className="flex justify-center items-center">
            <UploadImage
              getValues={getValues}
              setValue={setValue}
              isProfile={true}
            />
          </div>
          <Controller
            name="first_name"
            control={control}
            rules={{
              required: "First Name is required",
            }}
            render={({ field }) => (
              <Input
                label="First Name"
                variant="bordered"
                autoComplete="true"
                {...field}
                errorMessage={errors?.first_name?.message}
                isInvalid={!!errors?.first_name?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isUpdatingProfile}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            rules={{
              required: "Last Name is required",
            }}
            render={({ field }) => (
              <Input
                label="Last Name"
                variant="bordered"
                autoComplete="true"
                {...field}
                errorMessage={errors?.last_name?.message}
                isInvalid={!!errors?.last_name?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isUpdatingProfile}
              />
            )}
          />

          <Controller
            name="phone_number"
            control={control}
            rules={{
              required: "Phone number is required",
            }}
            render={({ field }) => (
              <Input
                label="Phone Number"
                variant="bordered"
                autoComplete="true"
                {...field}
                errorMessage={errors?.phone_number?.message}
                isInvalid={!!errors?.phone_number?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isUpdatingProfile}
              />
            )}
          />
          <Controller
            name="bvn"
            control={control}
            render={({ field }) => (
              <Input
                label="BVN"
                variant="bordered"
                {...field}
                errorMessage={errors?.bvn?.message}
                isInvalid={!!errors?.bvn?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isUpdatingProfile}
              />
            )}
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="bordered" onPress={closeDrawer}>
            Close
          </Button>
          <Button color="primary" type="submit" isLoading={isUpdatingProfile}>
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditPersonalInfo;
