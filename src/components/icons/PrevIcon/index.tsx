import { motion } from "framer-motion";

const PrevIcon = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        className={className}
        onClick={onClick}
    >
        <motion.path
            d="M8.44524 14.8321C8.75209 15.0366 9.14664 15.0557 9.4718 14.8817C9.79695 14.7077 9.99994 14.3688 9.99994 14L9.99994 11.2019L15.4452 14.8321C15.7521 15.0366 16.1466 15.0557 16.4718 14.8817C16.797 14.7077 16.9999 14.3688 16.9999 14V6C16.9999 5.63121 16.797 5.29235 16.4718 5.11833C16.1466 4.94431 15.7521 4.96338 15.4452 5.16795L9.99994 8.79815V6C9.99994 5.63121 9.79695 5.29235 9.4718 5.11833C9.14664 4.94431 8.7521 4.96338 8.44524 5.16795L2.44524 9.16795C2.16704 9.35342 1.99994 9.66565 1.99994 10C1.99994 10.3344 2.16704 10.6466 2.44524 10.8321L8.44524 14.8321Z"            fill="currentColor"
            whileHover="hover"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, type: 'spring' }}
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

export default PrevIcon;
