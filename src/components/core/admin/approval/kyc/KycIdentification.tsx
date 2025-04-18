import Card from "@/components/shared/ui/Card";
import { filePrefix } from "@/lib/utils/filePrefix";
import { UserKycType } from "@/lib/utils/typeConfig";
import { Divider, Skeleton } from "@heroui/react";
import { Image } from "antd";
// import NextImage from "next/image";
import React, { FC } from "react";

type PropType = {
  kycData: UserKycType;
  isLoading: boolean;
};

const KycIdentification: FC<PropType> = ({ kycData, isLoading }) => {
  return (
    <>
      <main>
        <Card className="p-6 !shadow-sm">
          <div className="md:flex justify-between items-center space-y-4">
            <div className="w-full md:h-[200px] md:w-[200px]">
              {isLoading ? (
                <>
                  <Skeleton className="h-3 mb-1.5 rounded" />
                  <Skeleton className="h-[180px] w-[200px] rounded" />
                </>
              ) : (
                <>
                  <p className="mb-1 font-medium text-center">ID Document</p>

                  <Image
                    src={filePrefix + kycData?.id_document}
                    alt="user_id_doc"
                    className="w-full"
                  />
                </>
              )}
            </div>
            <Divider
              orientation="vertical"
              className="hidden md:flex h-[200px] border-2"
            />
            <div className="w-full md:h-[200px] md:w-[200px]">
              {isLoading ? (
                <>
                  <Skeleton className="h-3 mb-1.5 rounded" />
                  <Skeleton className="h-[180px] w-[200px] rounded" />
                </>
              ) : (
                <>
                  <p className="mb-1 font-medium text-center">Selfie</p>
                  <Image
                    src={filePrefix + kycData?.selfie}
                    alt="user_id_doc"
                    className="w-full"
                  />
                </>
              )}
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};

export default KycIdentification;
