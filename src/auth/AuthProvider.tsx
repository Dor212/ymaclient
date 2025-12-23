import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { authClient } from "../api/authClient";
import { setAccessToken } from "../api/authToken";

type AuthStatus = "loading" | "authed" | "guest";

type AuthCtx = {
    status: AuthStatus;
    setAuthed: (accessToken: string) => void;
    logoutLocal: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState<AuthStatus>("loading");

    // React StrictMode ב-dev מריץ useEffect פעמיים בכוונה, אז אנחנו חוסמים את זה.
    const didInit = useRef(false);

    useEffect(() => {
        if (didInit.current) return;
        didInit.current = true;

        const boot = async () => {
            try {
                const r = await authClient.post("/admin/auth/refresh");
                const token = r.data?.accessToken;

                if (!token) {
                    setAccessToken(null);
                    setStatus("guest");
                    return;
                }

                setAccessToken(token);
                setStatus("authed");
            } catch {
                setAccessToken(null);
                setStatus("guest");
            }
        };

        boot();
    }, []);

    const value = useMemo<AuthCtx>(() => {
        return {
            status,
            setAuthed: (accessToken: string) => {
                setAccessToken(accessToken);
                setStatus("authed");
            },
            logoutLocal: () => {
                setAccessToken(null);
                setStatus("guest");
            },
        };
    }, [status]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
}
