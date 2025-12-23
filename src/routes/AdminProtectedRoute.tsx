import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
    const { status } = useAuth();

    if (status === "loading") {
        return <div className="p-6 text-white">טוען…</div>;
    }

    if (status === "guest") {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}
