import { useEffect, useState } from "react";

const KEY = "cookie-consent-v1";

type Consent = {
    necessary: boolean;
    analytics: boolean;
    date: number;
};

export default function CookieBanner() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(KEY);
            if (!saved) setShow(true);
        } catch {
            // אם localStorage לא זמין, לא מציגים
        }
    }, []);

    const accept = () => {
        const value: Consent = { necessary: true, analytics: true, date: Date.now() };
        localStorage.setItem(KEY, JSON.stringify(value));
        setShow(false);
    };

    const decline = () => {
        const value: Consent = { necessary: true, analytics: false, date: Date.now() };
        localStorage.setItem(KEY, JSON.stringify(value));
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
            <div className="w-full max-w-4xl p-3 bg-white border rounded-2xl shadow-2xl border-slate-200">
                <p className="text-sm text-slate-700">
                    אנו משתמשים בעוגיות לשיפור חוויית הגלישה. ניתן לקרוא עוד בעמוד{" "}
                    <a className="underline text-[#063942]" href="/legal#cookies">מדיניות קוקיז</a>.
                </p>
                <div className="flex gap-2 mt-3">
                    <button onClick={accept} className="px-3 py-1.5 rounded-lg bg-[#063942] text-white">מאשר</button>
                    <button onClick={decline} className="px-3 py-1.5 rounded-lg border">מסרב</button>
                </div>
            </div>
        </div>
    );
}
