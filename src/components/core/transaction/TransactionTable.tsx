"use client";

import { useGetTransactions } from "@/api/transactions";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { TransactionDataType } from "@/lib/utils/typeConfig";
import {
  Chip,
  Spinner,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from "@heroui/react";
import clsx from "clsx";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

type TableColumnType = {
  name: string;
  selector?: string | keyof TransactionDataType;
  isCurrency?: boolean;
  isDate?: boolean;
  minWidth?: string;
};

const tableColumns: TableColumnType[] = [
  { name: "", selector: "payment_type", isCurrency: false },
  { name: "Name", selector: "user", isCurrency: false, minWidth: "200px" },
  { name: "Date", selector: "date", isDate: true, minWidth: "150px" },
  { name: "Transaction ID", selector: "reference_id", isCurrency: false },
  { name: "Transaction Type", selector: "transaction_type", isCurrency: false },
  { name: "Description", selector: "description", isCurrency: false },
  { name: "Amount", selector: "amount", isCurrency: true },
  { name: "Status", selector: "status", isCurrency: false },
  { name: "", selector: "actions", isCurrency: false },
];

const statusColor: Record<string, "success" | "danger"> = {
  completed: "success",
  pending: "danger",
};

type TabKeysType = "all" | "complete" | "pending" | "deposit" | "outgoing";

const TransactionTable = () => {
  const [activeTab, setActiveTab] = useState<TabKeysType>("all");

  const { data, isPending: isloadingTransaction } = useGetTransactions({});

  const transactionData: TransactionDataType[] = useMemo(() => {
    const arr = data?.data;
    if (!Array.isArray(arr)) return [];
    if (activeTab === "all") return arr;
    if (activeTab === "complete")
      return arr.filter((row) => row.status === "completed");
    if (activeTab === "pending")
      return arr.filter((row) => row.status === "pending");
    if (activeTab === "deposit")
      return arr.filter((row) => row.payment_type === "credit");
    if (activeTab === "outgoing")
      return arr.filter((row) => row.payment_type === "debit");
    return arr;
  }, [data, activeTab]);

  const TransTypeIcon = ({ type }: { type: string }) => {
    const icon = useMemo(() => {
      if (type === "debit") {
        return <FaArrowTrendDown size={20} />;
      }
      if (type === "credit") {
        return <FaArrowTrendUp size={20} />;
      }
    }, [type]);

    return (
      <div
        className={clsx(
          "text-white rounded flex items-center justify-center h-7 w-7",
          type === "credit" ? "bg-green-600" : "bg-red-500"
        )}
      >
        {icon}
      </div>
    );
  };

  return (
    <>
      {/* status tabs */}
      <div className="mb-4 flex gap-4">
        <div>
          <Tabs
            aria-label="Tabs sizes"
            size={"md"}
            color="primary"
            variant="bordered"
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as TabKeysType)}
          >
            <Tab title="All" key="all" />
            <Tab title="Complete" key="complete" />
            <Tab title="Pending" key="pending" />
          </Tabs>
        </div>
        <div>
          <Tabs
            aria-label="Tabs sizes"
            size={"md"}
            color="primary"
            variant="bordered"
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as TabKeysType)}
          >
            <Tab title="Deposit" key="deposit" />
            <Tab title="Outgoing" key="outgoing" />
          </Tabs>
        </div>
      </div>
      <Table
        aria-label="Transactions Table"
        isHeaderSticky
        isStriped
        shadow="sm"
        radius="sm"
      >
        <TableHeader>
          {tableColumns.map((column) => (
            <TableColumn
              key={column.selector}
              className="text-black/50 text-[0.9rem] font-medium"
            >
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={isloadingTransaction}
          loadingContent={<Spinner label="Loading..." />}
          items={transactionData}
          emptyContent={<div>Empty Transaction</div>}
        >
          {(rowData) => (
            <TableRow key={rowData.id}>
              {tableColumns.map((column) => (
                <TableCell
                  key={column.selector}
                  className={clsx(
                    "py-4 text-gray-500/95 text-start",
                    column.minWidth && `min-w-[${column.minWidth}]`
                  )}
                >
                  {column.selector === "payment_type" ? (
                    <TransTypeIcon type={rowData.payment_type} />
                  ) : column.selector === "status" ? (
                    <Chip
                      color={
                        statusColor[rowData.status as keyof typeof statusColor]
                      }
                      variant="light"
                      className="capitalize"
                    >
                      {rowData[column.selector]}
                    </Chip>
                  ) : column.isDate ? (
                    dayjs(rowData.created_at).format("DD MMM YY") +
                    dayjs(rowData.created_at).format("hh:mmA")
                  ) : column.isCurrency ? (
                    formatCurrency(
                      rowData[column.selector as keyof TransactionDataType] ??
                        ""
                    )
                  ) : (
                    rowData[column.selector as keyof TransactionDataType] ?? ""
                  )}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionTable;
