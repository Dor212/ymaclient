import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.12 * i,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

type RefClientForm = {
    businessName: string;
    contactName: string;
    phone: string;
    email: string;
    niche: string;
    note: string;
    active: boolean;
};

type ProjectForm = {
    clientName: string;
    projectType: string;
    description: string;
    images: string[];
    order: string;
    active: boolean;
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
    });

    const [projectForm, setProjectForm] = useState<ProjectForm>({
        clientName: "",
        projectType: "",
        description: "",
        images: ["", "", "", ""],
        order: "",
        active: true,
    });

    const handleRefChange =
        (field: keyof RefClientForm) =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const value = field === "active" ? (e.target as HTMLInputElement).checked : e.target.value;
                setRefClientForm((prev) => ({ ...prev, [field]: value }));
            };

    const handleProjectChange =
        (field: keyof ProjectForm) =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const value = field === "active" ? (e.target as HTMLInputElement).checked : e.target.value;
                setProjectForm((prev) => ({ ...prev, [field]: value }));
            };

    const handleImageChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProjectForm((prev) => {
            const next = [...prev.images];
            next[index] = value;
            return { ...prev, images: next };
        });
    };

    function handleSubmitRefClients(e: FormEvent) {
        e.preventDefault();
    }

    function handleSubmitProject(e: FormEvent) {
        e.preventDefault();
    }

    const accentGradient = "linear-gradient(135deg, rgba(58,134,255,0.32), rgba(0,201,167,0.32))";
    const accentBorder = "rgba(58,134,255,0.95)";
    const accentShadow = "0 0 24px rgba(58,134,255,0.6)";

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
                        <p className="font-[Heebo] text-xs tracking-[0.18em] text-[#A5B9FF] uppercase mb-2">
                            לוח ניהול Y.M.A
                        </p>
                        <h1
                            className="font-[Heebo] text-2xl md:text-3xl lg:text-4xl font-black tracking-tight bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #3A86FF, #00C9A7)",
                                textShadow: "0 0 18px rgba(0,0,0,0.7)",
                            }}
                        >
                            יותר סדר, פחות כאב ראש
                        </h1>
                        <p className="mt-3 font-[Heebo] text-sm md:text-base text-white/75 max-w-2xl mx-auto leading-relaxed">
                            מכאן תנהל את הלקוחות שמדברים עם מתעניינים, ואת האתרים שמופיעים בסקשן הפרויקטים בעמוד הבית.
                        </p>
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
                                <div className="flex flex-col gap-2">
                                    <div className="inline-flex items-center justify-between gap-3">
                                        <h2 className="font-[Heebo] text-lg md:text-xl font-semibold text-white">
                                            לקוחות מדברים
                                        </h2>
                                        <span className="inline-flex items-center rounded-2xl border px-3 py-1 text-[11px] font-[Heebo] text-white/85 bg-white/5 border-white/18">
                                            יוצג בקטע "דברו עם מי שכבר בנה איתנו"
                                        </span>
                                    </div>
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
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                שם העסק *
                                            </label>
                                            <input
                                                type="text"
                                                value={refClientForm.businessName}
                                                onChange={handleRefChange("businessName")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="לדוגמה: סטודיו Bar.F"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                שם איש קשר
                                            </label>
                                            <input
                                                type="text"
                                                value={refClientForm.contactName}
                                                onChange={handleRefChange("contactName")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="איך לפנות אליו?"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                טלפון לחזרה *
                                            </label>
                                            <input
                                                type="tel"
                                                value={refClientForm.phone}
                                                onChange={handleRefChange("phone")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="מספר נייד"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                מייל
                                            </label>
                                            <input
                                                type="email"
                                                value={refClientForm.email}
                                                onChange={handleRefChange("email")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="אם הוא מעדיף מייל"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                נישה / תחום
                                            </label>
                                            <input
                                                type="text"
                                                value={refClientForm.niche}
                                                onChange={handleRefChange("niche")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="לדוגמה: סטודיו לעיצוב פנים"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                סטטוס
                                            </label>
                                            <div className="flex items-center gap-2 mt-[2px]">
                                                <input
                                                    id="ref-active-toggle"
                                                    type="checkbox"
                                                    checked={refClientForm.active}
                                                    onChange={(e) =>
                                                        setRefClientForm((prev) => ({
                                                            ...prev,
                                                            active: e.target.checked,
                                                        }))
                                                    }
                                                    className="h-4 w-4 rounded border-white/40 bg-black/50 text-[#3A86FF] focus:ring-[#3A86FF]"
                                                />
                                                <label
                                                    htmlFor="ref-active-toggle"
                                                    className="font-[Heebo] text-xs text-white/80 select-none"
                                                >
                                                    פעיל במעגל הלקוחות
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="font-[Heebo] text-xs font-medium text-white/90">
                                            הערה קצרה שתוצג למתעניינים
                                        </label>
                                        <textarea
                                            value={refClientForm.note}
                                            onChange={handleRefChange("note")}
                                            className="min-h-[90px] rounded-2xl bg-black/40 border border-white/22 px-3 py-2 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                            placeholder="למשל: ״מוזמנים לשאול על תהליך העיצוב, הזמנים והחוויה מולנו.״"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <p className="font-[Heebo] text-[11px] text-white/55 max-w-xs leading-snug">
                                            מומלץ להשאיר רק 3–6 עסקים פעילים, כדי שהלקוחות לא יוצפו בפניות.
                                        </p>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center text-center border rounded-3xl font-[Heebo] text-[13px] md:text-[14px] text-white/90 transition-all hover:shadow-[0_0_26px_rgba(58,134,255,0.8)]"
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
                                    <p className="font-[Heebo] text-xs text-white/60 mb-2">
                                        כמה מהלקוחות הקיימים במערכת:
                                    </p>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between text-[11px] font-[Heebo] text-white/80 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
                                            <span className="truncate max-w-[55%]">סטודיו Bar.F</span>
                                            <span className="hidden text-white/55 sm:inline">אתר תדמית</span>
                                            <span className="inline-flex items-center rounded-xl bg-emerald-500/20 text-emerald-300 px-2 py-[2px]">
                                                פעיל
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] font-[Heebo] text-white/80 rounded-2xl bg-white/3 border border-white/8 px-3 py-2">
                                            <span className="truncate max-w-[55%]">קליניקת טיפולים</span>
                                            <span className="hidden text-white/55 sm:inline">אתר תדמית</span>
                                            <span className="inline-flex items-center rounded-xl bg-white/10 text-white/70 px-2 py-[2px]">
                                                לא פעיל
                                            </span>
                                        </div>
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
                                <div className="flex flex-col gap-2">
                                    <div className="inline-flex items-center justify-between gap-3">
                                        <h2 className="font-[Heebo] text-lg md:text-xl font-semibold text-white">
                                            פרויקטים באתר
                                        </h2>
                                        <span className="inline-flex items-center rounded-2xl border px-3 py-1 text-[11px] font-[Heebo] text-white/85 bg-white/5 border-white/18">
                                            יוצג בסקשן "אתרים לדוגמה" בעמוד הבית
                                        </span>
                                    </div>
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
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                שם הלקוח *
                                            </label>
                                            <input
                                                type="text"
                                                value={projectForm.clientName}
                                                onChange={handleProjectChange("clientName")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="לדוגמה: סטודיו Bar.F"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                סוג הפרויקט *
                                            </label>
                                            <input
                                                type="text"
                                                value={projectForm.projectType}
                                                onChange={handleProjectChange("projectType")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="אתר תדמית בקוד מלא, חנות אונליין..."
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="font-[Heebo] text-xs font-medium text-white/90">
                                            תיאור קצר (3 משפטים) *
                                        </label>
                                        <textarea
                                            value={projectForm.description}
                                            onChange={handleProjectChange("description")}
                                            className="min-h-[90px] rounded-2xl bg-black/40 border border-white/22 px-3 py-2 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                            placeholder='לדוגמה: "סטודיו לעיצוב פסטיבלים שרצה אתר חד, צבעוני ומלא תנועה – עם דגש על הצגת עבודות ויצירת קשר מהירה."'
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {projectForm.images.map((img, index) => (
                                            <div key={index} className="flex flex-col gap-1">
                                                <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                    כתובת תמונה {index + 1}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={img}
                                                    onChange={handleImageChange(index)}
                                                    className="h-9 rounded-2xl bg-black/40 border border-white/22 px-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                    placeholder="/ExampleWeb/BarF/BarF.png"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                סדר הופעה
                                            </label>
                                            <input
                                                type="number"
                                                value={projectForm.order}
                                                onChange={handleProjectChange("order")}
                                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                                placeholder="1, 2, 3..."
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-[Heebo] text-xs font-medium text-white/90">
                                                סטטוס
                                            </label>
                                            <div className="flex items-center gap-2 mt-[2px]">
                                                <input
                                                    id="project-active-toggle"
                                                    type="checkbox"
                                                    checked={projectForm.active}
                                                    onChange={(e) =>
                                                        setProjectForm((prev) => ({
                                                            ...prev,
                                                            active: e.target.checked,
                                                        }))
                                                    }
                                                    className="h-4 w-4 rounded border-white/40 bg-black/50 text-[#3A86FF] focus:ring-[#3A86FF]"
                                                />
                                                <label
                                                    htmlFor="project-active-toggle"
                                                    className="font-[Heebo] text-xs text-white/80 select-none"
                                                >
                                                    פרויקט מוצג באתר
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <p className="font-[Heebo] text-[11px] text-white/55 max-w-xs leading-snug">
                                            עד שלושה פרויקטים יוצגו בעמוד הבית. כשנרצה להראות עוד, נבנה עמוד נפרד לכל
                                            השותפים לדרך.
                                        </p>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center text-center border rounded-3xl font-[Heebo] text-[13px] md:text-[14px] text-white/90 transition-all hover:shadow-[0_0_26px_rgba(58,134,255,0.85)]"
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
                                    <p className="font-[Heebo] text-xs text-white/60 mb-2">
                                        דוגמה להצגה של פרויקט קיים:
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-[Heebo] text-[13px] text-white">
                                                    סטודיו Bar.F
                                                </span>
                                                <span className="font-[Heebo] text-[11px] text-white/60">
                                                    אתר תדמית בקוד מלא
                                                </span>
                                            </div>
                                            <span className="inline-flex items-center rounded-xl bg-emerald-500/20 text-emerald-300 px-2 py-[2px] text-[11px] font-[Heebo]">
                                                מופיע באתר
                                            </span>
                                        </div>
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
