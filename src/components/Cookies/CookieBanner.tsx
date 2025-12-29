import { useEffect, useMemo, useState } from "react";

const CONSENT_REVISION = 2; // תעלה מספר כדי להציג מחדש לכל מי שכבר אישר בעבר
const KEY = "cookie-consent";

type Consent = {
    necessary: boolean;
    analytics: boolean;
    revision: number;
    date: number;
};

function safeRead(): Consent | null {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Consent;
        if (!parsed || typeof parsed !== "object") return null;
        if (parsed.revision !== CONSENT_REVISION) return null;
        return parsed;
    } catch {
        return null;
    }
}

function safeWrite(value: Consent) {
    try {
        localStorage.setItem(KEY, JSON.stringify(value));
    } catch {
        // אם אין localStorage, פשוט לא נשמור (אבל נסתיר באנר מקומית)
    }
}

export default function CookieBanner() {
    const [show, setShow] = useState(false);
    const [prefsOpen, setPrefsOpen] = useState(false);
    const [analytics, setAnalytics] = useState(true);

    const consentValue = useMemo(
        () => ({
            necessary: true,
            analytics,
            revision: CONSENT_REVISION,
            date: Date.now(),
        }),
        [analytics]
    );

    useEffect(() => {
        const saved = safeRead();
        if (!saved) {
            setShow(true);
            setAnalytics(true);
            return;
        }
        setShow(false);
    }, []);

    const acceptAll = () => {
        safeWrite({ ...consentValue, analytics: true });
        setShow(false);
    };

    const acceptSelected = () => {
        safeWrite(consentValue);
        setShow(false);
    };

    const acceptNecessaryOnly = () => {
        safeWrite({ ...consentValue, analytics: false });
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-[9999] flex justify-center px-4 pb-4">
            <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/12 bg-black/55 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                {/* glow border */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
                <div className="p-4 md:p-5">
                    <div className="mx-auto text-center">
                        <p className="text-sm font-semibold text-white">
                            אנחנו משתמשים בקוקיז 🍪
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-200/90">
                            כדי שהאתר יעבוד חלק, למדוד שימוש ולשפר את החוויה. אפשר לבחור אילו לאשר.
                            {" "}
                            <a className="underline decoration-white/25 underline-offset-4 hover:decoration-white/60" href="/legal#cookies">
                                מדיניות קוקיז
                            </a>
                        </p>
                    </div>

                    {/* preferences */}
                    {prefsOpen && (
                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                            <div className="text-sm font-semibold text-white">העדפות</div>

                            <div className="grid gap-3 mt-3">
                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-sm text-slate-200/90">הכרחי</span>
                                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-100">
                                        תמיד פעיל
                                    </span>
                                </div>

                                <label className="mx-auto flex w-full max-w-md items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                    <span className="text-sm text-slate-200/95">אנליטיקס</span>
                                    <button
                                        type="button"
                                        onClick={() => setAnalytics((v) => !v)}
                                        className={[
                                            "relative h-7 w-12 rounded-full border transition",
                                            analytics
                                                ? "border-[#7C3AED]/60 bg-[#7C3AED]/35"
                                                : "border-white/15 bg-white/10",
                                        ].join(" ")}
                                        aria-pressed={analytics}
                                    >
                                        <span
                                            className={[
                                                "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition",
                                                analytics ? "right-1" : "right-6",
                                            ].join(" ")}
                                        />
                                    </button>
                                </label>

                                <p className="text-xs text-slate-300/80">
                                    אפשר לשנות בחירה בכל רגע על ידי מחיקת נתוני אתר בדפדפן.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col items-center justify-center gap-2 mt-4 md:flex-row">
                        <button
                            onClick={acceptAll}
                            className="w-full md:w-auto rounded-full px-5 py-2.5 text-sm font-semibold text-black
                         bg-gradient-to-r from-[#06B6D4] via-[#7C3AED] to-[#EC4899]
                         hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/60"
                        >
                            מאשר הכל
                        </button>

                        <button
                            onClick={() => setPrefsOpen((v) => !v)}
                            className="w-full md:w-auto rounded-full border border-white/14 bg-white/[0.05]
                         px-5 py-2.5 text-sm font-semibold text-white
                         hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/20"
                        >
                            {prefsOpen ? "סגור העדפות" : "בחירת העדפות"}
                        </button>

                        {prefsOpen ? (
                            <button
                                onClick={acceptSelected}
                                className="w-full md:w-auto rounded-full border border-white/14 bg-white/[0.05]
                           px-5 py-2.5 text-sm font-semibold text-white
                           hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/20"
                            >
                                שמירה
                            </button>
                        ) : (
                            <button
                                onClick={acceptNecessaryOnly}
                                className="w-full md:w-auto rounded-full border border-white/14 bg-white/[0.02]
                           px-5 py-2.5 text-sm font-semibold text-slate-100
                           hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/20"
                            >
                                רק הכרחי
                            </button>
                        )}
                    </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
        </div>
    );
}
