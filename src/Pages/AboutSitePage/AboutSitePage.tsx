import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { api } from "../../api/axios";

type ProjectItem = {
    _id: string;
    clientName: string;
    projectType: string;
    description: string;
    longDescription?: string;
    liveUrl?: string;
    url?: string;
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

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
    const uid = useId();
    const ref = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState(0);
    const count = images.length;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const w = el.clientWidth || 1;
                const idx = Math.round(el.scrollLeft / w);
                const next = Math.max(0, Math.min(count - 1, idx));
                setActive(next);
            });
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            el.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf);
        };
    }, [count]);

    const goTo = (i: number) => {
        const el = ref.current;
        if (!el) return;
        const w = el.clientWidth || 1;
        const next = Math.max(0, Math.min(count - 1, i));
        el.scrollTo({ left: next * w, behavior: "smooth" });
        setActive(next);
    };

    const atStart = active === 0;
    const atEnd = active === count - 1;

    return (
        <div className="w-full">
            <div className="relative w-full max-w-5xl mx-auto">
                <div className="relative rounded-3xl">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-3 rounded-[28px] opacity-90"
                        style={{
                            background:
                                "radial-gradient(60% 60% at 50% 35%, rgba(58,134,255,0.22), rgba(0,0,0,0) 70%), radial-gradient(50% 55% at 50% 75%, rgba(255,46,126,0.16), rgba(0,0,0,0) 70%)",
                            filter: "blur(10px)",
                        }}
                    />

                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none rounded-3xl"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(255,46,126,0.22), rgba(255,119,69,0.14), rgba(58,134,255,0.18))",
                            maskImage:
                                "linear-gradient(#000, #000), linear-gradient(#000, #000)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                            padding: "1px",
                        }}
                    />

                    <div className="relative overflow-hidden bg-transparent rounded-3xl">
                        <div
                            ref={ref}
                            dir="ltr"
                            className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
                            style={{ WebkitOverflowScrolling: "touch" }}
                        >
                            {images.map((src, i) => (
                                <div key={`${uid}-slide-${i}`} className="w-full shrink-0 snap-center">
                                    <div className="px-2 py-2 sm:px-3 sm:py-3">
                                        <div className="relative overflow-hidden rounded-3xl">
                                            <img
                                                src={src}
                                                alt={`${title} תמונה ${i + 1}`}
                                                className="w-full h-auto object-cover rounded-3xl shadow-[0_18px_55px_rgba(0,0,0,0.55)]"
                                                draggable={false}
                                                loading={i === 0 ? "eager" : "lazy"}
                                            />
                                            <div aria-hidden className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                                            <div
                                                aria-hidden
                                                className="absolute -inset-6 rounded-[36px] opacity-70 pointer-events-none"
                                                style={{
                                                    background:
                                                        "radial-gradient(45% 60% at 50% 35%, rgba(0,201,167,0.14), rgba(0,0,0,0) 70%), radial-gradient(55% 60% at 35% 75%, rgba(58,134,255,0.14), rgba(0,0,0,0) 70%)",
                                                    filter: "blur(14px)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {count > 1 ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => !atStart && goTo(active - 1)}
                                    aria-label="תמונה קודמת"
                                    aria-disabled={atStart}
                                    disabled={atStart}
                                    className={`absolute -translate-y-1/2 left-3 top-1/2 rounded-full border border-white/15 bg-black/35 backdrop-blur-md p-2.5 transition ${atStart ? "opacity-40 pointer-events-none" : "hover:bg-black/45 hover:shadow-[0_0_16px_rgba(255,46,126,0.35)]"
                                        }`}
                                >
                                    <IoIosArrowBack className="text-3xl md:text-4xl text-white/90" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => !atEnd && goTo(active + 1)}
                                    aria-label="תמונה הבאה"
                                    aria-disabled={atEnd}
                                    disabled={atEnd}
                                    className={`absolute -translate-y-1/2 right-3 top-1/2 rounded-full border border-white/15 bg-black/35 backdrop-blur-md p-2.5 transition ${atEnd ? "opacity-40 pointer-events-none" : "hover:bg-black/45 hover:shadow-[0_0_16px_rgba(255,119,69,0.35)]"
                                        }`}
                                >
                                    <IoIosArrowForward className="text-3xl md:text-4xl text-white/90" />
                                </button>

                                <div className="absolute flex items-center justify-center gap-2 -translate-x-1/2 bottom-3 left-1/2">
                                    {Array.from({ length: count }).map((_, i) => (
                                        <button
                                            key={`${uid}-dot-${i}`}
                                            type="button"
                                            onClick={() => goTo(i)}
                                            aria-label={`תמונה ${i + 1}`}
                                            className={`h-1.5 w-1.5 rounded-full transition-all ${active === i ? "w-6 bg-gradient-to-r from-[#FF2E7E] to-[#FF7745] shadow-[0_0_14px_rgba(255,46,126,0.35)]" : "bg-white/40 hover:bg-white/60"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

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
                if (alive) setProject(res.data || null);
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

    if (loading) {
        return (
            <div dir="rtl" className="min-h-[70vh] flex items-center justify-center">
                <div className="font-[Heebo] text-sm text-white/60">טוען…</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div dir="rtl" className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <div className="font-[Heebo] text-sm text-white/60">הפרויקט לא נמצא.</div>
                <Link
                    to="/"
                    className="inline-flex items-center justify-center py-3 border rounded-2xl border-white/15 px-7 text-white/90 hover:bg-white/5"
                    style={{ background: accentGradient }}
                >
                    חזרה לדף הבית
                </Link>
            </div>
        );
    }

    const longText = (project.longDescription || "").trim() || project.description;
    const live = (project.liveUrl || project.url || "").trim();

    return (
        <div dir="rtl">
            <div
                className="w-full min-h-screen bg-fixed bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/background4.png')" }}
            >
                <div aria-hidden className="h-24 md:h-28" />

                <div className="max-w-6xl px-5 pb-20 mx-auto sm:px-6 md:px-8">
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

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className="h-2 w-2 rounded-full bg-cyan-300/70 shadow-[0_0_12px_rgba(34,211,238,0.45)]" />
                            <span className="h-px w-[240px] sm:w-[420px] bg-gradient-to-l from-cyan-300/70 via-white/15 to-transparent" />
                            <span className="h-2 w-2 rounded-full bg-fuchsia-300/70 shadow-[0_0_12px_rgba(232,121,249,0.45)]" />
                        </div>
                    </motion.div>

                    <div aria-hidden className="h-10 md:h-12" />

                    {project.images?.length ? (
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-80px" }}
                            custom={1}
                        >
                            <ImageCarousel images={project.images.slice(0, 10)} title={project.clientName} />
                        </motion.div>
                    ) : null}

                    <div aria-hidden className="h-10 md:h-12" />

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        custom={2}
                        className="relative"
                    >
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -inset-4 rounded-[36px] opacity-75"
                            style={{
                                background:
                                    "radial-gradient(55% 55% at 50% 20%, rgba(58,134,255,0.14), rgba(0,0,0,0) 70%), radial-gradient(55% 55% at 25% 80%, rgba(255,46,126,0.12), rgba(0,0,0,0) 70%), radial-gradient(55% 55% at 75% 85%, rgba(0,201,167,0.10), rgba(0,0,0,0) 70%)",
                                filter: "blur(12px)",
                            }}
                        />

                        <div className="relative rounded-3xl border border-white/12 bg-black/35 backdrop-blur-xl shadow-[0_0_45px_rgba(0,0,0,0.55)] p-6 md:p-8">
                            <div className="flex flex-col items-center text-center">
                                <div
                                    className="h-[2px] w-full max-w-xs rounded-full opacity-95"
                                    style={{
                                        backgroundImage: "linear-gradient(90deg, #3A86FF, #00C9A7)",
                                        boxShadow: "0 0 12px rgba(58,134,255,0.6)",
                                    }}
                                />

                                <p className="mt-5 font-[Heebo] text-sm md:text-base text-white/85 leading-relaxed whitespace-pre-line max-w-3xl">
                                    {longText}
                                </p>

                                <div className="flex flex-col items-center justify-center gap-3 mt-7 sm:flex-row">
                                    {live ? (
                                        <a
                                            href={live}
                                            target="_blank"
                                            rel="noreferrer"
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
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
