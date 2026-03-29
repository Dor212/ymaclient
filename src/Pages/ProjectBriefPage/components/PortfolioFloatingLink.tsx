import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

function handlePortfolioNavigation() {
  try {
    sessionStorage.setItem("ymaScrollTarget", "portfolio");
  } catch {
    // ignore storage issues
  }
}

export default function PortfolioFloatingLink() {
  return (
    <a
      href="/#portfolio"
      aria-label="לעבודות מוכנות ולאתרים מוכנים של YMA"
      onClick={handlePortfolioNavigation}
      className="fixed bottom-4 left-4 z-[70] md:bottom-6 md:left-6"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="group flex items-center gap-3 rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(8,12,24,0.92),rgba(19,11,27,0.9))] px-3 py-2 pr-2 shadow-[0_0_26px_rgba(58,134,255,0.2)] backdrop-blur-xl"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_20px_rgba(255,46,126,0.18)] md:h-14 md:w-14">
          <img
            src="/icons/planet3.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover select-none"
            draggable={false}
          />
        </div>

        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#8FE7FF]/70 md:text-[11px] md:tracking-[0.24em]">
            portfolio
          </p>
          <p className="text-[12px] font-bold leading-5 text-white sm:text-[13px] md:text-sm">
            לעבודות מוכנות
          </p>
          <p className="text-[11px] leading-4 text-white/65 sm:text-[12px] md:leading-5">
            קפיצה ישר לאתרים המוכנים
          </p>
        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 transition group-hover:translate-x-[-2px]">
          <ArrowLeft className="h-4 w-4" />
        </span>
      </motion.div>
    </a>
  );
}
