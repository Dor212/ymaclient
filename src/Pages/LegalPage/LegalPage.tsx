import React from "react";
import { Helmet } from "react-helmet";

const Section = ({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
}) => (
    <section
        id={id}
        className="relative w-full max-w-4xl px-4 mx-auto py-7 md:py-9"
    >
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-center text-white md:text-3xl">
                {title}
            </h2>

            <div className="w-24 h-px mx-auto mt-4 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            <div className="mt-6 space-y-4 leading-relaxed text-center text-slate-200/95">
                {children}
            </div>
        </div>

        <div className="w-2/3 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
);

export default function LegalPage() {
    const lastUpdated = new Date().toLocaleDateString("he-IL");

    return (
        <main className="relative min-h-screen pt-24 pb-16 overflow-hidden hebrew-content">
            <Helmet>
                <title>הצהרת נגישות, פרטיות, תנאי שימוש וקוקיז | YMA</title>
                <html lang="he" dir="rtl" />
            </Helmet>

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[#05060A]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1E] via-[#05060A] to-[#07081A]" />

                {/* soft glow blobs */}
                <div className="absolute -top-24 right-1/2 h-80 w-80 translate-x-1/2 rounded-full bg-[#7C3AED]/25 blur-3xl" />
                <div className="absolute top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#06B6D4]/18 blur-3xl" />
                <div className="absolute -bottom-24 right-1/2 h-80 w-80 translate-x-1/2 rounded-full bg-[#EC4899]/16 blur-3xl" />

                {/* faint grid */}
                <div
                    className="absolute inset-0 opacity-[0.18]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "42px 42px",
                        backgroundPosition: "center",
                    }}
                />

                {/* vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_75%,rgba(0,0,0,0.85)_100%)]" />
            </div>

            {/* Header */}
            <header className="relative max-w-4xl px-4 mx-auto text-center">
                <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-200/90 backdrop-blur">
                    מסמכי מדיניות האתר
                </div>

                <h1 className="mt-4 text-3xl font-black tracking-tight text-center text-white md:text-4xl">
                    הצהרת נגישות, מדיניות פרטיות, תנאי שימוש וקוקיז
                </h1>

                <p className="mt-2 text-sm text-center text-slate-300/90">
                    עודכן לאחרונה: {lastUpdated}
                </p>

                <nav className="flex flex-wrap justify-center max-w-3xl gap-3 mx-auto mt-6 text-sm">
                    {[
                        { href: "#accessibility", label: "נגישות" },
                        { href: "#privacy", label: "פרטיות" },
                        { href: "#terms", label: "תנאי שימוש" },
                        { href: "#cookies", label: "קוקיז" },
                    ].map((x) => (
                        <a
                            key={x.href}
                            href={x.href}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-100 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/60"
                        >
                            <span className="bg-gradient-to-r from-[#06B6D4] via-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
                                {x.label}
                            </span>
                        </a>
                    ))}
                </nav>

                <div className="w-2/3 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            </header>

            {/* Sections */}
            <Section id="accessibility" title="הצהרת נגישות">
                <p>
                    אנו פועלים להנגיש את האתר לכלל המשתמשים, לרבות אנשים עם מוגבלות, בהתאם
                    להנחיות WCAG 2.2 רמה AA. אם נתקלתם בליקוי נגישות, אנא פנו אלינו ונפעל
                    לתיקון בהקדם.
                </p>

                <ul className="mx-auto space-y-2 text-center list-disc list-inside">
                    <li>ניווט מקלדת, ניגודיות מספקת וטקסט חלופי לתמונות משמעותיות.</li>
                    <li>תצוגה רספונסיבית, היררכיית כותרות ושפה סמנטית תקינה.</li>
                </ul>

                <p>
                    קשר לנגישות:{" "}
                    <a
                        className="underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
                        href="mailto:custwebyma@gmail.com"
                    >
                        custwebyma@gmail.com
                    </a>
                </p>
            </Section>

            <Section id="privacy" title="מדיניות פרטיות">
                <p>
                    אנו מכבדים את פרטיותכם. אנו עשויים לאסוף פרטים שמסרתם מרצון (כגון טופס
                    קשר) ונתוני שימוש אנונימיים (כגון קוקיז וסטטיסטיקות). השימוש במידע נעשה
                    לשיפור השירות, מענה לפניות ואבטחה. לא נעביר פרטים לצד ג׳ אלא אם נדרש לפי
                    דין או לצורך הפעלה תקינה של השירות.
                </p>
                <p>
                    לבקשות גישה, עדכון או מחיקה של מידע אישי ניתן לפנות אלינו בדוא״ל המופיע
                    למעלה.
                </p>
            </Section>

            <Section id="terms" title="תנאי שימוש">
                <ul className="mx-auto space-y-2 text-center list-disc list-inside">
                    <li>השימוש באתר באחריות המשתמש. התכנים עשויים להשתנות ללא הודעה מוקדמת.</li>
                    <li>חל איסור שימוש לרעה, פגיעה, הטעיה או הפרת כל דין באמצעות האתר.</li>
                    <li>זכויות הקניין הרוחני בתכנים שייכות לבעל האתר, אלא אם צוין אחרת.</li>
                </ul>
            </Section>

            <Section id="cookies" title="מדיניות קוקיז">
                <p>
                    אנו משתמשים בעוגיות (Cookies) לצורך תפעול האתר, ניתוח שימוש ושיפור חוויית
                    הגלישה. ניתן להתאים העדפות בבאנר הקוקיז שמופיע בביקור הראשון, או דרך
                    הגדרות הדפדפן.
                </p>
            </Section>
        </main>
    );
}
