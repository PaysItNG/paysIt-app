import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlanView from "./PlanView";
import { useUtilityStore } from "@/store/utilityStore";
import PreviewConfirmation from "../PreviewConfirmation";

const DataView = () => {
  const {
    data: { currentView },
  } = useUtilityStore();

  // Track the direction of animation
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Set direction when view changes
  useEffect(() => {
    // If going back to initial view, set direction to -1
    if (currentView === "initial") {
      setDirection(-1);
    } else {
      // If going to confirmation view, set direction to 1
      setDirection(1);
    }
  }, [currentView]);

  // Animation variants
  const slideVariants = {
    enterFromRight: {
      x: 300,
      opacity: 0,
    },
    enterFromLeft: {
      x: -300,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exitToLeft: {
      x: -300,
      opacity: 0,
    },
    exitToRight: {
      x: 300,
      opacity: 0,
    },
  };

  // Transition configuration
  const transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  return (
    <div className="relative overflow-x-hidden">
      <AnimatePresence initial={false} mode="wait">
        {currentView === "initial" ? (
          <motion.div
            key="planView"
            initial={direction === 1 ? "enterFromLeft" : "enterFromRight"}
            animate="center"
            exit={direction === 1 ? "exitToLeft" : "exitToRight"}
            variants={slideVariants}
            transition={transition}
            className="w-full"
          >
            <PlanView />
          </motion.div>
        ) : (
          <motion.div
            key="previewConfirmation"
            initial={direction === 1 ? "enterFromRight" : "enterFromLeft"}
            animate="center"
            exit={direction === 1 ? "exitToRight" : "exitToLeft"}
            variants={slideVariants}
            transition={transition}
            className="w-full"
          >
            <PreviewConfirmation />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DataView;
