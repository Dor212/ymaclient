import { useId, useRef, useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type CarouselItem = { src?: string; alt?: string; node?: ReactNode };

type PortfolioBlock = {
    items: CarouselItem[];
    clientName: string;
    projectType: string;
    description: string;
};

type PortfolioSectionProps = { id?: string; blocks?: PortfolioBlock[]; className?: string };

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

const DEFAULT_BLOCKS: PortfolioBlock[] = [
    {
        clientName: "סטודיו Bar.F",
        projectType: "אתר תדמית בקוד מלא",
        description:
            "סטודיו לעיצוב שצריך אתר שמרגיש כמו חוויה גרפית. עבדנו על שילוב בין ויז׳ואלים חזקים לניווט פשוט וברור. האתר בנוי לקידום תהליך יצירת קשר מהיר מבלי להעמיס על המשתמש.",
        items: [
            { src: "/ExampleWeb/BarF/BarF.png" },
            { src: "/ExampleWeb/BarF/BFI1.png" },
            { src: "/ExampleWeb/BarF/BFI2.png" },
            { src: "/ExampleWeb/BarF/BFI3.png" },
        ],
    },
    {
        clientName: "חנות אונליין Bar.F",
        projectType: "חנות אונליין וחיבור למערכות חיצוניות",
        description:
            "אתר מכירתי מהיר שמציג את המוצרים בצורה נקייה ומדויקת. דגש על חוויית רכישה חלקה במיוחד במובייל. המערכת מאפשרת ניהול מוצרים ותכנים בצורה עצמאית מצד הלקוחה.",
        items: [
            { src: "/ExampleWeb/BarF/BarF.png" },
            { src: "/ExampleWeb/BarF/BFI1.png" },
            { src: "/ExampleWeb/BarF/BFI2.png" },
            { src: "/ExampleWeb/BarF/BFI3.png" },
        ],
    },
    {
        clientName: "מערכת ניהול ל-Bar.F",
        projectType: "מערכת מותאמת אישית לעסק",
        description:
            "פאנל ניהול פנימי שתפור לצרכים של הסטודיו. המערכת מרימה את העבודה מאקסלים ומסמכים מפוזרים למקום אחד מסודר. מבנה מסכים מדויק שעוזר ללקוחה לשלוט בתהליך בלי ללמוד מערכת מורכבת.",
        items: [
            { src: "/ExampleWeb/BarF/BarF.png" },
            { src: "/ExampleWeb/BarF/BFI1.png" },
            { src: "/ExampleWeb/BarF/BFI2.png" },
            { src: "/ExampleWeb/BarF/BFI3.png" },
        ],
    },
];

function MiniCarousel({ items }: { items: CarouselItem[] }) {
    const uid = useId();
    const ref = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState(0);
    const count = items?.length || 0;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const w = el.clientWidth || 1;
                const idx = Math.round(el.scrollLeft / w);
                setActive(Math.max(0, Math.min(count - 1, idx)));
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
        const w = el.clientWidth;
        const next = Math.max(0, Math.min(count - 1, i));
        el.scrollTo({ left: next * w, behavior: "smooth" });
        setActive(next);
    };

    const atStart = active === 0;
    const atEnd = active === count - 1;

    return (
        <div className="relative w-full max-w-sm mx-auto flex flex-col items-center gap-[28px]">
            <div className="relative mx-auto aspect-square w-full max-w-[260px] rounded-full shadow-[0_0_20px_rgba(230,31,116,0.3)]">
                <div className="absolute inset-0 p-8 sm:p-9 md:p-10">
                    <div className="w-full h-full overflow-hidden border rounded-full bg-black/20 border-white/15">
                        <div
                            ref={ref}
                            dir="ltr"
                            className="flex h-full overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
                        >
                            {items.map((item, i) => (
                                <div key={`${uid}-slide-${i}`} className="w-full shrink-0 snap-center">
                                    {item.node ? (
                                        <div className="w-full h-full">{item.node}</div>
                                    ) : (
                                        <img
                                            src={item.src}
                                            alt={item.alt || `Portfolio ${i + 1}`}
                                            className="object-contain w-full h-full"
                                            draggable={false}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {count > 1 && (
                    <>
                        <button
                            onClick={() => !atStart && goTo(active - 1)}
                            aria-label="Previous"
                            aria-disabled={atStart}
                            disabled={atStart}
                            className={`absolute leading-none -translate-y-1/2 left-4 top-1/2 p-2 rounded-full bg-black/30 transition ${atStart ? "opacity-40 pointer-events-none" : "hover:shadow-[0_0_12px_#e61f74]"
                                }`}
                        >
                            <IoIosArrowBack className="text-4xl md:text-5xl" />
                        </button>
                        <button
                            onClick={() => !atEnd && goTo(active + 1)}
                            aria-label="Next"
                            aria-disabled={atEnd}
                            disabled={atEnd}
                            className={`absolute leading-none -translate-y-1/2 right-4 top-1/2 p-2 rounded-full bg-black/30 transition ${atEnd ? "opacity-40 pointer-events-none" : "hover:shadow-[0_0_12px_#e61f74]"
                                }`}
                        >
                            <IoIosArrowForward className="text-4xl md:text-5xl" />
                        </button>
                    </>
                )}

                <svg
                    className="absolute inset-0 transition pointer-events-none opacity-90 hover:opacity-100"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id={`ring-${uid}`} x1="0" y1="0" x2="1" y2="1">
                            <animateTransform
                                attributeName="gradientTransform"
                                type="rotate"
                                from="0 0.5 0.5"
                                to="360 0.5 0.5"
                                dur="8s"
                                repeatCount="indefinite"
                            />
                            <stop offset="0%" stopColor="#FF2E7E" />
                            <stop offset="100%" stopColor="#FF7745" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="49" fill="none" stroke={`url(#ring-${uid})`} strokeWidth="2" />
                </svg>
            </div>

            {count > 1 && (
                <div className="flex items-center justify-center gap-2">
                    {Array.from({ length: count }).map((_, i) => (
                        <button
                            key={`${uid}-dot-${i}`}
                            onClick={() => goTo(i)}
                            aria-label={`Slide ${i + 1}`}
                            className={`h-1.5 w-1.5 rounded-full transition-all ${active === i
                                    ? "w-5 bg-gradient-to-r from-[#FF2E7E] to-[#FF7745]"
                                    : "bg-white/40 hover:bg-white/60"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function PortfolioSection({
    id = "portfolio",
    blocks,
    className = "",
}: PortfolioSectionProps) {
    const data = blocks?.length ? blocks : DEFAULT_BLOCKS;

    return (
        <section id={id} className={`w-full pt-16 md:pt-20 pb-24 md:pb-28 ${className}`}>
            <div className="px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {data.map((b, i) => (
                        <motion.div
                            key={`block-${i}`}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, margin: "-80px" }}
                            custom={i}
                            className="flex flex-col items-center gap-4 text-center"
                        >
                            <MiniCarousel items={b.items} />

                            <div className="flex flex-col items-center gap-1">
                                <h3 className="mt-1 text-lg font-semibold text-white">
                                    {b.clientName}
                                </h3>
                                <p className="text-xs font-medium text-white/70">
                                    {b.projectType}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <p className="max-w-sm mx-auto text-sm leading-relaxed text-white/80">
                                    {b.description}
                                </p>

                                <Link
                                    to="/about-site"
                                    title="על האתר"
                                    className="inline-flex justify-center items-center rounded-2xl border border-[#3A86FF]/65 bg-white/5 px-9 py-3 min-w-[10.5rem] text-white text-center hover:bg-white/[0.08] hover:shadow-[0_0_18px_rgba(58,134,255,0.55)] focus:outline-none focus:ring-2 focus:ring-[#3A86FF]/70"
                                >
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3A86FF] to-[#00C9A7] font-semibold">
                                        על האתר
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
