import PreviewConfirmation from "../PreviewConfirmation";
import TransactionSummaryReceipt from "../TransactionSummaryReceipt";
import UtilityStepWrapper from "../UtilityStepsWrapper";
import CableFormView from "./CableFormView";

const CableView = () => {
  const viewsComponent = {
    initial: CableFormView,
    // plans:
    preview: PreviewConfirmation,
    receipt: TransactionSummaryReceipt,
  };
  return (
    <>
      <UtilityStepWrapper viewsComponent={viewsComponent} />
    </>
  );
};

export default CableView;
