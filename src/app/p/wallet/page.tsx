import MyWalletView from "@/components/core/wallet/MyWalletView";
import PageHeader from "@/components/shared/PageHeader";

const MyWallet = () => {
  return (
    <main>
      <PageHeader title="My Wallets" />
      <p className="text-gray-500">Manage your finances seamlessly</p>
      <div className="mt-6">
        <MyWalletView />
      </div>
    </main>
  );
};

export default MyWallet;
