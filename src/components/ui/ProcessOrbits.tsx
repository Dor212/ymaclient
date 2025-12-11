import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

type ProcessOrbitsProps = {
    src: string;
    className?: string;
    style?: CSSProperties;
};

export default function ProcessOrbits({ src, className = "", style }: ProcessOrbitsProps) {
    const reduced = useReducedMotion() ?? false;

    return (
        <motion.img
            src={src}
            alt=""
            className={className}
            style={style}
            animate={
                reduced
                    ? undefined
                    : {
                        x: [0, 12, -9, 6, 0],
                        y: [0, -8, 5, -10, 0],
                        rotate: [0, 4, -3, 2, 0],
                        scale: [1, 1.03, 0.99, 1.04, 1],
                    }
            }
            transition={
                reduced
                    ? undefined
                    : {
                        duration: 24,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }
            }
        />
    );
}
