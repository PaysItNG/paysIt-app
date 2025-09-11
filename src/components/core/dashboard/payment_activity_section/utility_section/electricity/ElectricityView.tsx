import PreviewConfirmation from "../PreviewConfirmation";
import TransactionSummaryReceipt from "../TransactionSummaryReceipt";
import UtilityStepWrapper from "../UtilityStepsWrapper";
import ElectricityFormView from "./ElectricityFormView";

const ElectricityView = () => {
  const viewsComponent = {
    initial: ElectricityFormView,
    preview: PreviewConfirmation,
    receipt: TransactionSummaryReceipt,
  };
  return (
    <>
      <UtilityStepWrapper viewsComponent={viewsComponent} />
    </>
  );
};

export default ElectricityView;
