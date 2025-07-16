import AnimatedText from "../AnimatedText";
import "./index.css"

import { motion } from "motion/react"

const StarterContainer = ({ onNext } : { onNext: () => void }) =>{

    const circles = [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
    ];

    return (
        <motion.section className="starter-container"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            <header>
                <AnimatedText>Cześć Iwonka</AnimatedText>
            </header>
            <desc className="starter-desc">
                <AnimatedText style="fade" delay={0.8}>
                    Masz urodziny kochanie, więc to jest mój własny sposób 
                    aby pokazać ci moją miłość.
                </AnimatedText>
            </desc>
            <motion.button
                onClick={onNext}
                className="starter-btn shiny-btn"
                whileHover="hover"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 3.4, type: 'spring' }}
                variants={{
                    hover: {
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        },
                    },
                }}
            >
                Idź do zdjęć
                <motion.div
                    className="shine-effect"
                    variants={{
                        hover: {
                            x: ["-100%", "200%"],
                            transition: {
                                duration: 0.8,
                                ease: "easeInOut",
                            },
                        },
                    }}
                />
            </motion.button>
            {circles.map((className, i) => (
                <motion.div
                    key={className}
                    className={`${className} corner-circle`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: (i+1)*0.2, type: "spring", stiffness: 260, damping: 40 }}
                />
            ))}
        </motion.section>
    )
}

export default StarterContainer