import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

interface IProps {
    icon: string;
    count?: number;
}

export default function FlyIcon({ icon, count = 10 }: IProps) {
    const width = typeof window !== "undefined" ? window.innerWidth : 1920;
    const height = typeof window !== "undefined" ? window.innerHeight : 1080;

    return (
        <>
            {Array.from({ length: count }).map(() => {
                const startX = Math.random() * width;
                const endX = startX + (Math.random() * 200 - 100);
                const duration = 5 + Math.random() * 5;
                const delay = Math.random() * 3;
                const rotateStart = Math.random() * 360;
                const rotateEnd = rotateStart + (Math.random() * 180 - 90);

                return (
                    <motion.div
                        key={uuidv4()}
                        className="absolute text-4xl select-none pointer-events-none z-[9999]"
                        initial={{ opacity: 0, y: height + 50, x: startX, rotate: rotateStart, scale: 0.8 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [height + 50, -50],
                            x: [startX, endX],
                            rotate: [rotateStart, rotateEnd],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration,
                            repeat: Infinity,
                            delay,
                            ease: "easeInOut",
                        }}
                    >
                        {icon}
                    </motion.div>
                );
            })}
        </>
    );
}
