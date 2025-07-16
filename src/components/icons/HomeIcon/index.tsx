import { motion } from "framer-motion";

const HomeIcon = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
    <motion.svg
        onClick={onClick}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        whileHover="hover"
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3, type: "spring" }}
        variants={{
        hover: {
            scale: 1.1,
            transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            },
        },
        initial: { scale: 0.8 },
        animate: { scale: 1 },
        }}
    >
        <motion.path
            d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
                duration: 1.5,
                delay: 1.2,
            }}
        />
    </motion.svg>
);

export default HomeIcon;
