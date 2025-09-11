"use client";
import PlanView from "./PlanView";
import PreviewConfirmation from "../PreviewConfirmation";
import UtilityStepWrapper from "../UtilityStepsWrapper";
import TransactionSummaryReceipt from "../TransactionSummaryReceipt";

const DataView = () => {
  const viewsComponent = {
    initial: PlanView,
    preview: PreviewConfirmation,
    receipt: TransactionSummaryReceipt,
  };

  return (
    <>
      <UtilityStepWrapper viewsComponent={viewsComponent} />
    </>
  );
};

export default DataView;
