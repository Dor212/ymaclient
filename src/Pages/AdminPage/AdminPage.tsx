import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import type { ProjectItem, RefClientItem } from "./admin.types";
import AdminHeader from "./sections/AdminHeader";
import RefClientsSection from "./sections/RefClientsSection";
import ProjectsSection from "./sections/ProjectsSection";

export default function AdminPage() {
    const [refClients, setRefClients] = useState<RefClientItem[]>([]);
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [busyDeleteId, setBusyDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const [rcRes, prRes] = await Promise.all([
                    api.get<RefClientItem[]>("/reference-clients"),
                    api.get<ProjectItem[]>("/projects?all=1"),
                ]);
                setRefClients(rcRes.data);
                setProjects(prRes.data);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const createRefClient = async (payload: {
        name: string;
        businessName: string;
        email: string;
        phone: string;
        niche: string;
        note: string;
        projectType: RefClientItem["projectType"];
        isActive: boolean;
        maxLeadsPerWeek: number;
    }) => {
        const res = await api.post<RefClientItem>("/reference-clients", payload);
        setRefClients((prev) => [res.data, ...prev]);
    };

    const deleteRefClient = async (id: string) => {
        const ok = confirm("למחוק את הפריט הזה?");
        if (!ok) return;

        try {
            setBusyDeleteId(id);
            await api.delete(`/reference-clients/${id}`);
            setRefClients((prev) => prev.filter((x) => x._id !== id));
        } finally {
            setBusyDeleteId(null);
        }
    };

    const createProject = async (payload: {
        clientName: string;
        projectType: string;
        description: string;
        longDescription: string;
        url: string;
        images: string[];
        isActive: boolean;
    }) => {
        const res = await api.post<ProjectItem>("/projects", payload);
        setProjects((prev) => [res.data, ...prev]);
    };

    const deleteProject = async (id: string) => {
        const ok = confirm("למחוק את הפריט הזה?");
        if (!ok) return;

        try {
            setBusyDeleteId(id);
            await api.delete(`/projects/${id}`);
            setProjects((prev) => prev.filter((x) => x._id !== id));
        } finally {
            setBusyDeleteId(null);
        }
    };

    return (
        <main id="main">
            <div
                className="w-full min-h-screen bg-fixed bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/background4.png')" }}
            >
                <div aria-hidden className="h-24 md:h-28" />

                <div className="max-w-6xl px-5 mx-auto sm:px-6 md:px-8" dir="rtl">
                    <AdminHeader loading={loading} />

                    <div className="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-2">
                        <RefClientsSection
                            items={refClients}
                            onCreate={createRefClient}
                            onDelete={deleteRefClient}
                            busyDeleteId={busyDeleteId}
                        />

                        <ProjectsSection
                            items={projects}
                            onCreate={createProject}
                            onDelete={deleteProject}
                            busyDeleteId={busyDeleteId}
                        />
                    </div>

                    <div aria-hidden className="h-16 md:h-24" />
                </div>
            </div>
        </main>
    );
}
