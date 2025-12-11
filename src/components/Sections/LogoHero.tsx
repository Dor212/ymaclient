import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

type LogoHeroProps = {
    logoSrc?: string;
    titleSrOnly?: string;
    ringWidthPx?: number;
    ringFrom?: string;
    ringTo?: string;
    ringDuration?: number;
};

const LogoHero = ({
    logoSrc = "/Logo.png",
    titleSrOnly = "Y.M.A – אתרים מותאמים",
    ringWidthPx = 8,
    ringFrom = "#FF2E7E",
    ringTo = "#FF7745",
    ringDuration = 1.4,
}: LogoHeroProps) => {
    const prefersReduced = useReducedMotion();
    const gradId = useId();

    return (
        <section
            dir="rtl"
            className="relative flex min-h-[50vh] items-center justify-center px-6 py-16 pt-28 md:pt-32"
        >
            <div className="flex flex-col items-center mx-auto text-center">
                <h1 className="sr-only">{titleSrOnly}</h1>
                <div className="relative inline-block">
                    <motion.img
                        src={logoSrc}
                        alt="לוגו המותג"
                        className="
                            select-none rounded-full
                            w-auto h-52 sm:h-64 md:h-[22rem] lg:h-[26rem] 2xl:h-[30rem]
                            aspect-square object-contain p-6
                        "
                        initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                        whileInView={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                        viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                        transition={{
                            duration: prefersReduced ? 0.4 : 0.8,
                            ease: "easeOut",
                            delay: prefersReduced ? 0 : ringDuration * 0.3,
                        }}
                        draggable={false}
                    />

                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                        aria-hidden
                    >
                        <defs>
                            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={ringFrom} />
                                <stop offset="100%" stopColor={ringTo} />
                            </linearGradient>
                        </defs>

                        <CircleAnimated
                            r={46}
                            strokeWidth={Math.max(2, ringWidthPx / 4)}
                            duration={ringDuration}
                            reduced={Boolean(prefersReduced)}
                            gradientId={gradId}
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default LogoHero;

type CircleAnimatedProps = {
    r: number;
    strokeWidth: number;
    duration: number;
    reduced: boolean;
    gradientId: string;
};

const CircleAnimated = ({
    r,
    strokeWidth,
    duration,
    reduced,
    gradientId,
}: CircleAnimatedProps) => {
    const C = 2 * Math.PI * r;

    return (
        <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={C}
            initial={reduced ? { strokeDashoffset: 0, opacity: 1 } : { strokeDashoffset: C, opacity: 0 }}
            whileInView={reduced ? { strokeDashoffset: 0, opacity: 1 } : { strokeDashoffset: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.7 }}
            transition={
                reduced
                    ? { duration: 0.2 }
                    : { duration, ease: "easeInOut" }
            }
            vectorEffect="non-scaling-stroke"
        />
    );
};
