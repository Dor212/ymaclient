import { useState, type TouchEvent } from "react";
import { motion } from "framer-motion";
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
        suits: "לעסקים ויזמים שרוצים עמוד אחד מרוכז להצגת שירות, מוצר או קמפיין, בלי להסתבך עם אתר גדול.",
        features: [
            "Hero ראשי מעוצב ברמה גבוהה",
            "תוכן שיווקי ממוקד ו-CTA ברור",
            "טופס לידים או כפתור WhatsApp בולט",
            "התאמה מלאה למובייל ולמחשב (Responsive)",
            "חיבור לדומיין שלכם + אבטחת SSL",
        ],
        time: "כ־7 ימי עבודה.",
        noteTitle: "חשוב לדעת",
        note: "המחיר אינו כולל רכישת דומיין ואחסון, אך נלווה אתכם בבחירת הספק וההגדרות, כדי שהכול יהיה פשוט, ברור ושקוף.",
    },
    {
        id: "business",
        name: "אתר תדמית",
        price: "₪1,800",
        subtitle: "נוכחות דיגיטלית מלאה שמציגה את העסק בצורה מקצועית.",
        suits: "לעסקים, יועצים, נותני שירות וחברות קטנות–בינוניות שרוצים אתר שמסביר מי הם, מה הם עושים ולמה לבחור דווקא בהם.",
        features: [
            "אתר תדמית מלא הכולל 3–6 עמודים (הכמות משתנה לפי אופי העסק והפרויקט)",
            "עיצוב מודרני ומותאם אישית שמשדר אמינות ומקצועיות",
            "התאמה מלאה לנייד ולמחשב (Responsive)",
            "טפסי יצירת קשר חכמים עם ולידציה, מפה וקישורים לרשתות החברתיות",
            "עמודי חובה: תנאי שימוש, מדיניות פרטיות ונגישות",
            "SEO בסיסי: Meta Tags, Sitemap, Robots להגברת הנראות בגוגל",
            "חיבור לדומיין שלכם + אבטחת SSL",
        ],
        time: "כ־2–3 שבועות – תלוי גם בקצב שיתוף הפעולה והעברת החומרים מצדכם.",
        noteTitle: "כולל תחזוקה",
        note: "חודש תחזוקה מלא מתנה. לאחר מכן ניתן להצטרף לתחזוקה שוטפת – ₪180 לחודש (אחסון, גיבויים, עדכוני אבטחה ותמיכה טכנית).",
        from: true,
    },
    {
        id: "shop",
        name: "אתר עם חנות אונליין",
        price: "₪5,000",
        subtitle: "גם תדמית מקצועית, גם חנות פעילה או ניהול עצמי של התוכן.",
        suits: "לעסקים שרוצים גם להציג את העסק בצורה מקצועית וגם לנהל לבד תכנים, מוצרים והזמנות – או להפעיל חנות אונליין מלאה.",
        features: [
            "אתר תדמית מלא (בית, אודות, שירותים, יצירת קשר ועוד)",
            "מערכת ניהול תוכן (Admin Panel) לניהול עצמאי של טקסטים, גלריות ותמונות",
            "חנות אונליין: קטלוג מוצרים, עגלת קניות ותהליך רכישה מלא",
            "סליקה מאובטחת (כרטיס אשראי + Bit, בהתאם לחיבור לספק הסליקה)",
            "מערכת ניהול הזמנות, מעקב מלאי, עמודי מבצעים וקופונים",
            "התאמה מלאה למובייל ולמחשב, ביצועים גבוהים ואבטחה מתקדמת",
            "חיבור לדומיין שלכם + אבטחת SSL",
        ],
        time: "כ־4–6 שבועות – בהתאם להיקף החנות, המערכת והמעורבות שלכם בתהליך.",
        noteTitle: "כולל תחזוקה",
        note: "חודש תחזוקה מלא מתנה. לאחר מכן אפשר להצטרף לתחזוקה שוטפת – ₪180 לחודש (אחסון, גיבויים, עדכוני אבטחה ותמיכה).",
        from: true,
    },
];

export default function PackagesSection({ id, className }: PackagesSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % PACKAGES.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? PACKAGES.length - 1 : prev - 1));
    };

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

    return (
        <section
            id={id}
            className={`w-full py-16 md:py-24 px-4 md:px-8 lg:px-12 ${className ?? ""}`}
            dir="rtl"
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ margin: "-80px" }}
                    className="text-center"
                >
                    <h2 className="mb-3 text-3xl font-extrabold md:text-4xl">
                        <span className="bg-gradient-to-r from-[#FF2E7E] via-[#FF7745] to-[#FF2E7E] bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(255,46,126,0.65)]">
                            בוחרים את החבילה שהכי מתאימה לעסק
                        </span>
                    </h2>

                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="h-[1px] w-20 md:w-28 rounded-full bg-gradient-to-l from-transparent via-[#3A86FF] to-transparent opacity-70" />
                        <span className="w-10 md:w-14 h-[3px] rounded-full bg-gradient-to-r from-[#3A86FF] to-[#00C9A7] shadow-[0_0_16px_rgba(58,134,255,0.85)]" />
                        <span className="h-[1px] w-20 md:w-28 rounded-full bg-gradient-to-r from-transparent via-[#00C9A7] to-transparent opacity-70" />
                    </div>

                    <p className="text-sm md:text-base text-white/75 max-w-2xl mx-auto leading-[1.25]">
                        כל חבילה נבנית בקוד מותאם אישית, עם ביצועים גבוהים,
                        <br />
                        אבטחה ותכנון חוויית משתמש שמכוון לתוצאות – לא סתם "עוד אתר".
                    </p>
                </motion.div>

                <div className="h-12 md:h-16 lg:h-20" />

                <div className="md:hidden">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ margin: "-80px" }}
                        className="flex justify-center px-4"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="w-11/12 max-w-md">
                            <PackageCard pkg={PACKAGES[activeIndex]} />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ margin: "-80px" }}
                        className="flex items-center justify-center gap-4"
                        style={{ marginTop: "1.1rem", marginBottom: "2rem" }}
                    >
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="flex items-center justify-center w-8 h-8 text-xs transition border rounded-full border-white/20 text-white/80 hover:border-white/60 hover:bg-white/5"
                        >
                            ‹
                        </button>
                        <div className="flex gap-2">
                            {PACKAGES.map((pkg, index) => (
                                <button
                                    key={pkg.id}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2.5 rounded-full transition-all ${index === activeIndex
                                            ? "w-6 bg-gradient-to-r from-[#FF2E7E] to-[#FF7745] shadow-[0_0_16px_rgba(255,46,126,0.7)]"
                                            : "w-2.5 bg-white/20"
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex items-center justify-center w-8 h-8 text-xs transition border rounded-full border-white/20 text-white/80 hover:border-white/60 hover:bg-white/5"
                        >
                            ›
                        </button>
                    </motion.div>
                </div>

                <div className="items-start hidden gap-6 md:grid md:grid-cols-3 lg:gap-8">
                    {PACKAGES.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ margin: "-80px" }}
                            custom={index}
                            className="flex justify-center"
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
};

function PackageCard({ pkg }: PackageCardProps) {
    const isFrom = !!pkg.from;

    return (
        <div
            className="relative flex flex-col w-full max-w-md mx-auto border rounded-3xl"
            style={{
                padding: "2.1rem 1.9rem 1.7rem",
                background:
                    "linear-gradient(135deg, rgba(9,9,15,0.9), rgba(24,9,30,0.95))",
                borderColor: "rgba(255,119,69,0.95)",
                boxShadow: "0 0 28px rgba(255,119,69,0.45)",
                borderWidth: "2px",
            }}
        >
            {pkg.id === "landing" && (
                <div className="absolute -top-4 left-4 -rotate-6">
                    <div
                        className="inline-flex items-center justify-center text-center border rounded-3xl font-[Heebo] text-[13px] md:text-[14px] text-white/90"
                        style={{
                            padding: "0.35rem 1.2rem",
                            background: "linear-gradient(135deg, #3A86FF, #00C9A7)",
                            borderColor: "rgba(58,134,255,0.95)",
                            boxShadow: "0 0 22px rgba(58,134,255,0.65)",
                        }}
                    >
                        {pkg.price}
                    </div>


                </div>
            )}

            <div className="flex flex-col max-w-xs mx-auto text-center sm:max-w-sm gap-7">
                <div className="flex flex-col items-center gap-1.5 text-center">
                    <h3 className="text-xl font-bold text-white md:text-2xl">
                        {pkg.name}
                    </h3>

                    <div className="flex items-center justify-center w-full max-w-[220px] gap-1">
                        <span className="h-[1px] flex-1 rounded-full bg-gradient-to-l from-transparent via-[#FF2E7E] to-transparent opacity-70" />
                        <span className="w-7 h-[3px] rounded-full bg-gradient-to-r from-[#FF2E7E] to-[#FF7745] shadow-[0_0_10px_rgba(255,46,126,0.9)]" />
                        <span className="h-[1px] flex-1 rounded-full bg-gradient-to-r from-transparent via-[#FF7745] to-transparent opacity-70" />
                    </div>

                    <p className="mt-1 text-sm leading-relaxed text-white/80">
                        {pkg.subtitle}
                    </p>
                </div>

                <div className="flex flex-col gap-8 text-sm">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-xs font-semibold text-center text-white/70">
                                למי זה מתאים?
                            </p>
                            <span className="w-10 h-[1px] rounded-full bg-gradient-to-r from-[#FF2E7E] to-[#FF7745] opacity-60" />
                        </div>
                        <p className="text-sm leading-snug text-center text-white/85">
                            {pkg.suits}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-xs font-semibold text-center text-white/70">
                                מה תקבלו?
                            </p>
                            <span className="w-10 h-[1px] rounded-full bg-gradient-to-r from-[#3A86FF] to-[#00C9A7] opacity-70" />
                        </div>
                        <ul className="flex flex-col gap-1.5 text-sm text-white/85 leading-snug">
                            {pkg.features.map((feature) => (
                                <li key={feature} className="text-center">
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-xs font-semibold text-center text-white/70">
                                זמן הקמה
                            </p>
                            <span className="w-10 h-[1px] rounded-full bg-gradient-to-r from-[#FF2E7E] to-[#FF7745] opacity-60" />
                        </div>
                        <p className="text-sm leading-snug text-center text-white/85">
                            {pkg.time}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-xs font-semibold text-center text-white/70">
                                {pkg.noteTitle}
                            </p>
                            <span className="w-10 h-[1px] rounded-full bg-gradient-to-r from-[#FF2E7E] to-[#FF7745] opacity-60" />
                        </div>
                        <p className="text-sm leading-snug text-center text-white/85">
                            {pkg.note}
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="flex flex-col items-center border-t border-white/15"
                style={{
                    marginTop: "2.8rem",
                    paddingTop: "2rem",
                    paddingBottom: "0.35rem",
                    rowGap: "1.6rem",
                    width: "100%",
                }}
            >
                {!isFrom && pkg.id !== "landing" && (
                    <div className="px-7 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF2E7E] to-[#FF7745] text-sm font-bold text-white shadow-[0_0_18px_rgba(255,46,126,0.7)] tracking-wide">
                        {pkg.price}
                    </div>
                )}

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 text-center border rounded-3xl font-[Heebo] text-[14px] md:text-[15px] text-white/90 transition-all hover:shadow-[0_0_26px_rgba(58,134,255,0.7)]"
                    style={{
                        padding: "0.45rem 1.6rem",
                        background:
                            "linear-gradient(135deg, rgba(58,134,255,0.26), rgba(0,201,167,0.26))",
                        borderColor: "rgba(58,134,255,0.95)",
                        boxShadow: "0 0 20px rgba(58,134,255,0.5)",
                    }}
                >
                    <FaWhatsapp className="text-lg" />
                    <span>נשמע טוב</span>
                </button>

                {isFrom && (
                    <p
                        className="text-center"
                        style={{
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.45)",
                            marginTop: "0.05rem",
                        }}
                    >
                        החל מ־ {pkg.price}
                    </p>
                )}
            </div>
        </div>
    );
}
