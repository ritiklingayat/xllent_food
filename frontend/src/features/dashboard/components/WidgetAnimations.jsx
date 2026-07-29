/*
|--------------------------------------------------------------------------
| Widget Animations
|--------------------------------------------------------------------------
|
| Centralized Framer Motion animation presets
| for the complete Dashboard Widget System.
|
| Power BI / Stripe / Microsoft Fabric Inspired
|
*/

export const fadeIn = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },

  transition: {
    duration: 0.25,
    ease: "easeOut",
  },
};

export const slideUp = {
  initial: {
    opacity: 0,
    y: 40,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: 20,
  },

  transition: {
    duration: 0.35,
    ease: "easeOut",
  },
};

export const slideDown = {
  initial: {
    opacity: 0,
    y: -30,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: -20,
  },

  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

export const slideLeft = {
  initial: {
    opacity: 0,
    x: 35,
  },

  animate: {
    opacity: 1,
    x: 0,
  },

  exit: {
    opacity: 0,
    x: 25,
  },

  transition: {
    duration: 0.3,
  },
};

export const slideRight = {
  initial: {
    opacity: 0,
    x: -35,
  },

  animate: {
    opacity: 1,
    x: 0,
  },

  exit: {
    opacity: 0,
    x: -25,
  },

  transition: {
    duration: 0.3,
  },
};

export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },

  animate: {
    opacity: 1,
    scale: 1,
  },

  exit: {
    opacity: 0,
    scale: 0.95,
  },

  transition: {
    duration: 0.25,
  },
};

export const popIn = {
  initial: {
    opacity: 0,
    scale: 0.7,
  },

  animate: {
    opacity: 1,
    scale: 1,
  },

  transition: {
    type: "spring",
    stiffness: 260,
    damping: 18,
  },
};

export const widgetCard = {
  initial: {
    opacity: 0,
    y: 25,
    scale: 0.98,
  },

  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },

  whileHover: {
    y: -6,
    scale: 1.015,
  },

  transition: {
    duration: 0.28,
  },
};

export const floating = {
  animate: {
    y: [0, -6, 0],
  },

  transition: {
    repeat: Infinity,
    duration: 3,
    ease: "easeInOut",
  },
};

export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
  },

  transition: {
    repeat: Infinity,
    duration: 2,
  },
};

export const rotate = {
  animate: {
    rotate: 360,
  },

  transition: {
    repeat: Infinity,
    duration: 6,
    ease: "linear",
  },
};

export const bounce = {
  animate: {
    y: [0, -8, 0],
  },

  transition: {
    repeat: Infinity,
    duration: 1.8,
  },
};

export const shimmer = {
  animate: {
    opacity: [0.4, 1, 0.4],
  },

  transition: {
    repeat: Infinity,
    duration: 1.4,
  },
};

export const staggerContainer = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export const dashboardGrid = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const glassHover = {
  whileHover: {
    scale: 1.02,
    backdropFilter: "blur(20px)",
  },
};

export const iconHover = {
  whileHover: {
    rotate: 8,
    scale: 1.15,
  },

  whileTap: {
    scale: 0.92,
  },
};

export const buttonHover = {
  whileHover: {
    y: -2,
    scale: 1.03,
  },

  whileTap: {
    scale: 0.96,
  },
};

export const fullscreenAnimation = {
  initial: {
    opacity: 0,
    scale: 0.94,
  },

  animate: {
    opacity: 1,
    scale: 1,
  },

  exit: {
    opacity: 0,
    scale: 0.96,
  },

  transition: {
    duration: 0.25,
  },
};

export const drawerAnimation = {
  initial: {
    x: "100%",
  },

  animate: {
    x: 0,
  },

  exit: {
    x: "100%",
  },

  transition: {
    type: "spring",
    damping: 22,
    stiffness: 220,
  },
};

export const modalAnimation = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 30,
  },

  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
  },

  transition: {
    duration: 0.25,
  },
};

export const pageTransition = {
  initial: {
    opacity: 0,
    y: 15,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: -15,
  },

  transition: {
    duration: 0.3,
  },
};

export const chartAnimation = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },

  show: {
    opacity: 1,
    pathLength: 1,

    transition: {
      duration: 1.2,
    },
  },
};