import "./index.css"

import { motion } from "motion/react";
import type { ReactNode } from "react";

type AnimationStyle = "bounce" | "slide" | "fade";

const AnimatedText = ({
  children,
  delay = 0,
  style = "bounce",
}: {
  children: ReactNode;
  delay?: number,
  style?: AnimationStyle;
}) => {
  const text = typeof children === "string" ? children : "";
  const letters = Array.from(text);

  const getAnimationProps = (index: number) => {
    switch (style) {
      case "slide":
        return {
          initial: { opacity: 0, x: -20, },
          animate: { opacity: 1, x: 0 },
          transition: { delay: delay + index * 0.05, duration: 0.4 } as const,
        };
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: delay + index * 0.03, duration: 0.3 } as const,
        };
      case "bounce":
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay: delay + index * 0.05,
            type: "spring",
            stiffness: 300,
            damping: 20,
          } as const,
        };
    }
  };

  return (
    <span className="animated-text" style={{ display: "inline-block", whiteSpace: "pre-wrap" }}>
      {letters.map((letter, index) => {
        const { initial, animate, transition } = getAnimationProps(index);
        return (
          <motion.span
            key={index}
            initial={initial}
            animate={animate}
            transition={transition}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {letter}
          </motion.span>
        );
      })}
    </span>
  );
};

export default AnimatedText;
