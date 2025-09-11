import React from "react";
import AirtimeInitialView from "./AirtimeInitialView";
import PreviewConfirmation from "../PreviewConfirmation";
import UtilityStepWrapper from "../UtilityStepsWrapper";
import TransactionSummaryReceipt from "../TransactionSummaryReceipt";

const AirtimeView = () => {
  const viewsComponent = {
    initial: AirtimeInitialView,
    preview: PreviewConfirmation,
    receipt: TransactionSummaryReceipt,
  };
  return (
    <>
      <UtilityStepWrapper viewsComponent={viewsComponent} />
    </>
  );
};

export default AirtimeView;
