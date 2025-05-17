"use client";
import PlanView from "./PlanView";
import PreviewConfirmation from "../PreviewConfirmation";
import UtilityStepWrapper from "../UtilityStepsWrapper";

const DataView = () => {
  const viewsComponent = {
    initial: PlanView,
    preview: PreviewConfirmation,
  };

  return (
    <>
      <UtilityStepWrapper viewsComponent={viewsComponent} />
    </>
  );
};

export default DataView;
