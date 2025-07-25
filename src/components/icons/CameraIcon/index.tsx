import { motion } from "framer-motion";

const CameraIcon = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
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
            d="M3 9C3 7.89543 3.89543 7 5 7H5.92963C6.59834 7 7.2228 6.6658 7.59373 6.1094L8.40627 4.8906C8.7772 4.3342 9.40166 4 10.0704 4H13.9296C14.5983 4 15.2228 4.3342 15.5937 4.8906L16.4063 6.1094C16.7772 6.6658 17.4017 7 18.0704 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V9Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: 1.2, 
            }}
        />
        <motion.path 
            d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: 1.2, 
            }}
        />
    </motion.svg>
);

export default CameraIcon;