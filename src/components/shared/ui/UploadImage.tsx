"use client";
import { Button, ConfigProvider, message, Upload } from "antd";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { IoMdCheckmark, IoMdCloudUpload } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import NextImage from "next/image";
import { Image } from "@heroui/react";
import clsx from "clsx";

const { Dragger } = Upload;

interface FormData {
  file: File | null; // Add the 'file' property
  image: string; // Add the 'image' property
  selfie?: string | null;
  [key: string]: unknown;
}

interface PropType {
  setValue: UseFormSetValue<FormData>; // Correctly type setValue
  getValues: UseFormGetValues<FormData>;
  label?: string;
  classNames: {
    base?: string | string[];
  };
  isProfile?: boolean;
}

const UploadImage: React.FC<PropType> = ({
  setValue,
  getValues,
  label,
  isProfile,
}) => {
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState("idle");

  // const { mutateAsync: mutateUploadImage, isLoading: isUploading } =
  //   useUploadImage();

  const isUploading = false;

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return false;
    }

    return true;
  };

  const handleRemoveFile = () => {
    setFilePreviewUrl(null);
    setValue("file", null);
    setValue("image", "");
    setUploadStatus("idle");
  };

  const handleChooseFile = (file: File) => {
    if (!beforeUpload(file)) return false;

    setValue("file", file);
    const blobUrl: string = URL.createObjectURL(file);
    setFilePreviewUrl(blobUrl);
    setUploadStatus("idle");
    return false; // Prevent default upload behavior
  };

  const handleUploadFile = async () => {
    const file = getValues()?.file;
    if (!file) return;

    setUploadStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("image", file);
      //   const res = await mutateUploadImage(formData);
      //   const uploaded_url = res?.data?.data;
      //   setValue("image", uploaded_url);
      //   setValue("file", null);
      //   setUploadStatus("done");
      //   return uploaded_url;
    } catch (err) {
      console.log(err);
      //   setUploadStatus("idle");
      //   const errMsg = err?.response?.data?.message || err?.message;
      //   message.error(errMsg);
      //   return;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {filePreviewUrl ?? getValues("image") ? (
        <div className={clsx("relative group")}>
          <div
            className={clsx(
              "border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center",
              isProfile ? "rounded-full h-44 w-44" : "rounded-lg h-64 w-full"
            )}
          >
            <Image
              src={filePreviewUrl ?? getValues("image")}
              alt="Preview"
              as={NextImage}
              className="max-h-full max-w-full object-contain"
              width={300}
              height={200}
            />
          </div>
          <div
            className={clsx(
              "absolute flex gap-2 z-10",
              isProfile ? "top-1/2 left-1/4" : "top-2 right-2"
            )}
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<BsTrash />}
              onClick={handleRemoveFile}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
            {uploadStatus !== "done" && (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#166534",
                  },
                }}
              >
                <Button
                  type="primary"
                  size="small"
                  icon={<IoMdCloudUpload />}
                  loading={isUploading}
                  onClick={handleUploadFile}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary"
                >
                  {isUploading ? "Uploading" : "Upload"}
                </Button>
              </ConfigProvider>
            )}
            {uploadStatus === "done" && (
              <Button
                type="default"
                size="small"
                icon={<IoMdCheckmark className="text-primary" />}
                className="opacity-100 disabled:bg-primary disabled:text-white"
                disabled
              >
                Uploaded
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Dragger
          name="file"
          multiple={false}
          accept="image/*"
          beforeUpload={handleChooseFile}
          showUploadList={false}
          className={clsx(
            "border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50 flex flex-col items-center justify-center transition-colors",
            isProfile ? "rounded-full h-44 w-44" : "rounded-lg h-64 w-full"
          )}
        >
          <div className="text-center p-4">
            <RiImageAddLine className="text-4xl text-gray-400 mx-auto mb-3" />
            {!isProfile && (
              <>
                <p className="text-gray-500 mb-1">
                  <span className="text-blue-500 font-medium">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
              </>
            )}
          </div>
        </Dragger>
      )}
    </div>
  );
};

export default UploadImage;
