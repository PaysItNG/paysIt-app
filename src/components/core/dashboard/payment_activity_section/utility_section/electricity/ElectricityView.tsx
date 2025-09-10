import PreviewConfirmation from "../PreviewConfirmation";
import UtilityStepWrapper from "../UtilityStepsWrapper";
import ElectricityFormView from "./ElectricityFormView";

const ElectricityView = () => {
  const viewsComponent = {
    initial: ElectricityFormView,
    preview: PreviewConfirmation,
  };
  return (
    <>
      <UtilityStepWrapper viewsComponent={viewsComponent} />
    </>
  );
};

export default ElectricityView;
