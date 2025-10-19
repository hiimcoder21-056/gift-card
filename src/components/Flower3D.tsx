import { motion } from "framer-motion";
import flowerSvg from "../assets/flower.svg";

export default function Flower3D() {
    return (
        <motion.div
            initial={{ rotateX: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotateX: 0, scale: 1.2, opacity: 1 }}
            transition={{
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative perspective-1000"
        >
            <motion.img
                src={flowerSvg}
                alt="flower"
                className="w-40 h-40 md:w-56 md:h-56 drop-shadow-2xl transform-gpu"
                animate={{ rotateZ: [0, 3, -3, 0], scale: [1, 1.05, 1] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }}
            />
        </motion.div>
    );
}
