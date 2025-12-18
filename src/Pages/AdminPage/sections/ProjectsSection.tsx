import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ProjectForm, ProjectItem } from "../admin.types";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
    }),
};

function fileToDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
}

type Props = {
    items: ProjectItem[];
    onCreate: (payload: {
        clientName: string;
        projectType: string;
        description: string;
        longDescription: string;
        url: string;
        images: string[];
        isActive: boolean;
    }) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    busyDeleteId: string | null;
};

export default function ProjectsSection({ items, onCreate, onDelete, busyDeleteId }: Props) {
    const [form, setForm] = useState<ProjectForm>({
        clientName: "",
        projectType: "",
        description: "",
        longDescription: "",
        url: "",
        images: [],
        active: true,
    });

    const [busyUploading, setBusyUploading] = useState(false);

    const accentGradient = useMemo(
        () => "linear-gradient(135deg, rgba(58,134,255,0.32), rgba(0,201,167,0.32))",
        []
    );
    const accentBorder = useMemo(() => "rgba(58,134,255,0.95)", []);
    const accentShadow = useMemo(() => "0 0 24px rgba(58,134,255,0.6)", []);

    const onText =
        (field: "clientName" | "projectType" | "description" | "longDescription" | "url") =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }));
            };

    const onActive = (e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, active: e.target.checked }));
    };

    const onImages = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        try {
            setBusyUploading(true);
            const dataUrls = await Promise.all(files.map(fileToDataUrl));
            setForm((prev) => ({ ...prev, images: [...prev.images, ...dataUrls] }));
        } finally {
            setBusyUploading(false);
            e.target.value = "";
        }
    };

    const removeImage = (index: number) => {
        setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const clearAllImages = () => {
        setForm((prev) => ({ ...prev, images: [] }));
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        await onCreate({
            clientName: form.clientName.trim(),
            projectType: form.projectType.trim(),
            description: form.description.trim(),
            longDescription: form.longDescription.trim(),
            url: form.url.trim(),
            images: form.images.filter(Boolean),
            isActive: form.active,
        });

        setForm({
            clientName: "",
            projectType: "",
            description: "",
            longDescription: "",
            url: "",
            images: [],
            active: true,
        });
    };

    return (
        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-80px" }}
            custom={1}
            className="relative"
        >
            <div className="relative rounded-3xl bg-black/80 border border-white/15 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.95)] p-6 md:p-7 flex flex-col gap-6">
                <div className="absolute z-20 -top-3 right-6">
                    <div className="px-3 py-1 rounded-full text-[11px] font-[Heebo] font-semibold text-white/90 bg-gradient-to-l from-fuchsia-300/20 to-cyan-300/15 border border-white/20 backdrop-blur-md shadow-[0_0_18px_rgba(232,121,249,0.18)]">
                        משמש לפרויקטים + עמוד "על האתר"
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

                <form onSubmit={submit} className="space-y-4 text-right">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1">
                            <label className="font-[Heebo] text-xs font-medium text-white/90">שם הלקוח *</label>
                            <input
                                type="text"
                                value={form.clientName}
                                onChange={onText("clientName")}
                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-[Heebo] text-xs font-medium text-white/90">סוג הפרויקט *</label>
                            <input
                                type="text"
                                value={form.projectType}
                                onChange={onText("projectType")}
                                className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-[Heebo] text-xs font-medium text-white/90">URL לפרויקט *</label>
                        <input
                            type="url"
                            value={form.url}
                            onChange={onText("url")}
                            className="h-10 rounded-2xl bg-black/40 border border-white/22 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                            placeholder="https://example.com"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-[Heebo] text-xs font-medium text-white/90">תיאור קצר (לכרטיסים) *</label>
                        <textarea
                            value={form.description}
                            onChange={onText("description")}
                            className="min-h-[90px] rounded-2xl bg-black/40 border border-white/22 px-3 py-2 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                            placeholder="3 משפטים חזקים: מי הלקוח, מה בנינו, ומה התוצאה"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-[Heebo] text-xs font-medium text-white/90">תיאור ארוך (לעמוד 'על האתר') *</label>
                        <textarea
                            value={form.longDescription}
                            onChange={onText("longDescription")}
                            className="min-h-[140px] rounded-2xl bg-black/40 border border-white/22 px-3 py-2 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF]"
                            placeholder="פירוט יותר עמוק: אתגר, תהליך, פיצ'רים, תוצאות"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-3">
                            <label className="font-[Heebo] text-xs font-medium text-white/90">תמונות לפרויקט</label>
                            {form.images.length ? (
                                <button
                                    type="button"
                                    onClick={clearAllImages}
                                    className="text-[11px] font-[Heebo] text-red-200 hover:text-red-100"
                                >
                                    נקה הכל
                                </button>
                            ) : null}
                        </div>

                        <div className="p-3 border rounded-2xl border-white/22 bg-black/35">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={onImages}
                                disabled={busyUploading}
                                className="block w-full text-[12px] font-[Heebo] text-white/80 file:mr-3 file:rounded-xl file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white/90 hover:file:bg-white/15"
                            />

                            {busyUploading ? (
                                <div className="mt-2 text-[11px] font-[Heebo] text-white/55">טוען תמונות…</div>
                            ) : null}

                            {form.images.length ? (
                                <div className="grid grid-cols-3 gap-2 mt-3 sm:grid-cols-4">
                                    {form.images.map((src, i) => (
                                        <div
                                            key={`${src.slice(0, 24)}-${i}`}
                                            className="relative overflow-hidden border rounded-xl border-white/15 bg-black/30"
                                        >
                                            <img src={src} alt={`preview-${i + 1}`} className="object-cover w-full h-20" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-1 left-1 rounded-lg bg-black/60 border border-white/15 px-2 py-1 text-[10px] font-[Heebo] text-white/90 hover:bg-black/75"
                                            >
                                                הסר
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-2 text-[11px] font-[Heebo] text-white/45">לא הועלו תמונות עדיין</div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1">
                            <label className="font-[Heebo] text-xs font-medium text-white/90">סטטוס</label>
                            <div className="flex items-center gap-2 mt-[2px]">
                                <input
                                    id="project-active-toggle"
                                    type="checkbox"
                                    checked={form.active}
                                    onChange={onActive}
                                    className="h-4 w-4 rounded border-white/40 bg-black/50 text-[#3A86FF] focus:ring-[#3A86FF]"
                                />
                                <label htmlFor="project-active-toggle" className="font-[Heebo] text-xs text-white/80 select-none">
                                    פרויקט מוצג באתר
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* כפתור באמצע + בלי הפסקה */}
                    <div className="flex justify-center pt-3">
                        <button
                            type="submit"
                            className="inline-flex items-center cursor-pointer justify-center text-center border rounded-3xl font-[Heebo] text-[13px] md:text-[14px] text-white/90 transition-all hover:shadow-[0_0_26px_rgba(58,134,255,0.85)]"
                            style={{
                                padding: "0.32rem 1.35rem",
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
                        {items.map((p) => (
                            <div
                                key={p._id}
                                className="relative flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5"
                            >
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="font-[Heebo] text-[13px] text-white truncate">{p.clientName}</span>
                                    <span className="font-[Heebo] text-[11px] text-white/60 truncate">{p.projectType}</span>
                                    {p.url ? (
                                        <a
                                            href={p.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-[Heebo] text-[11px] text-cyan-200/80 hover:text-cyan-100 truncate"
                                        >
                                            {p.url}
                                        </a>
                                    ) : null}
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
                                        onClick={() => onDelete(p._id)}
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
    );
}
