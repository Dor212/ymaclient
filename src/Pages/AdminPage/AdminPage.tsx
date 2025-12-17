import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { api } from "../../api/axios";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
    }),
};

type ProjectType = "landing" | "business" | "shop" | "other";

type RefClientForm = {
    businessName: string;
    contactName: string;
    phone: string;
    email: string;
    niche: string;
    note: string;
    active: boolean;
    projectType: ProjectType;
    maxLeadsPerWeek: string;
};

type ProjectForm = {
    clientName: string;
    projectType: string;
    description: string;
    imagesFiles: File[];
    order: string;
    active: boolean;
};

type RefClientItem = {
    _id: string;
    name: string;
    businessName?: string;
    email: string;
    phone?: string;
    niche?: string;
    note?: string;
    projectType: ProjectType;
    isActive: boolean;
    createdAt?: string;
};

type ProjectItem = {
    _id: string;
    clientName: string;
    projectType: string;
    description: string;
    images: string[];
    order: number;
    isActive: boolean;
    createdAt?: string;
};

export default function AdminPage() {
    const [refClientForm, setRefClientForm] = useState<RefClientForm>({
        businessName: "",
        contactName: "",
        phone: "",
        email: "",
        niche: "",
        note: "",
        active: true,
        projectType: "other",
        maxLeadsPerWeek: "3",
    });

    const [projectForm, setProjectForm] = useState<ProjectForm>({
        clientName: "",
        projectType: "",
        description: "",
        imagesFiles: [],
        order: "",
        active: true,
    });

    const [refClients, setRefClients] = useState<RefClientItem[]>([]);
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [busyDeleteId, setBusyDeleteId] = useState<string | null>(null);

    const accentGradient = useMemo(
        () => "linear-gradient(135deg, rgba(58,134,255,0.32), rgba(0,201,167,0.32))",
        []
    );
    const accentBorder = useMemo(() => "rgba(58,134,255,0.95)", []);
    const accentShadow = useMemo(() => "0 0 24px rgba(58,134,255,0.6)", []);

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

    const onRefText =
        (field: "businessName" | "contactName" | "phone" | "email" | "niche" | "note") =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setRefClientForm((prev) => ({ ...prev, [field]: e.target.value }));
            };

    const onRefProjectType = (e: ChangeEvent<HTMLSelectElement>) => {
        setRefClientForm((prev) => ({ ...prev, projectType: e.target.value as ProjectType }));
    };

    const onRefMaxLeads = (e: ChangeEvent<HTMLInputElement>) => {
        setRefClientForm((prev) => ({ ...prev, maxLeadsPerWeek: e.target.value }));
    };

    const onRefActive = (e: ChangeEvent<HTMLInputElement>) => {
        setRefClientForm((prev) => ({ ...prev, active: e.target.checked }));
    };

    const onProjectText =
        (field: "clientName" | "projectType" | "description" | "order") =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setProjectForm((prev) => ({ ...prev, [field]: e.target.value }));
            };

    const onProjectActive = (e: ChangeEvent<HTMLInputElement>) => {
        setProjectForm((prev) => ({ ...prev, active: e.target.checked }));
    };

    const onProjectFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        setProjectForm((prev) => ({ ...prev, imagesFiles: files }));
    };

    const filePreviews = useMemo(
        () => projectForm.imagesFiles.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })),
        [projectForm.imagesFiles]
    );

    useEffect(() => {
        return () => {
            filePreviews.forEach((p) => URL.revokeObjectURL(p.url));
        };
    }, [filePreviews]);

    async function handleSubmitRefClients(e: FormEvent) {
        e.preventDefault();

        const payload = {
            name: refClientForm.contactName.trim(),
            businessName: refClientForm.businessName.trim(),
            email: refClientForm.email.trim(),
            phone: refClientForm.phone.trim(),
            niche: refClientForm.niche.trim(),
            note: refClientForm.note.trim(),
            projectType: refClientForm.projectType,
            isActive: refClientForm.active,
            maxLeadsPerWeek: Number(refClientForm.maxLeadsPerWeek) || 3,
        };

        const res = await api.post<RefClientItem>("/reference-clients", payload);

        setRefClients((prev) => [res.data, ...prev]);

        setRefClientForm({
            businessName: "",
            contactName: "",
            phone: "",
            email: "",
            niche: "",
            note: "",
            active: true,
            projectType: "other",
            maxLeadsPerWeek: "3",
        });
    }

    async function handleSubmitProject(e: FormEvent) {
        e.preventDefault();

        const fd = new FormData();
        fd.append("clientName", projectForm.clientName.trim());
        fd.append("projectType", projectForm.projectType.trim());
        fd.append("description", projectForm.description.trim());
        fd.append("order", projectForm.order ? String(Number(projectForm.order)) : "0");
        fd.append("isActive", String(projectForm.active));
        projectForm.imagesFiles.forEach((file) => fd.append("images", file));

        const res = await api.post<ProjectItem>("/projects", fd, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setProjects((prev) => [res.data, ...prev]);

        setProjectForm({
            clientName: "",
            projectType: "",
            description: "",
            imagesFiles: [],
            order: "",
            active: true,
        });
    }

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

    const sortedRefClients = useMemo(
        () => refClients.slice().sort((a, b) => (a.name || "").localeCompare(b.name || "", "he")),
        [refClients]
    );

    return (
        <main id="main">
            <div
                className="w-full min-h-screen bg-fixed bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/background4.png')" }}
            >
                <div aria-hidden className="h-24 md:h-28" />
                <div className="max-w-6xl px-5 mx-auto sm:px-6 md:px-8" dir="rtl">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        className="mb-10 text-center md:mb-14"
                    >
                        <p className="font-[Heebo] text-xs tracking-[0.18em] text-[#A5B9FF] uppercase mb-2">לוח ניהול Y.M.A</p>

                        <h1
                            className="font-[Heebo] text-2xl md:text-3xl lg:text-4xl font-black tracking-tight bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #3A86FF, #00C9A7)",
                                textShadow: "0 0 18px rgba(0,0,0,0.7)",
                            }}
                        >
                            יותר סדר, פחות כאב ראש
                        </h1>

                        <div className="flex items-center justify-center gap-3 mt-1">
                            <span className="h-2 w-2 rounded-full bg-cyan-300/70 shadow-[0_0_12px_rgba(34,211,238,0.45)]" />
                            <span className="h-px w-[260px] sm:w-[420px] bg-gradient-to-l from-cyan-300/70 via-white/20 to-transparent" />
                            <span className="h-2 w-2 rounded-full bg-fuchsia-300/70 shadow-[0_0_12px_rgba(232,121,249,0.45)]" />
                        </div>

                        <p className="mt-1 font-[Heebo] text-sm md:text-base text-white/75 max-w-2xl mx-auto leading-relaxed">
                            <span className="block">מכאן תנהל את הלקוחות שמדברים עם מתעניינים,</span>
                            <span className="block">ואת האתרים שמופיעים בסקשן הפרויקטים בעמוד הבית.</span>
                        </p>

                        {loading && <p className="mt-3 text-white/60 text-sm font-[Heebo]">טוען נתונים…</p>}
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-2">
                        <motion.section
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, margin: "-80px" }}
                            custom={0}
                            className="relative"
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(58,134,255,0.25),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(0,201,167,0.25),_transparent_55%)]" />
                            <div className="relative rounded-3xl bg-black/75 border border-white/15 backdrop-blur-2xl shadow-[0_0_45px_rgba(0,0,0,0.9)] p-6 md:p-7 flex flex-col gap-6">
                                <div className="absolute z-20 -top-3 right-6">
                                    <div className="px-3 py-1 rounded-full text-[11px] font-[Heebo] font-semibold text-white/90 bg-gradient-to-l from-cyan-300/20 to-emerald-300/15 border border-white/20 backdrop-blur-md shadow-[0_0_18px_rgba(34,211,238,0.18)]">
                                        יוצג בקטע "דברו עם מי שכבר בנה איתנו"
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <h2 className="font-[Heebo] text-lg md:text-xl font-semibold text-white">לקוחות מדברים</h2>
                                    <div
                                        className="h-[2px] w-full max-w-xs rounded-full opacity-95"
                                        style={{
                                            backgroundImage: "linear-gradient(90deg, #3A86FF, #00C9A7)",
                                            boxShadow: "0 0 12px rgba(58,134,255,0.6)",
                                        }}
                                    />
                                </div>

                                <form onSubmit={handleSubmitRefClients} className="space-y-4 text-right">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">שם העסק *</label>
                                            <input
                                                type="text"
                                                value={refClientForm.businessName}
                                                onChange={onRefText("businessName")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="לדוגמה: סטודיו Bar.F"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">שם איש קשר *</label>
                                            <input
                                                type="text"
                                                value={refClientForm.contactName}
                                                onChange={onRefText("contactName")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="איך לפנות אליו?"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">טלפון</label>
                                            <input
                                                type="tel"
                                                value={refClientForm.phone}
                                                onChange={onRefText("phone")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="מספר נייד"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">מייל *</label>
                                            <input
                                                type="email"
                                                value={refClientForm.email}
                                                onChange={onRefText("email")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="מייל לקבלת פניות"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">נישה / תחום</label>
                                            <input
                                                type="text"
                                                value={refClientForm.niche}
                                                onChange={onRefText("niche")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="לדוגמה: עיצוב פנים"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">סוג פרויקט</label>
                                            <select
                                                value={refClientForm.projectType}
                                                onChange={onRefProjectType}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                            >
                                                <option value="landing">דף נחיתה</option>
                                                <option value="business">אתר תדמית</option>
                                                <option value="shop">חנות</option>
                                                <option value="other">אחר</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="font-[Heebo] text-xs font-medium text-white/90">הערה קצרה שתוצג למתעניינים</label>
                                        <textarea
                                            value={refClientForm.note}
                                            onChange={onRefText("note")}
                                            className="min-h-[90px] rounded-2xl bg-black/40 border border-white/22 px-3 py-2 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                            placeholder="למשל: מוזמנים לשאול על תהליך העיצוב והחוויה"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">מקס׳ פניות לשבוע</label>
                                            <input
                                                type="number"
                                                value={refClientForm.maxLeadsPerWeek}
                                                onChange={onRefMaxLeads}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="3"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">סטטוס</label>
                                            <div className="flex items-center gap-2 mt-[2px]">
                                                <input
                                                    id="ref-active-toggle"
                                                    type="checkbox"
                                                    checked={refClientForm.active}
                                                    onChange={onRefActive}
                                                    className="h-4 w-4 rounded border-white/40 bg-black/50 text-[#3A86FF] focus:ring-[#3A86FF]"
                                                />
                                                <label htmlFor="ref-active-toggle" className="font-[Heebo] text-xs text-white/80 select-none">
                                                    פעיל במעגל הלקוחות
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <p className="font-[Heebo] text-[11px] text-white/55 max-w-xs leading-snug">
                                            מומלץ להשאיר רק 3–6 עסקים פעילים, כדי שהלקוחות לא יוצפו בפניות.
                                        </p>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center cursor-pointer text-center border rounded-3xl font-[Heebo] text-[13px] md:text-[14px] text-white/90 transition-all hover:shadow-[0_0_26px_rgba(58,134,255,0.8)]"
                                            style={{
                                                padding: "0.28rem 1.1rem",
                                                background: accentGradient,
                                                borderColor: accentBorder,
                                                boxShadow: accentShadow,
                                            }}
                                        >
                                            הוסף למעגל הלקוחות
                                        </button>
                                    </div>
                                </form>

                                <div className="pt-3 mt-2 border-t border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-[Heebo] text-xs text-white/60">לקוחות קיימים במערכת:</p>
                                        <span className="font-[Heebo] text-[11px] text-white/50">{sortedRefClients.length} סה״כ</span>
                                    </div>

                                    <div className="space-y-2">
                                        {sortedRefClients.map((c) => (
                                            <div
                                                key={c._id}
                                                className="flex items-center justify-between gap-3 px-3 py-2 border rounded-2xl bg-white/5 border-white/10"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center min-w-0 gap-2">
                                                        <span className="font-[Heebo] text-[13px] text-white truncate">{c.name || "ללא שם"}</span>
                                                        <span
                                                            className={`shrink-0 inline-flex items-center rounded-xl px-2 py-[2px] text-[11px] font-[Heebo] ${c.isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/70"
                                                                }`}
                                                        >
                                                            {c.isActive ? "פעיל" : "לא פעיל"}
                                                        </span>
                                                    </div>

                                                    <div className="mt-0.5 font-[Heebo] text-[11px] text-white/65">
                                                        {c.phone ? (
                                                            <span className="inline-flex items-center gap-2">
                                                                <span className="text-white/45">טל׳:</span>
                                                                <span className="tracking-wide">{c.phone}</span>
                                                            </span>
                                                        ) : (
                                                            <span className="text-white/40">אין טלפון במערכת</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    disabled={busyDeleteId === c._id}
                                                    onClick={() => deleteRefClient(c._id)}
                                                    className="shrink-0 inline-flex items-center rounded-xl px-3 py-[6px] bg-red-500/15 border border-red-400/25 text-red-200 hover:bg-red-500/25 text-[11px] font-[Heebo] disabled:opacity-60"
                                                >
                                                    מחיקה
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, margin: "-80px" }}
                            custom={1}
                            className="relative"
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(131,56,236,0.25),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(58,134,255,0.3),_transparent_55%)]" />

                            <div className="relative rounded-3xl bg-black/80 border border-white/15 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.95)] p-6 md:p-7 flex flex-col gap-6">
                                <div className="absolute z-20 -top-3 right-6">
                                    <div className="px-3 py-1 rounded-full text-[11px] font-[Heebo] font-semibold text-white/90 bg-gradient-to-l from-fuchsia-300/20 to-cyan-300/15 border border-white/20 backdrop-blur-md shadow-[0_0_18px_rgba(232,121,249,0.18)]">
                                        יוצג בסקשן "אתרים לדוגמה" בעמוד הבית
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <h2 className="font-[Heebo] text-lg md:text-xl font-semibold text-white">פרויקטים באתר</h2>
                                    <div
                                        className="h-[2px] w-full max-w-xs rounded-full opacity-95"
                                        style={{
                                            backgroundImage: "linear-gradient(90deg, #3A86FF, #00C9A7)",
                                            boxShadow: "0 0 12px rgba(131,56,236,0.6)",
                                        }}
                                    />
                                </div>

                                <form onSubmit={handleSubmitProject} className="space-y-4 text-right">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">שם הלקוח *</label>
                                            <input
                                                type="text"
                                                value={projectForm.clientName}
                                                onChange={onProjectText("clientName")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">סוג הפרויקט *</label>
                                            <input
                                                type="text"
                                                value={projectForm.projectType}
                                                onChange={onProjectText("projectType")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="font-[Heebo] text-xs font-medium text-white/90">תיאור קצר (3 משפטים) *</label>
                                        <textarea
                                            value={projectForm.description}
                                            onChange={onProjectText("description")}
                                            className="min-h-[90px] rounded-2xl bg-black/40 border border-white/22 px-3 py-2 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-[Heebo] text-xs font-medium text-white/90">תמונות לפרויקט</label>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={onProjectFiles}
                                            className="block w-full text-xs text-white/80 file:mr-3 file:rounded-2xl file:border file:border-white/20 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:text-white hover:file:bg-white/15"
                                        />

                                        {filePreviews.length > 0 && (
                                            <div className="grid grid-cols-4 gap-2">
                                                {filePreviews.map((p) => (
                                                    <div key={p.url} className="overflow-hidden border rounded-xl border-white/10 bg-white/5">
                                                        <img src={p.url} alt={p.name} className="object-cover w-full h-16" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">סדר הופעה</label>
                                            <input
                                                type="number"
                                                value={projectForm.order}
                                                onChange={onProjectText("order")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="1, 2, 3..."
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">סטטוס</label>
                                            <div className="flex items-center gap-2 mt-[2px]">
                                                <input
                                                    id="project-active-toggle"
                                                    type="checkbox"
                                                    checked={projectForm.active}
                                                    onChange={onProjectActive}
                                                    className="h-4 w-4 rounded border-white/40 bg-black/50 text-[#3A86FF] focus:ring-[#3A86FF]"
                                                />
                                                <label htmlFor="project-active-toggle" className="font-[Heebo] text-xs text-white/80 select-none">
                                                    פרויקט מוצג באתר
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <p className="font-[Heebo] text-[11px] text-white/55 max-w-xs leading-snug">
                                            <span className="block">עד שלושה פרויקטים יוצגו בעמוד הבית.</span>
                                            <span className="block">כשנרצה להראות עוד, נבנה עמוד נפרד לכל השותפים לדרך.</span>
                                        </p>

                                        <button
                                            type="submit"
                                            className="inline-flex items-center cursor-pointer justify-center text-center border rounded-3xl font-[Heebo] text-[13px] md:text-[14px] text-white/90 transition-all hover:shadow-[0_0_26px_rgba(58,134,255,0.85)]"
                                            style={{
                                                padding: "0.28rem 1.1rem",
                                                background: accentGradient,
                                                borderColor: accentBorder,
                                                boxShadow: accentShadow,
                                            }}
                                        >
                                            הוסף פרויקט לאתר
                                        </button>
                                    </div>
                                </form>

                                <div className="pt-3 mt-2 border-t border-white/10">
                                    <p className="font-[Heebo] text-xs text-white/60 mb-2">פרויקטים קיימים במערכת:</p>

                                    <div className="flex flex-col gap-2">
                                        {projects.map((p) => (
                                            <div
                                                key={p._id}
                                                className="relative flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5"
                                            >
                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                    <span className="font-[Heebo] text-[13px] text-white truncate">{p.clientName}</span>
                                                    <span className="font-[Heebo] text-[11px] text-white/60 truncate">{p.projectType}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`inline-flex items-center rounded-xl px-2 py-[2px] text-[11px] font-[Heebo] ${p.isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/70"
                                                            }`}
                                                    >
                                                        {p.isActive ? "מופיע באתר" : "לא מופיע"}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        disabled={busyDeleteId === p._id}
                                                        onClick={() => deleteProject(p._id)}
                                                        className="inline-flex items-center rounded-xl px-2 py-[2px] bg-red-500/15 border border-red-400/25 text-red-200 hover:bg-red-500/25 text-[11px] font-[Heebo] disabled:opacity-60"
                                                    >
                                                        מחיקה
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    <div aria-hidden className="h-16 md:h-24" />
                </div>
            </div>
        </main>
    );
}
