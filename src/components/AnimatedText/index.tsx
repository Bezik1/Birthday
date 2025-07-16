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
  delay?: number;
  style?: AnimationStyle;
}) => {
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  const getAnimationProps = (index: number) => {
    switch (style) {
      case "slide":
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: delay + index * 0.05, duration: 0.4 },
        };
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: delay + index * 0.03, duration: 0.3 },
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
          },
        };
    }
  };

  let letterIndex = 0;

  return (
    <span className="animated-text" style={{ display: "inline", whiteSpace: "normal" }}>
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          style={{ whiteSpace: "nowrap", display: "inline-block", marginRight: "0.25em" }}
        >
          {Array.from(word).map(letter => {
            const { initial, animate, transition } = getAnimationProps(letterIndex);
            const span = (
              <motion.span
                key={letterIndex}
                initial={initial}
                animate={animate}
                transition={transition as any}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            );
            letterIndex++;
            return span;
          })}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText