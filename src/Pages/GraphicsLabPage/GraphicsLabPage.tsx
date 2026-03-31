import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, LoaderCircle, RectangleVertical, Smartphone, Sparkles } from "lucide-react";
import { toPng } from "html-to-image";
import JSZip from "jszip";
import PageSEO from "../../components/seo/PageSEO";

type PosterFormat = "feed" | "story";

const EXPORT_SIZES: Record<PosterFormat, { width: number; height: number; label: string; fileSuffix: string }> = {
    feed: {
        width: 1080,
        height: 1350,
        label: "4:5",
        fileSuffix: "4x5",
    },
    story: {
        width: 1080,
        height: 1920,
        label: "9:16",
        fileSuffix: "9x16",
    },
};

function slugifyFilename(value: string) {
    const trimmed = value.trim();

    if (!trimmed) {
        return "yma-graphic";
    }

    const latinOnly = trimmed
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    if (latinOnly) {
        return latinOnly;
    }

    return "yma-graphic";
}

async function dataUrlToBlob(dataUrl: string) {
    const response = await fetch(dataUrl);
    return response.blob();
}

async function waitForFonts() {
    if ("fonts" in document) {
        await document.fonts.ready;
    }
}

function downloadBlob(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
}

function AccentWord({
    children,
    tone = "cyan",
}: {
    children: ReactNode;
    tone?: "cyan" | "pink" | "violet" | "mint";
}) {
    const toneClass =
        tone === "pink"
            ? "from-[#ffb0e8] via-[#ff62b3] to-[#ff9c5f]"
            : tone === "violet"
                ? "from-[#efe4ff] via-[#b68cff] to-[#77e7ff]"
                : tone === "mint"
                    ? "from-[#dbfff4] via-[#72ffd2] to-[#52b6ff]"
                    : "from-[#c8fbff] via-[#54dfff] to-[#8c98ff]";

    return <span className={`bg-gradient-to-r ${toneClass} bg-clip-text text-transparent [text-shadow:none]`}>{children}</span>;
}

function GraphicsPoster({ format }: { format: PosterFormat }) {
    const isStory = format === "story";

    return (
        <div dir="rtl" className="relative h-full w-full overflow-hidden rounded-[2.8rem] border border-white/10 bg-[#04030c] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(90,72,255,0.30),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(59,228,255,0.16),transparent_26%),radial-gradient(circle_at_74%_84%,rgba(255,92,182,0.22),transparent_30%),radial-gradient(circle_at_24%_74%,rgba(92,255,208,0.12),transparent_26%),linear-gradient(160deg,#04020b_0%,#0a0820_42%,#040613_100%)]" />

            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
                    backgroundSize: isStory ? "56px 56px" : "50px 50px",
                }}
            />

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
            <div className="absolute left-[9%] top-[11%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(77,230,255,0.92)]" />
            <div className="absolute right-[11%] top-[17%] h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_16px_rgba(180,132,255,0.95)]" />
            <div className="absolute left-[15%] bottom-[13%] h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(111,255,214,0.85)]" />
            <div className="absolute right-[16%] bottom-[10%] h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_18px_rgba(255,107,191,0.88)]" />

            <div className="absolute -top-[10%] right-[3%] h-[23rem] w-[23rem] rounded-full bg-[#7d5bff]/16 blur-3xl" />
            <div className="absolute left-[-10%] top-[34%] h-[20rem] w-[20rem] rounded-full bg-cyan-400/8 blur-3xl" />
            <div className="absolute bottom-[-12%] right-[16%] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="absolute bottom-[22%] left-[8%] h-[14rem] w-[14rem] rounded-full bg-emerald-400/8 blur-3xl" />

            <div
                className={`relative z-10 flex h-full flex-col items-center ${isStory ? "px-[1.7rem] pb-[1.5rem] pt-[0.75rem]" : "px-[1.4rem] pb-[1.2rem] pt-[0.65rem]"
                    }`}
            >
                <div className={`flex w-full justify-center ${isStory ? "min-h-[13%]" : "min-h-[12%]"}`}>
                    <div
                        className={`relative flex items-center justify-center rounded-full border border-white/10 shadow-[0_22px_70px_rgba(0,0,0,0.34)] ${isStory ? "h-[24rem] w-[24rem] translate-y-[20rem]" : "h-[19rem] w-[19rem] translate-y-[14.4rem]"
                            }`}
                        style={{
                            background:
                                "radial-gradient(circle at 50% 42%, rgba(19,25,49,0.98) 0%, rgba(10,14,32,0.95) 62%, rgba(6,9,22,0.92) 100%)",
                        }}
                    >
                        <div className="absolute inset-[6.5%] rounded-full border border-white/7" />
                        <img
                            src="/Logo.png"
                            alt="Y.M.A"
                            className={`${isStory ? "h-[15.8rem] w-[15.8rem]" : "h-[12.8rem] w-[12.8rem]"} relative z-10 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.34)]`}
                            draggable={false}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center flex-1 w-full text-center">
                    <div
                        className="w-full"
                        style={{
                            textShadow: "0 12px 34px rgba(0,0,0,0.38)",
                            fontFamily: '"Secular One", "Rubik", "Heebo", sans-serif',
                            fontWeight: 900,
                        }}
                    >
                        <div className={`${isStory ? "space-y-1 leading-[0.82]" : "space-y-0.5 leading-[0.82]"}`}>
                            <div className={`${isStory ? "text-[10.4rem]" : "text-[8.45rem]"} tracking-[-0.085em]`}>
                                <AccentWord tone="mint">רוצים להבין</AccentWord>
                            </div>

                            <div className={`${isStory ? "text-[8.75rem]" : "text-[7.1rem]"} tracking-[-0.082em]`}>
                                <AccentWord tone="violet">מה העסק שלכם</AccentWord>
                            </div>

                            <div className={`${isStory ? "text-[8.5rem]" : "text-[6.95rem]"} tracking-[-0.08em]`}>
                                <AccentWord tone="cyan">באמת צריך</AccentWord>
                            </div>

                            <div className={`${isStory ? "text-[8.2rem]" : "text-[6.65rem]"} tracking-[-0.08em]`}>
                                <AccentWord tone="pink">באתר</AccentWord>
                                <span className="text-white/42">,</span>
                            </div>

                            <div className={`${isStory ? "text-[6.9rem]" : "text-[5.6rem]"} tracking-[-0.072em]`}>
                                <AccentWord tone="mint">בלי להתחייב לכלום</AccentWord>
                                <span className="text-white/84">?</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PreviewCard({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: ReactNode;
}) {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(5,10,22,0.8),rgba(13,18,34,0.72))] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                    <div className="text-lg font-extrabold text-white">{title}</div>
                    <div className="text-sm text-white/56">{subtitle}</div>
                </div>
            </div>
            {children}
        </div>
    );
}

export default function GraphicsLabPage() {
    const [fileName, setFileName] = useState("brief-hook-02");
    const [isExporting, setIsExporting] = useState(false);

    const feedExportRef = useRef<HTMLDivElement | null>(null);
    const storyExportRef = useRef<HTMLDivElement | null>(null);

    const normalizedFileName = useMemo(() => slugifyFilename(fileName), [fileName]);

    useEffect(() => {
        const fontId = "graphics-lab-display-fonts";

        if (document.getElementById(fontId)) {
            return;
        }

        const link = document.createElement("link");
        link.id = fontId;
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Rubik:wght@700;800;900&family=Secular+One&display=swap";
        document.head.appendChild(link);
    }, []);

    const exportPoster = async (node: HTMLDivElement, format: PosterFormat) => {
        const preset = EXPORT_SIZES[format];

        return toPng(node, {
            cacheBust: true,
            pixelRatio: 1,
            canvasWidth: preset.width,
            canvasHeight: preset.height,
            skipAutoScale: true,
        });
    };

    const handleDownloadZip = async () => {
        if (!feedExportRef.current || !storyExportRef.current || isExporting) {
            return;
        }

        try {
            setIsExporting(true);
            await waitForFonts();

            const [feedDataUrl, storyDataUrl] = await Promise.all([
                exportPoster(feedExportRef.current, "feed"),
                exportPoster(storyExportRef.current, "story"),
            ]);

            const zip = new JSZip();
            zip.file(`${normalizedFileName}-${EXPORT_SIZES.feed.fileSuffix}.png`, await dataUrlToBlob(feedDataUrl));
            zip.file(`${normalizedFileName}-${EXPORT_SIZES.story.fileSuffix}.png`, await dataUrlToBlob(storyDataUrl));

            const blob = await zip.generateAsync({ type: "blob" });
            downloadBlob(blob, `${normalizedFileName}.zip`);
        } catch (error) {
            console.error("Failed to export graphics ZIP", error);
            window.alert("הייצוא לא הצליח כרגע. תן לי סיבוב נוסף אחרי רענון קצר.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div dir="rtl" className="relative px-5 py-8 overflow-hidden sm:px-6 lg:px-8">
            <PageSEO
                path="/graphics-lab"
                title="Y.M.A | Graphics Lab"
                description="עמוד עבודה זמני לבניית גרפיקות יצוא ב-4:5 ו-9:16 מתוך הקוד של Y.M.A."
            />

            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] opacity-90 blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle at 16% 10%, rgba(101, 86, 255, 0.26), transparent 28%), radial-gradient(circle at 84% 10%, rgba(64, 224, 255, 0.16), transparent 26%), radial-gradient(circle at 58% 0%, rgba(255, 96, 176, 0.14), transparent 38%)",
                }}
            />

            <div className="mx-auto max-w-[1800px]">
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                    className="grid gap-6 xl:grid-cols-[20rem_minmax(0,1fr)]"
                >
                    <aside className="rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(5,11,24,0.88),rgba(13,15,30,0.75))] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_32px_80px_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:p-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] px-3 py-1.5 text-sm font-bold text-cyan-200">
                            <Sparkles className="w-4 h-4" strokeWidth={1.8} />
                            Graphics Lab
                        </div>

                        <div className="mt-5 space-y-3">
                            <h1 className="text-[2rem] font-black leading-none tracking-[-0.04em] text-white">גרפיקה 02</h1>
                            <p className="text-sm leading-7 text-white/62">אותו מבנה, אותו מיקום, אותו לוגו. רק הוק חדש ואווירה צבעונית קצת אחרת.</p>
                        </div>

                        <label className="block mt-6 space-y-2">
                            <span className="text-sm font-bold text-white/72">שם קובץ</span>
                            <input
                                value={fileName}
                                onChange={(event) => setFileName(event.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base font-medium text-white outline-none transition focus:border-cyan-300/40 focus:bg-white/[0.06]"
                                placeholder="brief-hook-02"
                            />
                        </label>

                        <button
                            type="button"
                            onClick={handleDownloadZip}
                            disabled={isExporting}
                            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-[1.35rem] border border-cyan-300/20 bg-[linear-gradient(120deg,rgba(8,218,255,0.18),rgba(98,77,255,0.22),rgba(255,73,151,0.18))] px-5 py-4 text-base font-extrabold text-white shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition hover:scale-[1.01] hover:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isExporting ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                            {isExporting ? "מייצא את שתי הגרסאות..." : "Download ZIP"}
                        </button>

                        <div className="mt-4 rounded-[1.4rem] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-7 text-white/56">
                            בפנים יחכו לך שני קבצים:
                            <br />
                            <span className="font-semibold text-white/78">{normalizedFileName}-4x5.png</span>
                            <br />
                            <span className="font-semibold text-white/78">{normalizedFileName}-9x16.png</span>
                        </div>
                    </aside>

                    <section className="grid gap-6 xl:grid-cols-[minmax(0,0.62fr)_minmax(0,0.62fr)]">
                        <PreviewCard title="תצוגת 4:5" subtitle="פיד, מודעות, פוסט אנכי">
                            <div className="mx-auto w-full max-w-[30rem] rounded-[2rem] border border-white/8 bg-black/20 p-3">
                                <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                                    <GraphicsPoster format="feed" />
                                </div>
                            </div>
                        </PreviewCard>

                        <PreviewCard title="תצוגת 9:16" subtitle="סטורי, ריל, מסך לאורך מלא">
                            <div className="mx-auto w-full max-w-[24rem] rounded-[2rem] border border-white/8 bg-black/20 p-3">
                                <div className="aspect-[9/16] overflow-hidden rounded-[1.6rem]">
                                    <GraphicsPoster format="story" />
                                </div>
                            </div>
                        </PreviewCard>
                    </section>
                </motion.div>
            </div>

            <div aria-hidden className="pointer-events-none fixed left-[-10000px] top-0 z-[-1] opacity-100">
                <div ref={feedExportRef} style={{ width: EXPORT_SIZES.feed.width, height: EXPORT_SIZES.feed.height }}>
                    <GraphicsPoster format="feed" />
                </div>

                <div ref={storyExportRef} style={{ width: EXPORT_SIZES.story.width, height: EXPORT_SIZES.story.height, marginTop: 48 }}>
                    <GraphicsPoster format="story" />
                </div>
            </div>

            <div className="grid gap-4 mt-8 sm:grid-cols-2 xl:hidden">
                <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/62">
                    <div className="flex items-center gap-2 mb-1 font-bold text-white/82">
                        <RectangleVertical className="w-4 h-4" />
                        יצוא {EXPORT_SIZES.feed.label}
                    </div>
                    {EXPORT_SIZES.feed.width} × {EXPORT_SIZES.feed.height}
                </div>
                <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/62">
                    <div className="flex items-center gap-2 mb-1 font-bold text-white/82">
                        <Smartphone className="w-4 h-4" />
                        יצוא {EXPORT_SIZES.story.label}
                    </div>
                    {EXPORT_SIZES.story.width} × {EXPORT_SIZES.story.height}
                </div>
            </div>
        </div>
    );
}