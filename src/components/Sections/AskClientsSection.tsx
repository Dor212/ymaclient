import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type AskClientsSectionProps = {
    id?: string;
    className?: string;
};

type ProjectType = "landing" | "business" | "shop" | "other";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PROJECT_OPTIONS: { value: ProjectType; label: string }[] = [
    { value: "other", label: "לא בטוח עדיין" },
    { value: "landing", label: "דף נחיתה" },
    { value: "business", label: "אתר תדמית" },
    { value: "shop", label: "חנות אונליין" },
];

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

export default function AskClientsSection({ id, className = "" }: AskClientsSectionProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [projectType, setProjectType] = useState<ProjectType>("other");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorText, setErrorText] = useState("");
    const [isProjectOpen, setIsProjectOpen] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setStatus("idle");
        setErrorText("");

        try {
            const res = await fetch(`${API_BASE}/api/reference-requests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, email, message, projectType }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("error");
                setErrorText(data?.error || "משהו השתבש, נסו שוב מאוחר יותר.");
            } else {
                setStatus("success");
                setName("");
                setPhone("");
                setEmail("");
                setProjectType("other");
                setMessage("");
            }
        } catch {
            setStatus("error");
            setErrorText("לא הצלחנו להתחבר לשרת. נסו שוב בעוד רגע.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const projectLabel =
        projectType === "landing"
            ? "דף נחיתה"
            : projectType === "business"
                ? "אתר תדמית"
                : projectType === "shop"
                    ? "חנות אונליין"
                    : "לא בטוח עדיין";

    return (
        <section
            id={id}
            dir="rtl"
            className={`relative z-0 w-full max-w-full py-28 md:py-36 ${className}`}
        >
            <div className="max-w-6xl px-5 mx-auto sm:px-6 md:px-8">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    className="text-center"
                >
                    <h2
                        className="font-[Heebo] text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(90deg, #FF2E7E, #FF4477, #FF7745)",
                            textShadow: "0 0 16px rgba(230,31,116,0.28)",
                        }}
                    >
                        דברו עם מי שכבר בנה איתנו אתר
                    </h2>

                    <p className="mt-4 font-[Heebo] text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
                        השאירו פרטים ושאלה קצרה, ואנחנו נעביר את ההודעה שלכם לשני לקוחות אמיתיים שעבדו איתנו.
                        <br />
                        הם יחזרו אליכם ויספרו איך זה נראה מהצד שלהם, בלי פילטרים.
                    </p>
                </motion.div>

                <div aria-hidden className="h-[3.75rem] md:h-[4.5rem]" />

                {/* ✅ Glow אחד מאחורי כל הגריד (במקום "מלבן" לכל כרטיס) */}
                <div className="relative isolate">
                    <div
                        aria-hidden
                        className="absolute pointer-events-none -inset-x-10 -inset-y-24 -z-10 opacity-55 blur-3xl"
                        style={{
                            background:
                                "radial-gradient(circle at 18% 22%, rgba(255,46,126,0.22), transparent 55%)," +
                                "radial-gradient(circle at 82% 28%, rgba(58,134,255,0.22), transparent 55%)," +
                                "radial-gradient(circle at 70% 82%, rgba(0,201,167,0.18), transparent 58%)," +
                                "radial-gradient(circle at 30% 78%, rgba(131,56,236,0.18), transparent 58%)",
                        }}
                    />

                    <div className="grid items-start gap-10 lg:gap-14 lg:grid-cols-2">
                        {/* LEFT CARD */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.25 }}
                            custom={0}
                            className="relative"
                        >
                            <div className="relative flex justify-center px-4 sm:px-0">
                                <div
                                    className="w-full rounded-3xl border border-white/10 bg-black/45 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.65)] flex flex-col gap-6"
                                    style={{
                                        padding: "2.35rem 2.1rem",
                                        // 🔥 אם עדיין רואים "כתם": תוסיף שורה זו
                                        backgroundClip: "padding-box",
                                    }}
                                >
                                    <div className="text-center">
                                        <p className="font-[Heebo] text-sm font-semibold text-white mb-3">
                                            איך זה עובד מאחורי הקלעים
                                        </p>

                                        <div
                                            className="h-[2px] w-full max-w-xs mx-auto rounded-full opacity-95"
                                            style={{
                                                backgroundImage: `
                          linear-gradient(
                            90deg,
                            rgba(255,46,126,0) 0%,
                            rgba(255,46,126,0.95) 20%,
                            rgba(255,119,69,0.95) 80%,
                            rgba(255,119,69,0) 100%
                          )
                        `,
                                                boxShadow: "0 0 12px rgba(230,31,116,0.4)",
                                            }}
                                        />

                                        <p className="mt-4 font-[Heebo] text-[13px] sm:text-sm text-white/75 max-w-md mx-auto leading-snug">
                                            חלק מהלקוחות שלנו הסכימו מדי פעם לענות למתעניינים חדשים.
                                            <br />
                                            כשמתאים להם בזמן, הם חוזרים אליכם ומשתפים בכנות מהחוויה שלהם.
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <div className="relative w-full max-w-xs aspect-square sm:max-w-sm">
                                            {/* טבעות */}
                                            <div className="absolute rounded-full inset-6 sm:inset-7">
                                                <div
                                                    className="w-full h-full rounded-full yma-ring-flow"
                                                    style={{
                                                        borderWidth: "1.5px",
                                                        borderStyle: "solid",
                                                        borderColor: "transparent",
                                                        backgroundImage: `
                              linear-gradient(#050816, #050816),
                              linear-gradient(120deg, #8338EC, #3A86FF, #00C9A7, #3A86FF)
                            `,
                                                        backgroundOrigin: "border-box",
                                                        backgroundClip: "padding-box, border-box",
                                                        backgroundSize: "220% 220%",
                                                        boxShadow: "0 0 18px rgba(58,134,255,0.32)",
                                                    }}
                                                />
                                            </div>

                                            <div className="absolute rounded-full inset-11 sm:inset-12">
                                                <div
                                                    className="w-full h-full rounded-full yma-ring-flow"
                                                    style={{
                                                        borderWidth: "1.5px",
                                                        borderStyle: "solid",
                                                        borderColor: "transparent",
                                                        backgroundImage: `
                              linear-gradient(#050816, #050816),
                              linear-gradient(120deg, #00C9A7, #3A86FF, #8338EC, #3A86FF)
                            `,
                                                        backgroundOrigin: "border-box",
                                                        backgroundClip: "padding-box, border-box",
                                                        backgroundSize: "220% 220%",
                                                        boxShadow: "0 0 14px rgba(131,56,236,0.32)",
                                                    }}
                                                />
                                            </div>

                                            <div className="absolute rounded-full inset-1">
                                                <div
                                                    className="w-full h-full rounded-full"
                                                    style={{
                                                        background:
                                                            "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.16) 0, transparent 60%)",
                                                    }}
                                                />
                                            </div>

                                            {/* ✅ יותר רווח בין “טייטלים” של הלקוחות */}
                                            <div className="absolute -translate-x-1/2 left-1/2" style={{ top: "5%" }}>
                                                <div
                                                    className="yma-badge-float px-5 sm:px-6 py-2 rounded-3xl bg-white/8 text-[11px] sm:text-[12px] text-white/90 border"
                                                    style={{
                                                        borderColor: "rgba(58,134,255,0.9)",
                                                        backdropFilter: "blur(10px)",
                                                    }}
                                                >
                                                    סטודיו לעיצוב פנים
                                                </div>
                                            </div>

                                            <div className="absolute right-0 translate-x-2 top-1/4 sm:translate-x-3">
                                                <div
                                                    className="yma-badge-float px-5 sm:px-6 py-2 rounded-3xl bg-white/7 text-[11px] sm:text-[12px] text-white/85 border"
                                                    style={{
                                                        borderColor: "rgba(58,134,255,0.9)",
                                                        backdropFilter: "blur(10px)",
                                                        animationDelay: "0.25s",
                                                    }}
                                                >
                                                    חנות בגדים אונליין
                                                </div>
                                            </div>

                                            <div className="absolute right-[10%] bottom-[12%]">
                                                <div
                                                    className="yma-badge-float px-5 sm:px-6 py-2 rounded-3xl bg-white/7 text-[11px] sm:text-[12px] text-white/85 border"
                                                    style={{
                                                        borderColor: "rgba(58,134,255,0.9)",
                                                        backdropFilter: "blur(10px)",
                                                        animationDelay: "0.5s",
                                                    }}
                                                >
                                                    משרד ייעוץ נדל״ן
                                                </div>
                                            </div>

                                            <div className="absolute left-[6%] bottom-[18%]">
                                                <div
                                                    className="yma-badge-float px-5 sm:px-6 py-2 rounded-3xl bg-white/6 text-[11px] sm:text-[12px] text-white/80 border"
                                                    style={{
                                                        borderColor: "rgba(58,134,255,0.9)",
                                                        backdropFilter: "blur(10px)",
                                                        animationDelay: "0.75s",
                                                    }}
                                                >
                                                    מאפייה שכונתית
                                                </div>
                                            </div>

                                            <div className="absolute left-0 top-[24%] -translate-x-1">
                                                <div
                                                    className="yma-badge-float px-5 sm:px-6 py-2 rounded-3xl bg-white/8 text-[11px] sm:text-[12px] text-white/90 border"
                                                    style={{
                                                        borderColor: "rgba(58,134,255,0.9)",
                                                        backdropFilter: "blur(10px)",
                                                        animationDelay: "1s",
                                                    }}
                                                >
                                                    קליניקת טיפולים
                                                </div>
                                            </div>

                                            <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                                                <div className="w-20 sm:w-24 md:w-28">
                                                    <img
                                                        src="/Logo.png"
                                                        alt="Y.M.A – אתרים מותאמים"
                                                        className="w-full h-auto drop-shadow-[0_0_18px_rgba(0,0,0,0.8)]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT CARD */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.25 }}
                            custom={1}
                            className="relative"
                        >
                            <div className="relative flex justify-center px-4 sm:px-0">
                                <div
                                    className="w-full rounded-3xl bg-black/70 border border-white/15 backdrop-blur-2xl flex flex-col gap-5 shadow-[0_0_45px_rgba(0,0,0,0.85)]"
                                    style={{ padding: "2.25rem 2rem" }}
                                >
                                    <div className="space-y-3">
                                        <div>
                                            <p className="font-[Heebo] text-sm font-semibold text-white mb-2">
                                                שלחו הודעה ללקוחות שלנו
                                            </p>
                                            <div
                                                className="h-[2px] w-full max-w-xs mx-auto rounded-full opacity-95"
                                                style={{
                                                    backgroundImage: `
                            linear-gradient(
                              90deg,
                              rgba(255,46,126,0) 0%,
                              rgba(255,46,126,0.95) 20%,
                              rgba(255,119,69,0.95) 80%,
                              rgba(255,119,69,0) 100%
                            )
                          `,
                                                    boxShadow: "0 0 12px rgba(230,31,116,0.4)",
                                                }}
                                            />
                                            <p className="mt-3 font-[Heebo] text-[12px] sm:text-xs text-white/60 max-w-md">
                                                הפרטים יישלחו לשני לקוחות מתאימים מתוך המעגל. אם זה מסתדר להם בזמן – הם יחזרו
                                                אליכם וישתפו איך זה היה לעבוד איתנו, בשפה שלהם.
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4 text-right">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="flex flex-col gap-1">
                                                <label className="font-[Heebo] text-xs font-medium text-white">
                                                    שם מלא *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="h-11 rounded-2xl bg-black/40 border border-white/22 px-4 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                    placeholder="איך לפנות אליך?"
                                                    required
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <label className="font-[Heebo] text-xs font-medium text-white">
                                                    טלפון לחזרה *
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="h-11 rounded-2xl bg-black/40 border border-white/22 px-4 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                    placeholder="מספר נייד"
                                                    required
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <label className="font-[Heebo] text-xs font-medium text-white">
                                                    מייל לחזרה *
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="h-11 rounded-2xl bg-black/40 border border-white/22 px-4 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                    placeholder="אם נוח לך יותר במייל"
                                                    required
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <label className="font-[Heebo] text-xs font-medium text-white">
                                                    סוג הפרויקט שמעניין אותך
                                                </label>
                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsProjectOpen((v) => !v)}
                                                        className="h-11 w-full rounded-2xl bg-black/30 border border-[#3A86FF] px-4 text-sm text-white flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#3A86FF]"
                                                    >
                                                        <span>{projectLabel}</span>
                                                        <span className="text-[10px] text-white/70">
                                                            {isProjectOpen ? "▲" : "▼"}
                                                        </span>
                                                    </button>

                                                    {isProjectOpen && (
                                                        <div className="absolute z-20 mt-1 w-full rounded-2xl bg-black/80 border border-[#3A86FF] shadow-[0_0_22px_rgba(58,134,255,0.5)] backdrop-blur-xl max-h-56 overflow-y-auto">
                                                            {PROJECT_OPTIONS.map((opt, idx) => (
                                                                <button
                                                                    key={opt.value}
                                                                    type="button"
                                                                    onMouseDown={(e) => {
                                                                        e.preventDefault();
                                                                        setProjectType(opt.value);
                                                                        setIsProjectOpen(false);
                                                                    }}
                                                                    className="w-full px-4 py-2 text-sm text-right text-white hover:bg-white/5"
                                                                    style={{
                                                                        borderBottom:
                                                                            idx === PROJECT_OPTIONS.length - 1
                                                                                ? "none"
                                                                                : "1px solid rgba(58,134,255,0.35)",
                                                                    }}
                                                                >
                                                                    {opt.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1 mt-5">
                                            <label className="font-[Heebo] text-xs font-medium text-white">
                                                מה היית רוצה לשאול את הלקוחות שלנו? *
                                            </label>
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="min-h-[120px] rounded-2xl bg-black/40 border border-white/22 px-4 py-2.5 text-sm text-white placeholder:text-white/35 resize-none focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="למשל: איך הייתה התקשורת בתהליך? האם עמדו בזמנים? איך האתר משפיע על העסק ביום־יום?"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col items-center gap-3 pt-3">
                                            <div className="font-[Heebo] text-[11px] sm:text-xs text-white/60 leading-snug max-w-md text-center">
                                                הפרטים שלך נשמרים אצלנו ונשלחים רק ללקוחות שנבחרו מראש ושנתנו הסכמה לדבר עם
                                                מתעניינים. לא נוסיף אותך לרשימת דיוור בלי שתבקש.
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="inline-flex items-center justify-center text-center border rounded-3xl font-[Heebo] text-[14px] md:text-[15px] text-white/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_26px_rgba(58,134,255,0.7)]"
                                                style={{
                                                    padding: "0.3rem 1rem",
                                                    background:
                                                        "linear-gradient(135deg, rgba(58,134,255,0.26), rgba(0,201,167,0.26))",
                                                    borderColor: "rgba(58,134,255,0.95)",
                                                    boxShadow: "0 0 20px rgba(58,134,255,0.5)",
                                                }}
                                            >
                                                {isSubmitting ? "שולחים את ההודעה..." : "שלחו את ההודעה"}
                                            </button>
                                        </div>

                                        {status === "success" && (
                                            <div className="mt-1.5 font-[Heebo] text-[11px] sm:text-xs text-emerald-400 text-center">
                                                קיבלנו את ההודעה שלך והעברנו אותה לשני לקוחות שלנו. אם יתאים להם, הם יחזרו אליך
                                                בימים הקרובים.
                                            </div>
                                        )}

                                        {status === "error" && (
                                            <div className="mt-1.5 font-[Heebo] text-[11px] sm:text-xs text-red-400 text-center">
                                                {errorText || "משהו השתבש, נסו שוב בעוד רגע."}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div aria-hidden className="h-10 md:h-16" />
            </div>

            <style>{`
        .yma-badge-float{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
      `}</style>
        </section>
    );
}
