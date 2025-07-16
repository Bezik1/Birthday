import { useState } from "react";
import "./index.css";
import { motion, MotionValue } from "motion/react";
import AnimatedText from "../AnimatedText";

const PhotosContainer = ({ onNext } : { onNext: () => void }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);

    const imagePaths = [
        ...Array.from({ length: 12 }, (_, i) => `/assets/${i + 1}.JPG`),
        '/assets/24.JPG',
        '/assets/25.JPG',
        '/assets/26.JPG',
        '/assets/27.JPG',
        '/assets/28.JPG',
        '/assets/29.JPG',
        '/assets/30.JPG',
        '/assets/31.JPG',
        '/assets/32.JPG',
        '/assets/19.JPEG', '/assets/20.JPEG',
        '/assets/14.jpg', '/assets/16.jpg', '/assets/17.jpg', '/assets/18.jpg',
        '/assets/21.jpg', '/assets/22.jpg', '/assets/23.jpg',
        '/assets/13.PNG', '/assets/15.PNG'
    ];

    const visibleImages = Array.from({ length: visibleCount }, (_, i) => {
        const index = (startIndex + i) % imagePaths.length;
        return imagePaths[index];
    });

    const getStyle = (i: number): MotionValue => {
    const center = Math.floor(visibleCount / 2);
    const rotation = (i - center) * 5;
    const xOffset = (i - center) * 8;
    const yOffset = (i - center) * 6;
    return {
        // @ts-ignore
        transform: `translate(-50%, -50%) translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`,
        zIndex: i,
        position: 'absolute',
        left: '50%',
        padding: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030',
        borderRadius: '8px',
    };
    };

    const handleNext = () => {
    if (visibleCount < 5 && visibleCount < imagePaths.length) {
        setVisibleCount(visibleCount + 1);
    } else {
        setStartIndex((startIndex + 1) % imagePaths.length);
    }
    };

    return (
    <section className="photos-container">
        <header><AnimatedText>Nasze Wspomnienia</AnimatedText></header>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', delay: 0.5 }}
        >
            {visibleImages.map((src, i) => (
            <motion.div
                key={(startIndex + i) % imagePaths.length} 
                className="image-card" 
                style={getStyle(i % 6) as any}
            >
                <img className="image" src={src} alt={`photo-${(startIndex + i) % imagePaths.length}`} />
            </motion.div>
            ))}
        </motion.div>
        
        <div className="btns">
            <motion.button
                onClick={handleNext}
                className="photos-btn shiny-btn"
                whileHover="hover"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
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
                Następne Zdjęcie
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
            <motion.button
                onClick={onNext}
                className="photos-btn shiny-btn"
                whileHover="hover"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
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
                Idź do Muzyki
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
        </div>
    </section>
    );
    };

    export default PhotosContainer;
