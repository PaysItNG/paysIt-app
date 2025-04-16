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

type FormType = {
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  utility_bill?: string;
  file?: string;
  image?: string;
};

const EditAddressInfo = () => {
  const { closeDrawer } = useEditProfile();
  const { profileData } = useProfile();

  const { mutateAsync: mutateUpdateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();

  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      country: "",
      state: "",
      city: "",
      address: "",
      utility_bill: "",
      file: "",
      image: "",
    },
  });

  useEffect(() => {
    if (profileData) {
      reset({
        country: profileData.country || "",
        state: profileData.state || "",
        city: profileData.city || "",
        address: profileData.address || "",
        utility_bill: profileData.utility_bill || "",
        file: "",
        image: profileData.utility_bill
          ? filePrefix + profileData.utility_bill
          : "",
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (values: FieldValues) => {
    const { country, state, city, address, file } = values;
    const formData = new FormData();

    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("address", address);
    if (file) {
      formData.append("utility_bill", file);
    }

    try {
      const res = await mutateUpdateProfile(formData);
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
          <h1 className="text-2xl font-semibold">Edit Address</h1>
          <p className="mt-1 text-[0.9rem]">
            Update your details to keep your profile up-to-date.
          </p>
        </div>
        <div className="grid gap-7 md:grid-cols-1">
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                label="City"
                variant="bordered"
                autoComplete="true"
                {...field}
                errorMessage={errors?.city?.message}
                isInvalid={!!errors?.city?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isUpdatingProfile}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input
                label="State"
                variant="bordered"
                autoComplete="true"
                {...field}
                errorMessage={errors?.state?.message}
                isInvalid={!!errors?.state?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isUpdatingProfile}
              />
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Input
                label="Country"
                variant="bordered"
                autoComplete="true"
                {...field}
                errorMessage={errors?.country?.message}
                isInvalid={!!errors?.country?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isUpdatingProfile}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                label="Address"
                variant="bordered"
                autoComplete="true"
                {...field}
                errorMessage={errors?.address?.message}
                isInvalid={!!errors?.address?.message}
                classNames={{
                  inputWrapper: "px-4 shadow-none border-1",
                }}
                isDisabled={isUpdatingProfile}
              />
            )}
          />

          <UploadImage
            getValues={getValues}
            setValue={setValue}
            label="Utility Bill"
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="bordered"
            onPress={closeDrawer}
            isDisabled={isUpdatingProfile}
          >
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

export default EditAddressInfo;
