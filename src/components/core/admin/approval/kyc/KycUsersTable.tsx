"use client";
import { useGetUserKyc } from "@/api/kyc";
import Button from "@/components/shared/ui/Button";
import ChipStatus, { StatusColorType } from "@/components/shared/ui/ChipStatus";
import Input from "@/components/shared/ui/Input";
import Title from "@/components/shared/ui/Title";
import { formatInitial } from "@/lib/utils/formatInitial";
import {
  Avatar,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import clsx from "clsx";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import ViewKycDetail from "./ViewKycDetailDrawer";
import { useViewKycDetailStore } from "@/store/viewKycDetail";
import {
  KycStatusType,
  KycStatusValue,
  UserKycType,
} from "@/lib/utils/typeConfig";
import { ChevronDownIcon } from "@/lib/design/svgIcons";

const colors = [
  { tColor: "text-red-500", bColor: "bg-red-100" },
  { tColor: "text-blue-500", bColor: "bg-blue-100" },
  { tColor: "text-green-500", bColor: "bg-green-100" },
  { tColor: "text-orange-500", bColor: "bg-orange-100" },
  { tColor: "text-purple-500", bColor: "bg-purple-100" },
  { tColor: "text-pink-500", bColor: "bg-pink-100" },
  { tColor: "text-indigo-500", bColor: "bg-indigo-100" },
];

const kycStatus: Record<"pending" | "approved" | "rejected", string> = {
  pending: "pending",
  approved: "success",
  rejected: "error",
};

const KycUsersTable = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

  const [selectedOption, setSelectedOption] = React.useState<
    "pending" | "approved" | "rejected"
  >("approved");

  const { openDrawer } = useViewKycDetailStore();

  console.log(selectedOption);

  const { data, isPending: isLoading } = useGetUserKyc({
    d: 30,
    kyc_status: selectedOption,
  });

  const usersKyc = data?.[0] as UserKycType[] | undefined;

  const topContent = (
    <div className="flex justify-between gap-3">
      {selectedKeys?.size ? (
        <Title
          title={`${selectedKeys.size} Users selected`}
          classNames={{
            title: "text-black text-[0.9rem]",
          }}
        />
      ) : null}

      <div className="">
        <Input
          radius="sm"
          variant="bordered"
          placeholder="Search..."
          startContent={<CiSearch size={25} />}
          classNames={{
            base: "lg:min-w-72 w-full",
          }}
        />
      </div>
      <SelectFilterOption
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption as keyof KycStatusType}
      />
    </div>
  );

  return (
    <>
      <Table
        aria-label="Financial Transactions"
        className="w-full text-gray-500 text-[.85rem] font-semibold"
        selectedKeys={selectedKeys}
        // selectionMode="multiple"
        fullWidth
        onRowAction={() => {}}
        isStriped={true}
        topContent={topContent}
        onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
        // bottomContent={
        //   pages > 1 && (
        //     <div className="flex w-full justify-center">
        //       <Pagination
        //         isCompact
        //         showControls
        //         showShadow
        //         color="primary"
        //         page={page}
        //         total={pages}
        //         onChange={(page) => setPage(page)}
        //       />
        //     </div>
        //   )
        // }
        classNames={{
          wrapper: "shadow-none",
          base: "text-gray-500 text-[.85rem] font-semibold",
        }}
      >
        <TableHeader>
          <TableColumn>
            <div className="flex items-center cursor-pointer text-[.85rem] font-medium text-gray-500">
              <span>Customer</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex items-center cursor-pointer text-[.85rem] font-medium text-gray-500">
              <span>Role</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex items-center cursor-pointer text-[.85rem] font-medium text-gray-500">
              <span>Submission Date</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex items-center cursor-pointer text-[.85rem] font-medium text-gray-500">
              <span>Status</span>
            </div>
          </TableColumn>
          <TableColumn className="text-[.85rem] font-medium text-gray-500">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading KYC..." />}
          emptyContent={"No statement found"}
        >
          {usersKyc?.map((userData, index) => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            return (
              <TableRow key={index}>
                <TableCell className="whitespace-nowrap text-[.82rem] font-medium text-black/80">
                  <div className="flex items-center gap-2">
                    <div>
                      <Avatar
                        size="md"
                        // src={`https://i.pravatar.cc/150?im${index + 8}`}
                        name={formatInitial(
                          userData?.user?.first_name,
                          userData?.user?.last_name
                        )}
                        classNames={{
                          base: [colors?.[randomIndex].bColor],
                          name: ["font-bold", colors?.[randomIndex].tColor],
                        }}
                      />
                    </div>
                    <div>
                      <p>{"John Fixit"}</p>
                      <p className="text-gray-400 font-medium">
                        {userData?.user?.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className=" text-[.82rem] font-medium text-black/80">
                  {userData?.user?.role}
                </TableCell>

                <TableCell className=" text-[.82rem] font-medium text-black/80">
                  {dayjs(userData?.submitted_at).format("D MMMM, YYYY")}
                </TableCell>
                <TableCell className=" text-[.82rem] font-medium text-black/80">
                  <ChipStatus
                    status={
                      kycStatus?.[userData.status] as keyof StatusColorType
                    }
                    label={kycStatus?.[userData.status]}
                  />
                </TableCell>
                <TableCell className="">
                  <div className="flex gap-x-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => openDrawer({ userData })}
                    >
                      <AiFillEye size={18} className="text-gray-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          }) || <></>}
        </TableBody>
      </Table>

      <ViewKycDetail />
    </>
  );
};

export default KycUsersTable;

type SelectFilterOptionType = {
  setSelectedOption: (val: KycStatusValue) => void;
  selectedOption: keyof KycStatusType;
};

const SelectFilterOption = ({
  setSelectedOption,
  selectedOption,
}: SelectFilterOptionType) => {
  const labelsMap: Record<
    "pending" | "approved" | "rejected",
    keyof KycStatusType
  > = {
    pending: "pending",
    approved: "approved",
    rejected: "rejected",
  };

  // Convert the Set to an Array and get the first value.
  // const selectedOptionValue = Array.from(selectedOption as )[0];

  return (
    <ButtonGroup variant="flat">
      <Button className="capitalize">{labelsMap[selectedOption]}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          className="max-w-[300px]"
          selectedKeys={selectedOption as KycStatusValue}
          selectionMode="single"
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string; // Extract the selected key
            setSelectedOption(selectedKey as KycStatusValue); // Pass the key to the state setter
          }}
        >
          <DropdownItem key="pending" className="capitalize">
            {labelsMap["pending"]}
          </DropdownItem>
          <DropdownItem key="approved" className="capitalize">
            {labelsMap["approved"]}
          </DropdownItem>
          <DropdownItem key="rejected" className="capitalize">
            {labelsMap["rejected"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};
