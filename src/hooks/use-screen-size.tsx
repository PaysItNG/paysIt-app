import { useMediaQuery } from "react-responsive";

const useScreenSize = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 639 }); // < 640px
  const isMediumScreen = useMediaQuery({ minWidth: 640, maxWidth: 1023 }); // 640px - 1023px
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }); // >= 1024px

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  };
};

export default useScreenSize;
