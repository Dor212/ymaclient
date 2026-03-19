import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

type PackagesSectionProps = {
    id?: string;
    className?: string;
};

type PackageItem = {
    id: string;
    title: string;
    short: string;
    description: string;
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            delay: 0.08 * i,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const PACKAGES: PackageItem[] = [
    {
        id: "landing",
        title: "דף נחיתה (Landing Page)",
        short: "המסלול המהיר להמרת לידים.",
        description:
            "דף ממוקד מטרה אחת, המעוצב ומתוכנת כדי להפוך גולשים ללקוחות. מתאים לקמפיינים ממומנים ולקידום מוצר או שירות ספציפי. כולל חיבור למערכות איסוף נתונים ואופטימיזציה למהירות שיא.",
    },
    {
        id: "one-page",
        title: "אתר One-Page",
        short: "הסיפור שלכם בעמוד אחד.",
        description:
            "פתרון אלגנטי המציג את כל המידע על העסק בחוויית גלילה רציפה. מושלם לעסקים קטנים ובינוניים שרוצים נוכחות דיגיטלית מרשימה, נגישה ומקצועית מבלי להסתבך במבנה עמודים מורכב.",
    },
    {
        id: "multi-page",
        title: "אתר תדמית רב-עמודים",
        short: "הבית הדיגיטלי המלא שלכם.",
        description:
            "אתר רחב הכולל עמודים נפרדים לשירותים, אודות, בלוג וצור קשר. פיתוח בהתאמה אישית שמאפשר גמישות מלאה בעיצוב ובמבנה, תוך הקפדה על חוויית משתמש (UX) גבוהה וקידום במנועי החיפוש.",
    },
    {
        id: "systems",
        title: "מערכות ניהול ופתרונות סליקה (E-commerce)",
        short: "כלי עבודה בהתאמה אישית.",
        description:
            'פתרונות פיתוח מתקדמים לעסקים שצריכים יותר מאתר. בין אם מדובר בחנות דיגיטלית עם סליקה בטוחה או באזור אדמין אישי לניהול תוכן האתר באופן עצמאי, אנחנו בונים את המערכת בדיוק לפי הצרכים שלכם, ללא פיצ\'רים מיותרים.',
    },
];

const MAINTENANCE: PackageItem = {
    id: "support",
    title: "ליווי ותחזוקה שוטפת",
    short: "שקט נפשי טכנולוגי.",
    description:
        "אנחנו לא רק בונים והולכים. כדי שהאתר יישאר מהיר, מאובטח ומעודכן, אנחנו מציעים ליווי חודשי הכולל אחסון בשרתים מתקדמים, תמיכה טכנית ושדרוגים לפי הצורך. כדי שאתם תוכלו להתמקד בניהול העסק.",
};

function splitTextToLines(text: string) {
    return text
        .replace(/\.\s+/g, ".\n")
        .split("\n")
        .map((part) => part.trim())
        .filter(Boolean);
}

function SentenceLines({
    text,
    className = "",
}: {
    text: string;
    className?: string;
}) {
    const lines = splitTextToLines(text);

    return (
        <p className={className}>
            {lines.map((line, index) => (
                <span
                    key={`${line}-${index}`}
                    className={index === 0 ? "block" : "mt-1 block"}
                >
                    {line}
                </span>
            ))}
        </p>
    );
}

export default function PackagesSection({
    id,
    className,
}: PackagesSectionProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [activePackageId, setActivePackageId] = useState<string | null>(null);
    const [maintenanceOpen, setMaintenanceOpen] = useState(false);

    const activePackage =
        PACKAGES.find((item) => item.id === activePackageId) ?? null;

    useEffect(() => {
        if (!activePackageId) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [activePackageId]);

    useEffect(() => {
        if (!activePackageId) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActivePackageId(null);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [activePackageId]);

    return (
        <>
            <section
                id={id}
                dir="rtl"
                className={`relative z-10 w-full overflow-visible px-4 pb-16 pt-12 md:px-8 md:pb-20 md:pt-14 lg:px-12 lg:pt-16 ${className ?? ""}`}
                style={{ overflowAnchor: "none" }}
            >
                <div className="relative mx-auto max-w-[1320px]">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        custom={0}
                        className="text-center"
                    >
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.34em] text-[#8FE7FF]/80">
                            SOLUTIONS
                        </p>

                        <h2 className="mb-2 text-3xl font-extrabold leading-tight md:text-4xl">
                            <span className="bg-gradient-to-r from-[#FF2E7E] via-[#3A86FF] to-[#FF7745] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(58,134,255,0.32)]">
                                איזה מבנה באמת מתאים לעסק שלכם?
                            </span>
                        </h2>

                        <div className="flex flex-col items-center justify-center gap-2 mb-3">
                            <span className="h-[3px] w-16 rounded-full bg-gradient-to-r from-[#3A86FF] via-[#FF2E7E] to-[#FF7745] shadow-[0_0_16px_rgba(58,134,255,0.65)]" />
                            <span className="h-[1px] w-40 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                        </div>

                        <SentenceLines
                            text="לא כל עסק צריך את אותו סוג אתר. כאן אפשר להבין בצורה ברורה מה ההבדל בין דף ממוקד, אתר תדמית, מערכת מורכבת יותר או ליווי שוטף אחרי העלייה לאוויר."
                            className="mx-auto max-w-3xl text-[13px] leading-relaxed text-white/72 sm:text-sm md:text-[15px]"
                        />
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        custom={1}
                        className="mx-auto mt-5 max-w-[620px] md:mt-6"
                    >
                        <button
                            type="button"
                            onClick={() => setMaintenanceOpen((prev) => !prev)}
                            aria-expanded={maintenanceOpen}
                            className="group relative w-full overflow-hidden rounded-[22px] border border-white/12 px-5 py-3 text-center backdrop-blur-xl transition duration-300 hover:border-[#3A86FF]/40 md:px-6"
                            style={{
                                background:
                                    "linear-gradient(145deg, rgba(8,13,25,0.82), rgba(18,10,24,0.72))",
                                boxShadow:
                                    "0 0 18px rgba(58,134,255,0.08), 0 0 14px rgba(255,46,126,0.08)",
                            }}
                        >
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background:
                                        "radial-gradient(circle at 14% 14%, rgba(58,134,255,0.16), transparent 24%), radial-gradient(circle at 86% 14%, rgba(255,46,126,0.14), transparent 22%), radial-gradient(circle at 50% 100%, rgba(255,119,69,0.08), transparent 24%)",
                                }}
                            />

                            <div className="relative z-10 flex items-center justify-center gap-3">
                                <div className="min-w-0">
                                    <h3 className="text-[15px] font-extrabold text-white sm:text-[16px]">
                                        {MAINTENANCE.title}
                                    </h3>
                                    <SentenceLines
                                        text={MAINTENANCE.short}
                                        className="mt-1 text-[12px] font-medium leading-relaxed text-white/72 sm:text-[13px]"
                                    />
                                </div>

                                <span
                                    className={`shrink-0 text-lg text-white/70 transition duration-300 ${maintenanceOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                >
                                    ˅
                                </span>
                            </div>
                        </button>

                        <AnimatePresence initial={false}>
                            {maintenanceOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 rounded-[24px] border border-white/10 bg-black/20 px-6 py-6 backdrop-blur-md md:mt-5 md:px-8 md:py-7">
                                        <SentenceLines
                                            text={MAINTENANCE.description}
                                            className="mx-auto max-w-[62ch] text-[13px] leading-7 text-white/78 sm:text-[14px] md:text-[15px]"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <div className="h-8 md:h-10" />

                    <div className="md:hidden">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            custom={2}
                            className="mx-auto grid max-w-[340px] grid-cols-2 gap-4 place-items-center"
                        >
                            {PACKAGES.map((pkg) => (
                                <button
                                    key={pkg.id}
                                    type="button"
                                    onClick={() => setActivePackageId(pkg.id)}
                                    className="group relative flex h-[136px] w-[136px] items-center justify-center overflow-hidden rounded-full border border-white/12 px-4 text-center transition duration-300 active:scale-[0.98]"
                                    style={{
                                        background:
                                            "linear-gradient(145deg, rgba(8,13,25,0.82), rgba(18,10,24,0.72))",
                                        backdropFilter: "blur(18px)",
                                        boxShadow:
                                            "0 0 18px rgba(255,46,126,0.10), 0 0 14px rgba(58,134,255,0.08)",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background:
                                                "radial-gradient(circle at 20% 20%, rgba(58,134,255,0.18), transparent 32%), radial-gradient(circle at 82% 16%, rgba(255,46,126,0.14), transparent 26%), radial-gradient(circle at 50% 100%, rgba(255,119,69,0.10), transparent 28%)",
                                        }}
                                    />

                                    <div className="pointer-events-none absolute inset-[9px] rounded-full border border-white/10" />

                                    <div className="relative z-10 flex flex-col items-center justify-center">
                                        <h3 className="text-[11.5px] font-extrabold leading-[1.28] text-white">
                                            {pkg.title}
                                        </h3>
                                        <span className="mt-2 h-[2px] w-10 rounded-full bg-gradient-to-r from-[#3A86FF] via-[#FF2E7E] to-[#FF7745]" />
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4 xl:gap-5">
                        {PACKAGES.map((pkg, index) => (
                            <DesktopPackageOrb
                                key={pkg.id}
                                pkg={pkg}
                                index={index}
                                hovered={hoveredId === pkg.id}
                                onEnter={() => setHoveredId(pkg.id)}
                                onLeave={() => setHoveredId(null)}
                                onClick={() => setActivePackageId(pkg.id)}
                            />
                        ))}
                    </div>

                    <div className="hidden md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-6 lg:hidden">
                        {PACKAGES.map((pkg, index) => (
                            <DesktopPackageOrb
                                key={pkg.id}
                                pkg={pkg}
                                index={index}
                                hovered={hoveredId === pkg.id}
                                onEnter={() => setHoveredId(pkg.id)}
                                onLeave={() => setHoveredId(null)}
                                onClick={() => setActivePackageId(pkg.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {activePackage && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="סגירת חלון"
                            className="fixed inset-0 z-[120] bg-[#050816]/62 backdrop-blur-[10px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActivePackageId(null)}
                        />

                        <div className="fixed inset-0 z-[130] flex items-center justify-center px-4 md:px-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 18 }}
                                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full max-w-[390px] md:max-w-[860px] lg:max-w-[980px]"
                                dir="rtl"
                            >
                                <div
                                    className="relative isolate overflow-hidden rounded-[30px] border border-white/12 text-center backdrop-blur-xl md:rounded-[34px]"
                                    style={{
                                        background:
                                            "linear-gradient(145deg, rgba(8,13,25,0.97), rgba(22,10,29,0.93))",
                                        boxShadow:
                                            "0 0 42px rgba(58,134,255,0.16), 0 0 42px rgba(255,46,126,0.12)",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background:
                                                "radial-gradient(circle at 18% 18%, rgba(58,134,255,0.22), transparent 32%), radial-gradient(circle at 84% 16%, rgba(255,46,126,0.18), transparent 28%), radial-gradient(circle at 50% 100%, rgba(255,119,69,0.12), transparent 30%)",
                                        }}
                                    />

                                    <div className="pointer-events-none absolute inset-[12px] rounded-[24px] border border-white/10 md:inset-[16px] md:rounded-[28px]" />

                                    <button
                                        type="button"
                                        onClick={() => setActivePackageId(null)}
                                        aria-label="סגור"
                                        className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg font-bold text-white/78 transition hover:bg-white/[0.08] active:scale-[0.96] md:left-5 md:top-5"
                                    >
                                        ×
                                    </button>

                                    <div className="relative z-10 px-6 pt-12 pb-7 md:px-12 md:pb-12 md:pt-12 lg:px-16 lg:pb-14">
                                        <h3 className="mx-auto max-w-[15ch] text-[22px] font-extrabold leading-tight text-white md:max-w-none md:text-[32px] lg:text-[36px]">
                                            {activePackage.title}
                                        </h3>

                                        <span
                                            className="mx-auto mt-3 block h-[3px] rounded-full"
                                            style={{
                                                width: "118px",
                                                background:
                                                    "linear-gradient(90deg, #3A86FF 0%, #FF2E7E 55%, #FF7745 100%)",
                                                boxShadow: "0 0 12px rgba(58,134,255,0.35)",
                                            }}
                                        />

                                        <SentenceLines
                                            text={activePackage.short}
                                            className="mt-4 text-[13px] font-semibold leading-relaxed text-white/88 md:mt-5 md:text-[18px]"
                                        />

                                        <div className="mx-auto mt-5 max-w-[68ch] rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-md md:mt-6 md:px-8 md:py-7">
                                            <SentenceLines
                                                text={activePackage.description}
                                                className="text-[13px] leading-7 text-white/76 md:text-[16px] md:leading-8"
                                            />
                                        </div>

                                        <div className="flex flex-wrap items-center justify-center gap-2 mt-5 md:mt-7 md:gap-3">
                                            {PACKAGES.filter(
                                                (item) => item.id !== activePackage.id
                                            ).map((item) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => setActivePackageId(item.id)}
                                                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-bold text-white/70 transition hover:bg-white/[0.08] active:scale-[0.98] md:px-4 md:py-2.5 md:text-[12px]"
                                                >
                                                    {item.title}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

type DesktopPackageOrbProps = {
    pkg: PackageItem;
    index: number;
    hovered: boolean;
    onEnter: () => void;
    onLeave: () => void;
    onClick: () => void;
};

function DesktopPackageOrb({
    pkg,
    index,
    hovered,
    onEnter,
    onLeave,
    onClick,
}: DesktopPackageOrbProps) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            custom={index + 2}
            className="flex items-center justify-center"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <div className="relative flex h-[250px] w-[250px] items-center justify-center xl:h-[270px] xl:w-[270px]">
                <motion.button
                    type="button"
                    onClick={onClick}
                    animate={
                        hovered
                            ? {
                                width: 226,
                                height: 226,
                                scale: 1.03,
                                boxShadow:
                                    "0 0 28px rgba(58,134,255,0.16), 0 0 24px rgba(255,46,126,0.12)",
                            }
                            : {
                                width: 210,
                                height: 210,
                                scale: 1,
                                boxShadow:
                                    "0 0 18px rgba(255,46,126,0.08), 0 0 14px rgba(58,134,255,0.08)",
                            }
                    }
                    transition={{ type: "spring", stiffness: 210, damping: 22 }}
                    className="relative overflow-hidden text-center border rounded-full isolate border-white/12 backdrop-blur-xl"
                    style={{
                        background:
                            "linear-gradient(145deg, rgba(8,13,25,0.90), rgba(18,10,24,0.82))",
                    }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle at 18% 18%, rgba(58,134,255,0.18), transparent 32%), radial-gradient(circle at 84% 16%, rgba(255,46,126,0.15), transparent 28%), radial-gradient(circle at 50% 100%, rgba(255,119,69,0.10), transparent 30%)",
                        }}
                    />

                    <div className="pointer-events-none absolute inset-[10px] rounded-full border border-white/10" />

                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-5">
                        <h3 className="max-w-[13ch] text-[18px] font-extrabold leading-tight text-white xl:text-[19px]">
                            {pkg.title}
                        </h3>

                        <span
                            className="mt-2 h-[3px] rounded-full"
                            style={{
                                width: hovered ? "92px" : "46px",
                                transition: "width 220ms ease",
                                background:
                                    "linear-gradient(90deg, #3A86FF 0%, #FF2E7E 55%, #FF7745 100%)",
                                boxShadow: "0 0 12px rgba(58,134,255,0.35)",
                            }}
                        />

                        <p className="mt-3 text-[11px] font-medium text-white/46">
                            לחצו להסבר
                        </p>
                    </div>
                </motion.button>
            </div>
        </motion.div>
    );
}
