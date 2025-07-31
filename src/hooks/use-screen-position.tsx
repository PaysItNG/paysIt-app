import { ScrollPositionType } from "@/lib/utils/typeConfig";
import { useScrollPosition } from "react-haiku";

export const useGetScreenPosition = () => {
  const [scroll] = useScrollPosition();

  return scroll as ScrollPositionType;
};
