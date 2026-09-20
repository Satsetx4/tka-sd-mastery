import { TargetAndTransition } from 'framer-motion';

// Framer Motion presets - Living & Tactile UI
export const springTransition = {
  type: "spring",
  stiffness: 380,
  damping: 26,
};

export const snappyTransition = {
  type: "spring",
  stiffness: 450,
  damping: 30,
};

export const tapScale = {
  scale: 0.97,
};

export const hoverElevate: TargetAndTransition = {
  y: -2,
  transition: { duration: 0.18 }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: springTransition 
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};
