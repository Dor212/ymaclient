import { useEffect, useMemo, useRef, useState } from "react";
import {
    motion,
    useAnimationControls,
    useInView,
    useReducedMotion,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import type { Variants } from "framer-motion";
import ProcessOrbits from "../ui/ProcessOrbits";

type ProcessSectionProps = {
    id?: string;
    className?: string;
    ringFrom?: string;
    ringTo?: string;
};

const easeCurve = [0.22, 1, 0.36, 1] as const;

type Step = { title: string; desc: string };

const TITLE_TEXT = "הדרך שלנו";

const titleEnter: Variants = {
    hidden: { opacity: 0, y: 18, letterSpacing: "0.18em" },
    show: {
        opacity: 1,
        y: 0,
        letterSpacing: "-0.02em",
        transition: { duration: 1.1, ease: easeCurve },
    },
};

const subtitleEnter: Variants = {
    hidden: { opacity: 0, y: 14, transition: { duration: 0.4, ease: easeCurve } },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.95, delay: 0.18, ease: easeCurve },
    },
};

const stepsContainer: Variants = {
    hidden: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
    show: (dir: 1 | -1) => ({
        transition: {
            staggerChildren: 0.22,
            delayChildren: 0.06,
            staggerDirection: dir === 1 ? 1 : -1,
        },
    }),
};

const stepEnter: Variants = {
    hidden: { opacity: 0, y: 22, transition: { duration: 0.35, ease: easeCurve } },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeCurve } },
};

const connectorEnter: Variants = {
    hidden: { opacity: 0, scaleY: 0.15, transition: { duration: 0.28, ease: easeCurve } },
    show: { opacity: 1, scaleY: 1, transition: { duration: 0.75, ease: easeCurve } },
};

const stepQuestions: string[] = [
    "איך אנחנו מחדדים את המטרה לפני שמתחילים לעצב?",
    "איך הופכים את המטרות לחוויית שימוש טובה?",
    "איך העיצוב הופך לאתר חי שעובד בשבילך?",
    "מה קורה לאתר אחרי שהוא עולה לאוויר?",
];

export default function ProcessSectionA({
    id = "process",
    className = "",
    ringFrom = "#FF2E7E",
    ringTo = "#FF7745",
}: ProcessSectionProps) {
    const reduced = useReducedMotion() ?? false;

    const headerRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);

    const headerInView = useInView(headerRef, { amount: 0.6, once: false });

    const stepsTriggerInView = useInView(triggerRef, {
        once: false,
        amount: 0.01,
        margin: "0px 0px -55% 0px",
    });

    const controls = useAnimationControls();

    const { scrollY } = useScroll();
    const lastY = useRef(0);
    const dirRef = useRef<1 | -1>(1);
    const [dirState, setDirState] = useState<1 | -1>(1);

    useMotionValueEvent(scrollY, "change", (latest) => {
        dirRef.current = latest >= lastY.current ? 1 : -1;
        lastY.current = latest;
    });

    useEffect(() => {
        if (reduced) return;

        if (stepsTriggerInView) {
            const d = dirRef.current;
            setDirState(d);
            controls.set("hidden");
            requestAnimationFrame(() => {
                controls.start("show");
            });
        } else {
            controls.set("hidden");
        }
    }, [stepsTriggerInView, reduced, controls]);

    const steps: Step[] = useMemo(
        () => [
            {
                title: "אפיון ומיקוד",
                desc:
                    "שיחת היכרות קצרה בטלפון/זום. מגדירים מטרות, קהל, מסרים.\nCTA (קריאה לפעולה מה אנחנו רוצים שהגולש יעשה).\nבונים מבנה אתר ברור לפני עיצוב וקוד.",
            },
            {
                title: "עיצוב חוויית משתמש",
                desc:
                    "מעצבים שפה ויזואלית ומסכים מרכזיים בגישת Mobile-first. מחדדים היררכיה, זרימה וקריאות כדי שהאתר ירגיש טבעי ונוח לפני הפיתוח.",
            },
            {
                title: "פיתוח והטמעה",
                desc:
                    "מפתחים בקוד מותאם אישית, רספונסיבי ומהיר. מחברים טפסים/וואטסאפ/אנליטיקס/SEO בסיסי, בודקים ביצועים ומעלים לאוויר.",
            },
            {
                title: "שיפור מתמיד ותחזוקה",
                desc:
                    "נשארים איתכם אחרי ההשקה. תיקונים, עדכונים ושדרוגים לפי חבילה. האתר נשאר נכס חי ומתפתח לא משהו שננעל ביום אחד.",
            },
        ],
        []
    );

    const titleStyle = {
        backgroundImage: `linear-gradient(90deg, ${ringFrom}, ${ringTo})`,
        textShadow: "0 0 16px rgba(230,31,116,0.28)",
        fontWeight: 900,
    } as const;

    return (
        <section
            id={id}
            dir="rtl"
            className={`relative w-full max-w-full py-16 md:py-20 hide-inner-scrollbars ${className}`}
        >
            <div className="max-w-6xl px-4 mx-auto">
                <div ref={headerRef} className="text-center">
                    {reduced ? (
                        <h2
                            className="font-[Heebo] text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent"
                            style={titleStyle}
                        >
                            {TITLE_TEXT}
                        </h2>
                    ) : (
                        <motion.h2
                            className="font-[Heebo] text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent"
                            style={titleStyle}
                            variants={titleEnter}
                            initial="hidden"
                            animate={headerInView ? "show" : "hidden"}
                        >
                            {TITLE_TEXT}
                        </motion.h2>
                    )}

                    <div className="h-1 md:h-2" />

                    {reduced ? (
                        <div className="flex justify-center">
                            <div
                                className="inline-flex items-center justify-center text-center border rounded-3xl"
                                style={{
                                    padding: "0.3rem 1rem",
                                    background:
                                        "linear-gradient(135deg, rgba(58,134,255,0.26), rgba(0,201,167,0.26))",
                                    borderColor: "rgba(58,134,255,0.95)",
                                    boxShadow: "0 0 20px rgba(58,134,255,0.45)",
                                }}
                            >
                                <p className="font-[Heebo] text-[14px] md:text-[15px] text-white/90">
                                    ארבעה שלבים חדים, מרעיון לאתר שעובד בשבילך.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            variants={subtitleEnter}
                            initial="hidden"
                            animate={headerInView ? "show" : "hidden"}
                            className="flex justify-center"
                        >
                            <div
                                className="inline-flex items-center justify-center text-center border rounded-3xl"
                                style={{
                                    padding: "0.3rem 1rem",
                                    background:
                                        "linear-gradient(135deg, rgba(58,134,255,0.26), rgba(0,201,167,0.26))",
                                    borderColor: "rgba(58,134,255,0.95)",
                                    boxShadow: "0 0 20px rgba(58,134,255,0.45)",
                                }}
                            >
                                <p className="font-[Heebo] text-[14px] md:text-[15px] text-white/90">
                                    ארבעה שלבים חדים, מרעיון לאתר שעובד בשבילך.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    <div ref={triggerRef} aria-hidden className="h-1" />
                </div>

                <div aria-hidden className="h-8 md:h-10" />

                {reduced ? (
                    <div className="relative flex flex-col items-center max-w-3xl mx-auto">
                        {steps.map((s, i) => (
                            <div key={s.title} className="flex flex-col items-center w-full">
                                <FloatingStep
                                    index={i}
                                    title={s.title}
                                    desc={s.desc}
                                    ringFrom={ringFrom}
                                    ringTo={ringTo}
                                    reduced
                                />
                                {i < steps.length - 1 && (
                                    <Connector ringFrom={ringFrom} ringTo={ringTo} reduced />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="relative flex flex-col items-center max-w-3xl mx-auto"
                        variants={stepsContainer}
                        initial="hidden"
                        animate={controls}
                        custom={dirState}
                    >
                        {steps.map((s, i) => (
                            <div key={s.title} className="flex flex-col items-center w-full">
                                <FloatingStep
                                    index={i}
                                    title={s.title}
                                    desc={s.desc}
                                    ringFrom={ringFrom}
                                    ringTo={ringTo}
                                    reduced={false}
                                />
                                {i < steps.length - 1 && (
                                    <Connector ringFrom={ringFrom} ringTo={ringTo} reduced={false} />
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>

            <style>{`
                .hide-inner-scrollbars,
                .hide-inner-scrollbars * {
                    scrollbar-width: none;
                }
                .hide-inner-scrollbars::-webkit-scrollbar,
                .hide-inner-scrollbars *::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                    display: none;
                }
                .yma-flow{
                    background-size: 100% 220%;
                    animation: ymaFlowDown 10.5s linear infinite;
                    will-change: background-position;
                }
                @keyframes ymaFlowDown{
                    0%{ background-position: 50% 0%; }
                    100%{ background-position: 50% 220%; }
                }
            `}</style>
        </section>
    );
}

function FloatingStep({
    index,
    title,
    desc,
    ringFrom,
    ringTo,
    reduced,
}: {
    index: number;
    title: string;
    desc: string;
    ringFrom: string;
    ringTo: string;
    reduced: boolean;
}) {
    const blocks = desc
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean)
        .map((b) => b.split(".").map((s) => s.trim()).filter(Boolean));

    const iconSrc =
        index === 0
            ? "/icons/planet.png"
            : index === 1
                ? "/icons/planet2.png"
                : index === 2
                    ? "/icons/planet3.png"
                    : "/icons/planet4.png";

    const iconPositionStyle =
        index % 2 === 0 ? { top: "24px", left: "6%" } : { top: "24px", right: "6%" };

    const question = stepQuestions[index] ?? "מה קורה בשלב הזה בפועל?";

    const inner = (
        <>
            <ProcessOrbits
                src={iconSrc}
                className="absolute w-12 h-12 md:w-16 md:h-16 opacity-30"
                style={iconPositionStyle}
            />

            <div className="inline-block max-w-full">
                <h3 className="font-[Heebo] text-xl md:text-2xl font-extrabold tracking-tight text-white inline-block">
                    {title}
                </h3>
                <div
                    className="mt-2 h-[2px] w-full rounded-full opacity-95"
                    style={{
                        backgroundImage: `linear-gradient(90deg,
                            rgba(255,46,126,0) 0%,
                            ${ringFrom} 25%,
                            ${ringTo} 75%,
                            rgba(255,119,69,0) 100%)`,
                        boxShadow: "0 0 10px rgba(230,31,116,0.28)",
                    }}
                />
            </div>

            <div className="flex justify-center mt-4">
                <div className="relative w-full max-w-xl px-3 mx-auto sm:px-4">
                    <p className="font-[Heebo] text-[13px] md:text-[13.5px] text-white/60 mb-1.5 text-center">
                        {question}
                    </p>
                    <div className="relative">
                        <div
                            className="pointer-events-none absolute w-[170px] opacity-[0.32] blur-2xl"
                            style={{
                                top: "-6px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                height: "140px",
                                background:
                                    "radial-gradient(circle at 50% 50%, rgba(162,140,255,0.9) 0, rgba(162,140,255,0.2) 40%, rgba(0,0,0,0) 70%)",
                                mixBlendMode: "screen",
                            }}
                        />
                        <p className="relative z-10 font-[Heebo] text-[14.5px] md:text-[15.5px] leading-7 md:leading-7 text-white/85 text-center">
                            {blocks.map((sentences, bi) => (
                                <span key={`${index}-block-${bi}`}>
                                    {sentences.map((line, j) => (
                                        <span key={`${index}-${bi}-${j}`}>
                                            {line}.
                                            {j < sentences.length - 1 && <br />}
                                        </span>
                                    ))}
                                    {bi < blocks.length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

    if (reduced) {
        return (
            <div className="relative w-full max-w-2xl px-6 pb-3 text-center pt-7 sm:px-10 md:px-6 md:pt-8 md:pb-4">
                {inner}
            </div>
        );
    }

    return (
        <motion.div
            className="relative w-full max-w-2xl px-6 pb-3 text-center pt-7 sm:px-10 md:px-6 md:pt-8 md:pb-4"
            variants={stepEnter}
        >
            {inner}
        </motion.div>
    );
}

function Connector({
    ringFrom,
    ringTo,
    reduced,
}: {
    ringFrom: string;
    ringTo: string;
    reduced: boolean;
}) {
    if (reduced) {
        return (
            <div className="my-8 md:my-10 w-[2px] h-16 md:h-[4.25rem] rounded-full overflow-hidden opacity-95">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `linear-gradient(180deg, ${ringFrom} 0%, ${ringTo} 50%, ${ringFrom} 100%)`,
                        boxShadow: "0 0 14px rgba(230,31,116,0.38)",
                    }}
                />
            </div>
        );
    }

    return (
        <motion.div
            className="my-8 md:my-10 w-[2px] h-16 md:h-[4.25rem] rounded-full overflow-hidden opacity-95"
            variants={connectorEnter}
            style={{ transformOrigin: "top" }}
        >
            <div
                className="w-full h-full yma-flow"
                style={{
                    backgroundImage: `linear-gradient(180deg, ${ringFrom} 0%, ${ringTo} 50%, ${ringFrom} 100%)`,
                    boxShadow: "0 0 14px rgba(230,31,116,0.38)",
                }}
            />
        </motion.div>
    );
}
