import React from "react";
import AirtimeInitialView from "./AirtimeInitialView";
import PreviewConfirmation from "../PreviewConfirmation";
import UtilityStepWrapper from "../UtilityStepsWrapper";

const AirtimeView = () => {
  const viewsComponent = {
    initial: AirtimeInitialView,
    preview: PreviewConfirmation,
  };
  return (
    <>
      <UtilityStepWrapper viewsComponent={viewsComponent} />
    </>
  );
};

export default AirtimeView;
