"use client";
import { useState, useEffect, useRef, createElement } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StepWrapperProps<T extends string> {
  currentView: T;
  viewsComponent: Record<T, React.ComponentType>;
  viewsOrder?: T[]; // Optional: for controlling direction if order matters
}

const StepWrapper = <T extends string>({
  currentView,
  viewsComponent,
  viewsOrder,
}: StepWrapperProps<T>) => {
  const order = viewsOrder ?? (Object.keys(viewsComponent) as T[]);
  const prevViewRef = useRef(currentView);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const prevIndex = order.indexOf(prevViewRef.current);
    const currentIndex = order.indexOf(currentView);

    if (currentIndex > prevIndex) setDirection(1);
    else if (currentIndex < prevIndex) setDirection(-1);

    prevViewRef.current = currentView;
  }, [currentView, order]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  const transition = {
    type: "tween",
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

export default StepWrapper;
