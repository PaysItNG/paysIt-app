import PreviewConfirmation from "../PreviewConfirmation";
import UtilityStepWrapper from "../UtilityStepsWrapper";
import CableFormView from "./CableFormView";

const CableView = () => {
  const viewsComponent = {
    initial: CableFormView,
    preview: PreviewConfirmation,
  };
  return (
    <>
      <UtilityStepWrapper viewsComponent={viewsComponent} />
    </>
  );
};

export default CableView;
