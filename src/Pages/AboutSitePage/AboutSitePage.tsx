import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { api } from "../../api/axios";

type ProjectItem = {
    _id: string;
    clientName: string;
    projectType: string;
    description: string;
    longDescription?: string;
    liveUrl?: string;
    images: string[];
    isActive: boolean;
    order: number;
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function AboutSitePage() {
    const { id } = useParams();
    const [project, setProject] = useState<ProjectItem | null>(null);
    const [loading, setLoading] = useState(true);

    const accentGradient = useMemo(
        () => "linear-gradient(135deg, rgba(58,134,255,0.26), rgba(0,201,167,0.26))",
        []
    );

    useEffect(() => {
        let alive = true;

        const load = async () => {
            try {
                setLoading(true);
                const res = await api.get<ProjectItem>(`/projects/${id}`);
                if (alive) setProject(res.data);
            } catch {
                if (alive) setProject(null);
            } finally {
                if (alive) setLoading(false);
            }
        };

        if (id) load();
        return () => {
            alive = false;
        };
    }, [id]);

    if (loading) return null;
    if (!project) return null;

    const longText = (project.longDescription || "").trim() || project.description;

    return (
        <main id="main" dir="rtl">
            <div
                className="w-full min-h-screen bg-fixed bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/background4.png')" }}
            >
                <div aria-hidden className="h-24 md:h-28" />

                <div className="max-w-5xl px-5 pb-20 mx-auto sm:px-6 md:px-8">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        className="text-center"
                    >
                        <p className="font-[Heebo] text-xs tracking-[0.18em] text-[#A5B9FF] uppercase mb-2">
                            פרויקט לדוגמה
                        </p>

                        <h1
                            className="font-[Heebo] text-2xl md:text-3xl lg:text-4xl font-black tracking-tight bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #FF2E7E, #FF4477, #FF7745)",
                                textShadow: "0 0 18px rgba(0,0,0,0.7)",
                            }}
                        >
                            {project.clientName}
                        </h1>

                        <p className="mt-2 font-[Heebo] text-sm md:text-base text-white/70">
                            {project.projectType}
                        </p>
                    </motion.div>

                    <div aria-hidden className="h-10 md:h-12" />

                    <div className="rounded-3xl bg-black/70 border border-white/15 backdrop-blur-2xl shadow-[0_0_45px_rgba(0,0,0,0.85)] p-6 md:p-8">
                        {!!project.images?.length && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {project.images.slice(0, 6).map((src, idx) => (
                                    <div key={`${src}-${idx}`} className="overflow-hidden border rounded-2xl border-white/10 bg-black/30">
                                        <img src={src} alt={`${project.clientName} ${idx + 1}`} className="object-cover w-full h-auto" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-6">
                            <div
                                className="h-[2px] w-full max-w-xs mx-auto rounded-full opacity-95"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #3A86FF, #00C9A7)",
                                    boxShadow: "0 0 12px rgba(58,134,255,0.6)",
                                }}
                            />

                            <p className="mt-5 font-[Heebo] text-sm md:text-base text-white/80 leading-relaxed whitespace-pre-line text-center">
                                {longText}
                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-3 mt-7 sm:flex-row">
                            {project.liveUrl?.trim() ? (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-7 py-3 text-white/90 hover:bg-white/5 hover:shadow-[0_0_18px_rgba(58,134,255,0.35)]"
                                    style={{ background: accentGradient }}
                                >
                                    לצפייה באתר
                                </a>
                            ) : null}

                            <Link
                                to="/"
                                className="inline-flex items-center justify-center rounded-2xl border border-[#3A86FF]/55 bg-white/5 px-7 py-3 text-white hover:bg-white/[0.08] hover:shadow-[0_0_18px_rgba(58,134,255,0.35)]"
                            >
                                חזרה לדף הבית
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
