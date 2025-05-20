import Button from "@/components/shared/ui/Button";
import { useClipboard } from "react-haiku";
import { FaRegCopy } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";

const DepositWithNaira = () => {
  const { copy, copied } = useClipboard({ timeout: 5000 });

  const accountNumber = 1234567890;

  return (
    <>
      <main className="mt-8">
        <div className="text-center space-y-5">
          <p className="text-default-500/70">Account Number</p>
          <h2 className="text-2xl font-extrabold tracking-wide">
            {accountNumber}
          </h2>
          <Button
            onPress={() => copy(String(accountNumber))}
            variant="flat"
            color="primary"
            className="text-primary"
          >
            {copied ? "Copied" : "Copy"} Account Number{" "}
            {copied ? <FaCopy /> : <FaRegCopy />}
          </Button>
        </div>
      </main>
    </>
  );
};

export default DepositWithNaira;
