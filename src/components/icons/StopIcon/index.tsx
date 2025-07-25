import { motion } from "framer-motion";

const StopIcon = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        className={className}
        onClick={onClick}
    >
    <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8 7C7.44772 7 7 7.44772 7 8V12C7 12.5523 7.44772 13 8 13H12C12.5523 13 13 12.5523 13 12V8C13 7.44772 12.5523 7 12 7H8Z"
        fill="currentColor"
        whileHover="hover"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        variants={{
            hover: {
                y: -1,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                },
            },
        }}
    />
    </svg>
);

export default StopIcon;
