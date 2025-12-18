import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { api } from "../../api/axios";
import { setAccessToken } from "../../api/authToken";

export default function AdminLoginPage() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        try {
            const r = await api.post("/admin/auth/login", { email, password });
            setAccessToken(r.data.accessToken);
            nav("/admin");
        } catch (e: unknown) {
            const error = e as AxiosError<{ error: string }>;
            setErr(error?.response?.data?.error || "Login failed");
        }
    };

    return (
        <div dir="rtl" className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={onSubmit} className="w-full max-w-sm p-6 rounded-2xl border border-white/10">
                <h1 className="text-xl font-bold mb-4">כניסת אדמין</h1>

                <input
                    className="w-full mb-3 p-3 rounded-xl bg-black/30 border border-white/10"
                    placeholder="אימייל"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full mb-3 p-3 rounded-xl bg-black/30 border border-white/10"
                    placeholder="סיסמה"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {err && <p className="text-red-400 text-sm mb-3">{err}</p>}

                <button className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/15 transition" type="submit">
                    כניסה
                </button>
            </form>
        </div>
    );
}
