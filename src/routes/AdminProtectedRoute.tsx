import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../api/axios";
import { getAccessToken, setAccessToken } from "../api/authToken";

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const run = async () => {
            if (getAccessToken()) {
                setOk(true);
                setLoading(false);
                return;
            }
            try {
                const r = await api.post("/admin/auth/refresh");
                setAccessToken(r.data.accessToken);
                setOk(true);
            } catch {
                setOk(false);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, []);

    if (loading) return null;
    if (!ok) return <Navigate to="/admin/login" replace />;
    return <>{children}</>;
}
