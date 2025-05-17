"use client";
import { useState, useEffect, useRef, createElement, FC, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUtilityStore } from "@/store/utilityStore";

const views = ["initial", "preview"]; // Define known views in order

type PropType = {
  viewsComponent: {
    initial: Element;
    preview: Element;
  };
};

const UtilityStepWrapper: FC<PropType> = ({ viewsComponent }) => {
  const {
    data: { currentView },
  } = useUtilityStore();

  const prevViewRef = useRef(currentView);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  useEffect(() => {
    const prevIndex = views.indexOf(prevViewRef.current);
    const currentIndex = views.indexOf(currentView);

    if (currentIndex > prevIndex) setDirection(1);
    else if (currentIndex < prevIndex) setDirection(-1);

    prevViewRef.current = currentView;
  }, [currentView]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? 300 : 300,
      opacity: 0,
    }),
  };

  const transition = {
    type: "tween", // You can also try "spring"
    ease: "easeInOut",
    duration: 0.4,
  };

  return (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentView}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full"
        >
          {createElement(viewsComponent[currentView])}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UtilityStepWrapper;
