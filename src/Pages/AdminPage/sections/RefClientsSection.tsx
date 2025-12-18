import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { RefClientForm, RefClientItem, ProjectType } from "../admin.types";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
    }),
};

type Props = {
    items: RefClientItem[];
    onCreate: (payload: {
        name: string;
        businessName: string;
        email: string;
        phone: string;
        niche: string;
        note: string;
        projectType: ProjectType;
        isActive: boolean;
        maxLeadsPerWeek: number;
    }) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    busyDeleteId: string | null;
};

export default function RefClientsSection({ items, onCreate, onDelete, busyDeleteId }: Props) {
    const [form, setForm] = useState<RefClientForm>({
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

    const accentGradient = useMemo(
        () => "linear-gradient(135deg, rgba(58,134,255,0.32), rgba(0,201,167,0.32))",
        []
    );
    const accentBorder = useMemo(() => "rgba(58,134,255,0.95)", []);
    const accentShadow = useMemo(() => "0 0 24px rgba(58,134,255,0.6)", []);

    const sorted = useMemo(
        () => items.slice().sort((a, b) => (a.name || "").localeCompare(b.name || "", "he")),
        [items]
    );

    const onText =
        (field: "businessName" | "contactName" | "phone" | "email" | "niche" | "note") =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }));
            };

    const onProjectType = (e: ChangeEvent<HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, projectType: e.target.value as ProjectType }));
    };

    const onMaxLeads = (e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, maxLeadsPerWeek: e.target.value }));
    };

    const onActive = (e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, active: e.target.checked }));
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        await onCreate({
            name: form.contactName.trim(),
            businessName: form.businessName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            niche: form.niche.trim(),
            note: form.note.trim(),
            projectType: form.projectType,
            isActive: form.active,
            maxLeadsPerWeek: Number(form.maxLeadsPerWeek) || 3,
        });

        setForm({
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
    };

    return (
        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-80px" }}
            custom={0}
            className="relative"
        >
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

                <form onSubmit={submit} className="space-y-4 text-right">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1">
                            <label className="font-[Heebo] text-xs font-medium text-white/90">שם העסק *</label>
                            <input
                                type="text"
                                value={form.businessName}
                                onChange={onText("businessName")}
                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                placeholder="לדוגמה: סטודיו Bar.F"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-[Heebo] text-xs font-medium text-white/90">שם איש קשר *</label>
                            <input
                                type="text"
                                value={form.contactName}
                                onChange={onText("contactName")}
                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                placeholder="איך לפנות אליו?"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-[Heebo] text-xs font-medium text-white/90">טלפון</label>
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={onText("phone")}
                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                placeholder="מספר נייד"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-[Heebo] text-xs font-medium text-white/90">מייל *</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={onText("email")}
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
                                value={form.niche}
                                onChange={onText("niche")}
                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                placeholder="לדוגמה: עיצוב פנים"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-[Heebo] text-xs font-medium text-white/90">סוג פרויקט</label>
                            <select
                                value={form.projectType}
                                onChange={onProjectType}
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
                            value={form.note}
                            onChange={onText("note")}
                            className="min-h-[90px] rounded-2xl bg-black/40 border border-white/22 px-3 py-2 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                            placeholder="למשל: מוזמנים לשאול על תהליך העיצוב והחוויה"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1">
                            <label className="font-[Heebo] text-xs font-medium text-white/90">מקס׳ פניות לשבוע</label>
                            <input
                                type="number"
                                value={form.maxLeadsPerWeek}
                                onChange={onMaxLeads}
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
                                    checked={form.active}
                                    onChange={onActive}
                                    className="h-4 w-4 rounded border-white/40 bg-black/50 text-[#3A86FF] focus:ring-[#3A86FF]"
                                />
                                <label htmlFor="ref-active-toggle" className="font-[Heebo] text-xs text-white/80 select-none">
                                    פעיל במעגל הלקוחות
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-3">
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
                        <span className="font-[Heebo] text-[11px] text-white/50">{sorted.length} סה״כ</span>
                    </div>

                    <div className="space-y-2">
                        {sorted.map((c) => (
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
                                    onClick={() => onDelete(c._id)}
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
    );
}
