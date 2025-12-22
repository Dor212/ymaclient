import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { api } from "../../api/axios";
import { setAccessToken } from "../../api/authToken";

type LocationState = {
    from?: {
        pathname: string;
    };
};

export default function AdminLoginPage() {
    const nav = useNavigate();
    const location = useLocation();
    const state = (location.state ?? null) as LocationState | null;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (busy) return;

        setBusy(true);
        setErr(null);

        try {
            const r = await api.post("/admin/auth/login", { email, password });
            const token: string | undefined = r?.data?.accessToken;

            if (!token) {
                setErr("לא התקבל טוקן מהשרת");
                return;
            }

            setAccessToken(token);

            const to = state?.from?.pathname || "/admin";
            nav(to, { replace: true });
        } catch (e: unknown) {
            const error = e as AxiosError<{ error?: string }>;
            setErr(error?.response?.data?.error || "Login failed");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div dir="rtl" className="flex items-center justify-center min-h-screen px-4">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-sm p-6 border rounded-2xl border-white/10 bg-black/40 backdrop-blur-xl"
            >
                <h1 className="mb-4 text-xl font-bold text-white">כניסת אדמין</h1>

                <input
                    className="w-full mb-3 p-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                    placeholder="אימייל"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    inputMode="email"
                />

                <input
                    className="w-full mb-3 p-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                    placeholder="סיסמה"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />

                {err && <p className="mb-3 text-sm text-red-400">{err}</p>}

                <button
                    className="w-full p-3 text-white transition rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-60 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={busy}
                >
                    {busy ? "מתחבר..." : "כניסה"}
                </button>
            </form>
        </div>
    );
}
