import TransactionTable from "@/components/core/transaction/TransactionTable";
import PageHeader from "@/components/shared/PageHeader";

const Transaction = () => {
  return (
    <>
      <main>
        <PageHeader title="Transaction" />
        <div className="mt-6">
          <TransactionTable />
        </div>
      </main>
    </>
  );
};

export default Transaction;
