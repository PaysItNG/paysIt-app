"use client";
import { useGetUserKyc } from "@/api/kyc";
import Button from "@/components/shared/ui/Button";
import ChipStatus from "@/components/shared/ui/ChipStatus";
import Input from "@/components/shared/ui/Input";
import Title from "@/components/shared/ui/Title";
import {
  Avatar,
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

const colors = [
  { tColor: "text-red-500", bColor: "bg-red-100" },
  { tColor: "text-blue-500", bColor: "bg-blue-100" },
  { tColor: "text-green-500", bColor: "bg-green-100" },
  { tColor: "text-orange-500", bColor: "bg-orange-100" },
  { tColor: "text-purple-500", bColor: "bg-purple-100" },
  { tColor: "text-pink-500", bColor: "bg-pink-100" },
  { tColor: "text-indigo-500", bColor: "bg-indigo-100" },
];

const KycUsersTable = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

  const { isPending: isLoading } = useGetUserKyc();

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
    </div>
  );

  return (
    <>
      <Table
        aria-label="Financial Transactions"
        className="min-w-full text-gray-500 text-[.85rem] font-semibold"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
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
          loadingContent={<Spinner label="Loading Statement..." />}
          emptyContent={"No statement found"}
        >
          {[1, 2, 3, 4].map((data, index) => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            return (
              <TableRow
                key={index}
                className={clsx("hover:bg-gray-50", index !== 3 && "border-b")}
              >
                <TableCell className="whitespace-nowrap text-[.82rem] font-medium text-black/80">
                  <div className="flex items-center gap-2">
                    <div>
                      <Avatar
                        size="md"
                        // src={`https://i.pravatar.cc/150?im${index + 8}`}
                        name={"JG"}
                        classNames={{
                          base: [colors?.[randomIndex].bColor],
                          name: ["font-bold", colors?.[randomIndex].tColor],
                        }}
                      />
                    </div>
                    <div>
                      <p>{"John Fixit"}</p>
                      <p className="text-gray-400 font-medium">
                        jfixcoding@gmail
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className=" text-[.82rem] font-medium text-black/80">
                  User
                </TableCell>

                <TableCell className=" text-[.82rem] font-medium text-black/80">
                  {dayjs().format("D MMMM, YYYY")}
                </TableCell>
                <TableCell className=" text-[.82rem] font-medium text-black/80">
                  {index % 3 ? (
                    <ChipStatus status="success" label="Success" />
                  ) : (
                    <ChipStatus status="pending" label="Pending" />
                  )}
                </TableCell>
                <TableCell className="">
                  <div className="flex gap-x-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => {}}
                    >
                      <AiFillEye size={18} className="text-gray-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default KycUsersTable;
