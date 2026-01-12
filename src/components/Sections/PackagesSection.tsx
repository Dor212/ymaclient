import { useState, type TouchEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

type PackagesSectionProps = {
    id?: string;
    className?: string;
};

type Package = {
    id: string;
    name: string;
    price: string;
    subtitle: string;
    suits: string;
    features: string[];
    time: string;
    noteTitle: string;
    note: string;
    from?: boolean;
};

const WA_PHONE = "972000000000";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.12 * i,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const PACKAGES: Package[] = [
    {
        id: "landing",
        name: "דף נחיתה",
        price: "₪850",
        subtitle: "עמוד אחד ממוקד ללידים וקמפיינים.",
        suits:
            "לעסקים ויזמים שרוצים עמוד אחד מרוכז להצגת שירות, מוצר או קמפיין, בלי להסתבך עם אתר גדול.",
        features: [
            "Hero ראשי מעוצב ברמה גבוהה",
            "תוכן שיווקי ממוקד ו CTA ברור",
            "טופס לידים או כפתור WhatsApp בולט",
            "התאמה מלאה למובייל ולמחשב (Responsive)",
            "חיבור לדומיין שלכם + אבטחת SSL",
        ],
        time: "כ 7 ימי עבודה.",
        noteTitle: "חשוב לדעת",
        note: "המחיר אינו כולל רכישת דומיין ואחסון. נלווה אתכם בבחירת הספק וההגדרות כדי שהכול יהיה פשוט, ברור ושקוף.",
    },
    {
        id: "business",
        name: "אתר תדמית",
        price: "₪1,800",
        subtitle: "נוכחות דיגיטלית מלאה שמציגה את העסק בצורה מקצועית.",
        suits:
            "לעסקים, יועצים, נותני שירות וחברות קטנות בינוניות שרוצים אתר שמסביר מי הם, מה הם עושים ולמה לבחור דווקא בהם.",
        features: [
            "אתר תדמית מלא הכולל 3–6 עמודים (הכמות משתנה לפי אופי העסק והפרויקט)",
            "עיצוב מודרני ומותאם אישית שמשדר אמינות ומקצועיות",
            "התאמה מלאה לנייד ולמחשב (Responsive)",
            "טפסי יצירת קשר חכמים עם ולידציה, מפה וקישורים לרשתות החברתיות",
            "עמודי חובה: תנאי שימוש, מדיניות פרטיות ונגישות",
            "SEO בסיסי: Meta Tags, Sitemap, Robots להגברת הנראות בגוגל",
            "חיבור לדומיין שלכם + אבטחת SSL",
        ],
        time: "כ 2–3 שבועות, תלוי גם בקצב שיתוף הפעולה והעברת החומרים מצדכם.",
        noteTitle: "כולל תחזוקה",
        note: "חודש תחזוקה מלא מתנה. לאחר מכן ניתן להצטרף לתחזוקה שוטפת, ₪180 לחודש (אחסון, גיבויים, עדכוני אבטחה ותמיכה טכנית).",
        from: true,
    },
    {
        id: "shop",
        name: "אתר עם חנות אונליין",
        price: "₪5,000",
        subtitle: "גם תדמית מקצועית, גם חנות פעילה או ניהול עצמי של התוכן.",
        suits:
            "לעסקים שרוצים גם להציג את העסק בצורה מקצועית וגם לנהל לבד תכנים, מוצרים והזמנות, או להפעיל חנות אונליין מלאה.",
        features: [
            "אתר תדמית מלא (בית, אודות, שירותים, יצירת קשר ועוד)",
            "מערכת ניהול תוכן (Admin Panel) לניהול עצמאי של טקסטים, גלריות ותמונות",
            "חנות אונליין: קטלוג מוצרים, עגלת קניות ותהליך רכישה מלא",
            "סליקה מאובטחת (כרטיס אשראי + Bit, בהתאם לחיבור לספק הסליקה)",
            "מערכת ניהול הזמנות, מעקב מלאי, עמודי מבצעים וקופונים",
            "התאמה מלאה למובייל ולמחשב, ביצועים גבוהים ואבטחה מתקדמת",
            "חיבור לדומיין שלכם + אבטחת SSL",
        ],
        time: "כ 4–6 שבועות, בהתאם להיקף החנות, המערכת והמעורבות שלכם בתהליך.",
        noteTitle: "כולל תחזוקה",
        note: "חודש תחזוקה מלא מתנה. לאחר מכן אפשר להצטרף לתחזוקה שוטפת, ₪180 לחודש (אחסון, גיבויים, עדכוני אבטחה ותמיכה).",
        from: true,
    },
];

function clamp(lines: number) {
    return {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical" as const,
        WebkitLineClamp: lines,
        overflow: "hidden",
    };
}

export default function PackagesSection({ id, className }: PackagesSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % PACKAGES.length);
    const handlePrev = () =>
        setActiveIndex((prev) => (prev === 0 ? PACKAGES.length - 1 : prev - 1));

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
        if (touchStartX === null) return;
        const endX = e.changedTouches[0].clientX;
        const delta = endX - touchStartX;

        if (Math.abs(delta) > 50) {
            if (delta < 0) handleNext();
            else handlePrev();
        }

        setTouchStartX(null);
    };

    const activePkg = PACKAGES[activeIndex];

    return (
        <section
            id={id}
            className={`relative z-10 w-full pt-16 pb-24 md:pt-24 md:pb-32 px-4 md:px-8 lg:px-12 ${className ?? ""}`}
            dir="rtl"
            style={{ overflowAnchor: "none" }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={0}
                    className="text-center"
                >
                    <h2 className="mb-3 text-3xl font-extrabold leading-tight md:text-4xl">
                        <span className="bg-gradient-to-r from-[#FF2E7E] via-[#FF7745] to-[#FF2E7E] bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(255,46,126,0.65)]">
                            בוחרים את החבילה שהכי מתאימה לעסק
                        </span>
                    </h2>

                    <div className="flex flex-col items-center justify-center gap-2 mb-4">
                        <span className="w-14 h-[3px] rounded-full bg-gradient-to-r from-[#3A86FF] to-[#00C9A7] shadow-[0_0_16px_rgba(58,134,255,0.85)]" />
                        <span className="h-[1px] w-40 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </div>

                    <p className="text-[13px] sm:text-sm md:text-base text-white/75 max-w-2xl mx-auto leading-relaxed">
                        כל חבילה נבנית בקוד מותאם אישית, עם ביצועים גבוהים, אבטחה ותכנון חוויית משתמש שמכוון לתוצאות.
                    </p>
                </motion.div>

                <div className="h-10 md:h-16" />

                <div className="md:hidden">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={1}
                        className="flex justify-center"
                    >
                        <motion.div
                            layout
                            className="relative w-full max-w-[430px]"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            style={{ overflowAnchor: "none" }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={activePkg.id}
                                    layout
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <PackageCard pkg={activePkg} compact />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={2}
                        className="flex items-center justify-center"
                        style={{ marginTop: "1.05rem", marginBottom: "1.8rem" }}
                    >
                        <div className="flex gap-2">
                            {PACKAGES.map((pkg, index) => (
                                <button
                                    key={pkg.id}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`מעבר לחבילה ${index + 1}`}
                                    className={`h-2.5 rounded-full transition-all ${index === activeIndex
                                            ? "w-7 bg-gradient-to-r from-[#FF2E7E] to-[#FF7745] shadow-[0_0_16px_rgba(255,46,126,0.7)]"
                                            : "w-2.5 bg-white/20"
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="items-stretch hidden gap-6 md:grid md:grid-cols-3 lg:gap-8">
                    {PACKAGES.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={index}
                            className="flex"
                        >
                            <PackageCard pkg={pkg} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

type PackageCardProps = {
    pkg: Package;
    compact?: boolean;
};

function PackageCard({ pkg, compact }: PackageCardProps) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative flex flex-col w-full overflow-hidden border rounded-3xl"
            style={{
                background: "linear-gradient(135deg, rgba(9,9,15,0.74), rgba(24,9,30,0.86))",
                borderColor: "rgba(255,255,255,0.12)",
                boxShadow: "0 0 28px rgba(255,46,126,0.20)",
            }}
        >
            <div className={compact ? "p-4" : "p-5 sm:p-6"}>
                <div className="text-center">
                    <h3
                        className={`${compact ? "text-[18px]" : "text-[18px] sm:text-[20px]"
                            } font-extrabold text-white leading-tight`}
                    >
                        {pkg.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-center w-full max-w-[240px] mx-auto gap-1">
                        <span className="h-[1px] flex-1 rounded-full bg-gradient-to-l from-transparent via-[#FF2E7E] to-transparent opacity-70" />
                        <span className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#FF2E7E] to-[#FF7745] shadow-[0_0_10px_rgba(255,46,126,0.9)]" />
                        <span className="h-[1px] flex-1 rounded-full bg-gradient-to-r from-transparent via-[#FF7745] to-transparent opacity-70" />
                    </div>

                    <p
                        className={`${compact ? "mt-2 text-[13px]" : "mt-3 text-[13px] sm:text-[14px]"
                            } leading-relaxed text-white/78 mx-auto max-w-[26rem]`}
                        style={compact ? clamp(2) : undefined}
                    >
                        {pkg.subtitle}
                    </p>
                </div>

                <div className={compact ? "mt-4 grid gap-3" : "mt-5 grid gap-4"}>
                    <InfoBlock title="למי זה מתאים?" compact={compact}>
                        <p
                            className={`${compact ? "text-[13px]" : "text-[13.5px] sm:text-[14px]"
                                } leading-relaxed text-white/82 text-center`}
                            style={compact ? clamp(3) : undefined}
                        >
                            {pkg.suits}
                        </p>
                    </InfoBlock>

                    {compact ? (
                        <AccordionBlock
                            title="מה תקבלו?"
                            open={open}
                            onToggle={() => setOpen((v) => !v)}
                            compact
                            preview={
                                <ul className="grid gap-2 text-[13px] leading-relaxed text-white/82 text-center">
                                    {pkg.features.slice(0, 2).map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                            }
                        >
                            <ul className="grid gap-2 text-[13px] leading-relaxed text-white/82 text-center">
                                {pkg.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </AccordionBlock>
                    ) : (
                        <InfoBlock title="מה תקבלו?" compact={compact}>
                            <ul className="grid gap-2 text-[13.5px] sm:text-[14px] leading-relaxed text-white/82 text-center">
                                {pkg.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </InfoBlock>
                    )}

                    <NotesStack
                        time={pkg.time}
                        noteTitle={pkg.noteTitle}
                        note={pkg.note}
                        compact={compact}
                    />
                </div>
            </div>

            <div className={`mt-auto border-t border-white/10 ${compact ? "p-4" : "p-5 sm:p-6"}`}>
                <a
                    href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
                        `היי דור, אשמח לשמוע עוד על החבילה: ${pkg.name}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-[14px] sm:text-[15px] font-extrabold text-white/90 transition active:scale-[0.99]"
                    style={{
                        background: "linear-gradient(135deg, rgba(58,134,255,0.24), rgba(0,201,167,0.24))",
                        borderColor: "rgba(58,134,255,0.65)",
                        boxShadow: "0 0 22px rgba(58,134,255,0.30)",
                    }}
                >
                    <FaWhatsapp className="text-lg" />
                    <span>נשמע טוב, דבר איתי</span>
                </a>

                <p className="mt-3 text-center text-[11px] text-white/45">
                    אפשר גם רק לשאול שאלה, בלי התחייבות.
                </p>
            </div>
        </div>
    );
}

function SectionHeader({ title, compact }: { title: string; compact?: boolean }) {
    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <p className={`${compact ? "text-[11.5px]" : "text-[12px]"} font-extrabold text-white/70`}>
                {title}
            </p>
            <span className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#FF2E7E] to-[#FF7745] shadow-[0_0_12px_rgba(255,46,126,0.55)]" />
        </div>
    );
}

function InfoBlock({
    title,
    children,
    compact,
}: {
    title: string;
    children: ReactNode;
    compact?: boolean;
}) {
    return (
        <div
            className={`rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md ${compact ? "p-3" : "p-4"
                }`}
        >
            <SectionHeader title={title} compact={compact} />
            <div className="mt-3">{children}</div>
        </div>
    );
}

function AccordionBlock({
    title,
    open,
    onToggle,
    preview,
    children,
    compact,
}: {
    title: string;
    open: boolean;
    onToggle: () => void;
    preview: ReactNode;
    children: ReactNode;
    compact?: boolean;
}) {
    return (
        <div
            className={`rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md ${compact ? "p-3" : "p-4"
                }`}
        >
            <SectionHeader title={title} compact={compact} />

            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-[12px] font-extrabold text-white/85 transition active:scale-[0.99]"
                style={{
                    background: "linear-gradient(135deg, rgba(58,134,255,0.16), rgba(0,201,167,0.16))",
                    borderColor: "rgba(255,255,255,0.12)",
                }}
            >
                <span>{open ? "סגור פירוט" : "הצג פירוט"}</span>
                <span className={`transition ${open ? "rotate-180" : "rotate-0"}`}>˅</span>
            </button>

            <div className="mt-3">
                {!open && <div>{preview}</div>}

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="pt-1">{children}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function NotesStack({
    time,
    noteTitle,
    note,
    compact,
}: {
    time: string;
    noteTitle: string;
    note: string;
    compact?: boolean;
}) {
    return (
        <div
            className={`rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md ${compact ? "px-3 py-3" : "px-4 py-3.5"
                }`}
        >
            <SectionHeader title="הערות" compact={compact} />

            <p
                className={`mt-3 ${compact ? "text-[11.5px]" : "text-[12px]"} leading-relaxed text-white/58 text-center`}
                style={compact ? clamp(2) : undefined}
            >
                <span className="font-extrabold text-white/72">זמן הקמה:</span> {time}
            </p>

            <p
                className={`mt-2 ${compact ? "text-[11.5px]" : "text-[12px]"} leading-relaxed text-white/58 text-center`}
                style={compact ? clamp(2) : undefined}
            >
                <span className="font-extrabold text-white/72">{noteTitle}:</span> {note}
            </p>
        </div>
    );
}
