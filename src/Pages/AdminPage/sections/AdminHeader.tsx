import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function AdminHeader({ loading }: { loading: boolean }) {
    return (
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

            <div className="flex items-center justify-center gap-3 mt-1">
                <span className="h-2 w-2 rounded-full bg-cyan-300/70 shadow-[0_0_12px_rgba(34,211,238,0.45)]" />
                <span className="h-px w-[260px] sm:w-[420px] bg-gradient-to-l from-cyan-300/70 via-white/20 to-transparent" />
                <span className="h-2 w-2 rounded-full bg-fuchsia-300/70 shadow-[0_0_12px_rgba(232,121,249,0.45)]" />
            </div>

            <p className="mt-1 font-[Heebo] text-sm md:text-base text-white/75 max-w-2xl mx-auto leading-relaxed">
                <span className="block">מכאן תנהל את הלקוחות שמדברים עם מתעניינים,</span>
                <span className="block">ואת האתרים שמופיעים בעמוד "על האתר".</span>
            </p>

            {loading ? (
                <p className="mt-3 text-white/60 text-sm font-[Heebo]">טוען נתונים…</p>
            ) : null}
        </motion.div>
    );
}
