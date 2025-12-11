import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FaqSectionProps = {
    id?: string;
    className?: string;
};

type GroupId = "overview" | "process" | "money" | "ongoing";

type FaqItem = {
    id: number;
    groupId: GroupId;
    question: string;
    answer: string;
};

const ACCENT_FROM = "#4312E8";
const ACCENT_TO = "#E61F74";
const BG = "#020617";
const TEXT_MUTED = "#9CA3AF";

const GROUPS: { id: GroupId; title: string; subtitle: string }[] = [
    {
        id: "overview",
        title: "על Y.M.A והגישה שלי",
        subtitle: "מי אני, למי זה מתאים ומה האתר נותן לעסק שלך."
    },
    {
        id: "process",
        title: "איך נראה התהליך בפועל?",
        subtitle: "מהשיחה הראשונה ועד שהאתר באוויר ומוכן להביא לידים."
    },
    {
        id: "money",
        title: "מחירים ועלויות קבועות",
        subtitle: "כמה זה עולה, מה חד־פעמי ומה נשאר קבוע כל חודש."
    },
    {
        id: "ongoing",
        title: "אחרי שהאתר עלה",
        subtitle: "תחזוקה, שדרוגים ומדידה של תוצאות."
    }
];

const FAQ_ITEMS: FaqItem[] = [
    {
        id: 1,
        groupId: "overview",
        question: "מה זה בעצם Y.M.A – אתרים מותאמים?",
        answer:
            "Y.M.A הוא סטודיו לבניית אתרים מותאמים אישית לעסקים. כל אתר נבנה מאפס, בלי תבניות גנריות, לפי השפה, הקהל והצרכים של העסק שלך – כדי שהאתר יעבוד בשבילך ויביא פניות."
    },
    {
        id: 2,
        groupId: "overview",
        question: "למי השירות מתאים?",
        answer:
            "השירות מתאים לעסקים קטנים ובינוניים, פרילנסרים, נותני שירות, סטודיואים, מטפלים, אמנים וחנויות שרוצות אתר שנראה טוב, ברור, מהיר ומביא לקוחות – בלי כאב ראש טכני."
    },
    {
        id: 3,
        groupId: "overview",
        question: "אילו סוגי אתרים אתה בונה?",
        answer:
            "אני בונה דפי נחיתה לקמפיינים, אתרי תדמית לעסקים, אתרים מלאים עם אזורי תוכן ובלוג, ואתרי חנות עם סליקה, ניהול מוצרים ומלאי – הכל מותאם לצרכים של העסק שלך."
    },
    {
        id: 4,
        groupId: "money",
        question: "כמה עולה לבנות אתר ב-Y.M.A?",
        answer:
            "המחיר משתנה לפי סוג וגודל האתר, אבל לרוב דף נחיתה מתחיל סביב ₪850, אתר עסקי סביב ₪1,800 ואתר מלא עם חנות סביב ₪5,000. אחרי שיחת היכרות קצרה אני בונה הצעה מדויקת שמתאימה אליך."
    },
    {
        id: 5,
        groupId: "money",
        question: "יש עלויות נוספות חוץ מבניית האתר?",
        answer:
            "כמו בכל אתר, יש עלות דומיין ואחסון שנחשבת להוצאה קבועה ויחסית נמוכה. אפשר שאני אטפל בזה עבורך, ואפשר שהכול יהיה על שמך ואני רק אחבר ואגדיר – איך שנוח לך."
    },
    {
        id: 6,
        groupId: "process",
        question: "כמה זמן לוקח לבנות אתר?",
        answer:
            "דף נחיתה בדרך כלל מוכן תוך כשבוע–שבועיים, אתר עסקי תוך כשבועיים–שלושה ואתר מלא עם חנות תוך שלושה–ארבעה שבועות. זה תלוי בכמות התוכן, בקצב העברת החומרים ובכמות השינויים בדרך."
    },
    {
        id: 7,
        groupId: "process",
        question: "איך נראה התהליך מרגע שאנחנו מתחילים?",
        answer:
            "מתחילים בשיחת היכרות והבנת צרכים, עוברים לאפיון קצר ופשוט, משם לעיצוב מותאם אישית, פיתוח האתר, העלאה לשרת, חיבור לדומיין, טפסים ווואטסאפ. בסוף נעשה סיבוב משותף על האתר, נסגור פינות ותקבל הדרכה קצרה."
    },
    {
        id: 8,
        groupId: "process",
        question: "אין לי כמעט טקסטים ותמונות – אפשר עדיין להתחיל?",
        answer:
            "כן. אפשר ללטש טקסטים קיימים, לעזור בניסוח בסיסי לתוכן באתר ולהדריך מה כדאי לצלם או להכין. לא צריך להגיע עם 'ספר מותג' כדי להתחיל – העיקר שנזוז ומשם אפשר לשפר."
    },
    {
        id: 9,
        groupId: "process",
        question: "האם האתר יהיה מותאם למובייל?",
        answer:
            "כל אתר שאני בונה הוא רספונסיבי מלא – מותאם לנייד, לטאבלט ולמחשב. רוב הגולשים נכנסים מהטלפון, אז חוויית מובייל חלקה היא מבחינתי חובה, לא תוספת."
    },
    {
        id: 10,
        groupId: "money",
        question: "מי מטפל בדומיין ואחסון – אתה או אני?",
        answer:
            "אפשר שאני ארכוש ואגדיר את הכול על שמך ואדאג לכל ההגדרות, ואפשר שאתה תרכוש דומיין ואחסון ואני רק אחבר ואגדיר. בכל מקרה האתר לא 'כלוא' אצלי והוא רשום על שמך."
    },
    {
        id: 11,
        groupId: "ongoing",
        question: "מה לגבי תחזוקה שוטפת אחרי שהאתר עולה?",
        answer:
            "אני מציע חבילת תחזוקה חודשית שכוללת עדכוני מערכת, גיבויים, בדיקות מהירות ואבטחה ושינויים קטנים באתר. המחיר סביב ₪180 לחודש, אחרי חודש ראשון שבו תקבל ליווי צמוד."
    },
    {
        id: 12,
        groupId: "process",
        question: "אתה מחבר גם לוואטסאפ, טפסים ומיילים?",
        answer:
            "כן. אני מחבר את האתר לטפסי לידים, וואטסאפ, מייל עסקי וכל מה שצריך כדי שכל פניה מהאתר תגיע אליך מסודר, ותוכל לדעת מאיפה כל ליד הגיע."
    },
    {
        id: 13,
        groupId: "process",
        question: "האם האתר נבנה עם בסיס טוב ל-SEO?",
        answer:
            "האתר נבנה עם בסיס חזק ל-SEO: מבנה עמודים נכון, כותרות, קוד נקי, מהירות טעינה טובה ותמיכה בתגיות מטא. אם תרצה ליווי SEO מתקדם יותר (אסטרטגיה, תוכן, מאמרים) אפשר להרחיב בנפרד."
    },
    {
        id: 14,
        groupId: "ongoing",
        question: "איך אני יודע שהאתר באמת עובד ומביא תוצאות?",
        answer:
            "אני מחבר את האתר לכלי מדידה מתאימים ומגדיר המרות על טפסים, כפתורי וואטסאפ ולחצנים חשובים. ככה רואים כמה נכנסו, כמה משאירים פרטים ומה כדאי לשפר בהמשך."
    },
    {
        id: 15,
        groupId: "ongoing",
        question: "מה קורה אם אחרי סיום הפרויקט אני רוצה שינוי קטן?",
        answer:
            "שינויים קטנים אחרי העלייה לאוויר לרוב פותרים בנעימות. אם מדובר בדפים חדשים או אזורים מורחבים, נבנה יחד הצעה מסודרת או נכניס את זה לחבילת התחזוקה – בלי הפתעות."
    }
];

export function FaqSection({ id = "faq", className = "" }: FaqSectionProps) {
    const [activeGroupId, setActiveGroupId] = useState<GroupId>("overview");
    const [openQuestionId, setOpenQuestionId] = useState<number | null>(
        FAQ_ITEMS.find((f) => f.groupId === "overview")?.id ?? null
    );

    const activeFaqs = useMemo(
        () => FAQ_ITEMS.filter((item) => item.groupId === activeGroupId),
        [activeGroupId]
    );

    const handleToggleQuestion = (id: number) => {
        setOpenQuestionId((prev) => (prev === id ? null : id));
    };

    const activeGroup = GROUPS.find((g) => g.id === activeGroupId);

    return (
        <section
            id={id}
            dir="rtl"
            className={`w-full px-4 sm:px-6 py-16 sm:py-20 bg-[${BG}] relative overflow-hidden ${className}`}
        >
            <div className="absolute inset-0 pointer-events-none opacity-60">
                <div className="absolute -top-40 left-[-40px] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_top,_rgba(67,18,232,0.9),_transparent_60%)]" />
                <div className="absolute -bottom-40 right-[-40px] h-96 w-96 rounded-full bg-[radial-gradient(circle_at_bottom,_rgba(230,31,116,0.7),_transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.18),_transparent_70%)]" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1 mx-auto mb-4 border rounded-full border-white/10 bg-white/5 backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#4312E8] to-[#E61F74] shadow-[0_0_16px_rgba(230,31,116,0.9)]" />
                        <span className="text-xs sm:text-sm text-white/70">
                            קודם שתהיה לך תמונה ברורה – ואז בונים
                        </span>
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
                        שאלות נפוצות על{" "}
                        <span className="bg-gradient-to-r from-[#4312E8] to-[#E61F74] bg-clip-text text-transparent">
                            Y.M.A – אתרים מותאמים
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto mt-3 text-sm sm:text-base text-white/60">
                        זה המקום להבין בדיוק מה אתה מקבל, איך נראה התהליך ואיפה אתה עומד אחרי שהאתר עולה לאוויר.
                    </p>
                </motion.div>

                <div className="mt-8 grid items-start gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="absolute hidden right-6 top-4 bottom-4 md:block">
                            <div className="h-full w-px bg-[rgba(148,163,184,0.4)]" />
                        </div>
                        <div className="space-y-5">
                            {GROUPS.map((group, index) => {
                                const isActive = group.id === activeGroupId;
                                return (
                                    <button
                                        key={group.id}
                                        type="button"
                                        onClick={() => {
                                            setActiveGroupId(group.id);
                                            const firstInGroup = FAQ_ITEMS.find(
                                                (f) => f.groupId === group.id
                                            );
                                            setOpenQuestionId(firstInGroup?.id ?? null);
                                        }}
                                        className={`relative flex w-full items-center gap-4 text-right transition-transform ${isActive ? "scale-[1.02]" : "hover:scale-[1.01]"
                                            }`}
                                    >
                                        <div className="relative flex flex-col items-center flex-shrink-0 md:items-end">
                                            <div className="hidden h-2 md:block" />
                                            <motion.div
                                                className="flex items-center justify-center border rounded-full shadow-sm"
                                                style={{
                                                    borderColor: isActive
                                                        ? ACCENT_TO
                                                        : "rgba(148,163,184,0.7)",
                                                    background: isActive
                                                        ? `radial-gradient(circle at top, ${ACCENT_FROM}, ${ACCENT_TO})`
                                                        : "rgba(15,23,42,0.9)",
                                                    width: isActive ? 32 : 26,
                                                    height: isActive ? 32 : 26,
                                                    boxShadow: isActive
                                                        ? "0 0 22px rgba(230,31,116,0.9)"
                                                        : "0 8px 18px rgba(15,23,42,0.7)"
                                                }}
                                                layout
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 20
                                                }}
                                            >
                                                <span className="text-xs font-semibold text-white">
                                                    {index + 1}
                                                </span>
                                            </motion.div>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p className="text-sm font-medium text-white sm:text-base">
                                                {group.title}
                                            </p>
                                            <p className="mt-1 text-xs sm:text-sm text-white/60">
                                                {group.subtitle}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        key={activeGroupId}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45 }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7 shadow-[0_24px_70px_rgba(15,23,42,0.9)] backdrop-blur-xl"
                    >
                        <div className="flex items-center justify-between gap-3 mb-5">
                            <div className="text-right">
                                <p className="text-[11px] font-semibold tracking-wide" style={{ color: TEXT_MUTED }}>
                                    אזור בשיחה שלנו
                                </p>
                                <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl">
                                    {activeGroup?.title}
                                </h3>
                                <p className="mt-1 text-xs sm:text-sm text-white/60">
                                    {activeGroup?.subtitle}
                                </p>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-[10px]" style={{ color: TEXT_MUTED }}>
                                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#4312E8] to-[#E61F74] shadow-[0_0_16px_rgba(230,31,116,0.9)]" />
                                <span>לחיצה על שורה תפתח את התשובה</span>
                            </div>
                        </div>

                        <div className="mt-2 space-y-3">
                            <AnimatePresence initial={false}>
                                {activeFaqs.map((item) => {
                                    const isOpen = item.id === openQuestionId;
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            className={`rounded-2xl border ${isOpen
                                                    ? "border-[rgba(230,31,116,0.7)] bg-black/40 shadow-[0_18px_45px_rgba(15,23,42,0.85)]"
                                                    : "border-white/10 bg-black/30 hover:bg-black/40"
                                                }`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => handleToggleQuestion(item.id)}
                                                className="flex w-full items-center justify-between px-5 sm:px-6 py-3.5"
                                            >
                                                <div className="flex-1 max-w-2xl mx-auto text-right">
                                                    <span className="text-sm font-medium text-white sm:text-base">
                                                        {item.question}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-transform ${isOpen
                                                            ? "bg-[rgba(230,31,116,0.18)] text-[rgba(248,250,252,0.95)] rotate-180"
                                                            : "bg-white/10 text-white/70"
                                                        }`}
                                                >
                                                    ˇ
                                                </span>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        key="content"
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.22 }}
                                                    >
                                                        <div className="px-5 pb-4 sm:px-6 sm:pb-5">
                                                            <p
                                                                className="max-w-2xl mx-auto text-xs leading-relaxed text-right sm:text-sm"
                                                                style={{ color: TEXT_MUTED }}
                                                            >
                                                                {item.answer}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
