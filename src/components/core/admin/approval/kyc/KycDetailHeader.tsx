"use client";

import Card from "@/components/shared/ui/Card";
import ChipStatus from "@/components/shared/ui/ChipStatus";
import { formatInitial } from "@/lib/utils/formatInitial";
import { UserType } from "@/lib/utils/typeConfig";
import { Avatar, Badge, Skeleton } from "@heroui/react";
import { Tag } from "antd";
import dayjs from "dayjs";
import { FC } from "react";

type PropType = {
  user: UserType;
  submitted_at?: string;
  submitted: boolean;
  isLoading: boolean;
  status: string;
};

const KycDetailHeader: FC<PropType> = ({
  user,
  isLoading,
  submitted,
  submitted_at,
  status,
}) => {
  const nameInitials = formatInitial(
    user?.first_name || "",
    user?.last_name || ""
  );

  return (
    <Card className="p-6 relative !shadow-sm">
      {/* {submitted && (
        <div className="absolute right-4 top-2 text-sm">
          Submitted On:{" "}
          <span className="font-medium">
            {dayjs(submitted_at).format("D MMMM, YYYY")}
          </span>
        </div>
      )} */}
      <div className="md:flex justify-between space-y-4">
        <div className="flex gap-x-3 items-center">
          <div>
            {isLoading ? (
              <Skeleton className="w-28 h-28 rounded-full"></Skeleton>
            ) : (
              <Badge
                placement="bottom-right"
                className="bg-orange-100 border-1 border-orange-100 text-orange-400 py-[0.15rem] px-[0.3rem]"
                content={
                  <div className="flex capitalize items-center text-xs">
                    {user?.role || ""}
                  </div>
                }
              >
                <Avatar
                  className="w-28 h-28 text-4xl shadow"
                  name={nameInitials}
                  classNames={{
                    base: ["bg-green-100"],
                    name: ["font-bold uppercase", "text-primary"],
                  }}
                />
              </Badge>
            )}
          </div>
          <div className="space-y-2">
            <div>
              {isLoading ? (
                <Skeleton className="h-5 w-32 rounded-full" />
              ) : (
                <h3 className="font-semibold capitalize">
                  {user?.first_name} {user?.last_name}
                </h3>
              )}
              {isLoading ? (
                <Skeleton className="h-5 w-44 rounded-full mt-2" />
              ) : (
                <p className="text-sm text-default-400">{user?.email}</p>
              )}
            </div>
            <div>
              {isLoading ? (
                <Skeleton className="h-7 w-32 rounded-full" />
              ) : (
                <ChipStatus
                  status={user?.is_active ? "success" : "pending"}
                  label={
                    user?.is_active
                      ? "Account activated"
                      : "Account not activated"
                  }
                  size="md"
                />
              )}
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-sm">
            Kyc Status:{" "}
            <Tag
              color={
                status === "pending"
                  ? "warning"
                  : status === "approved"
                  ? "success"
                  : "error"
              }
            >
              {status}
            </Tag>
          </div>
          {submitted && (
            <div className="text-sm">
              Submitted On:{" "}
              <span className="font-medium">
                {dayjs(submitted_at).format("D MMMM, YYYY")}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default KycDetailHeader;
