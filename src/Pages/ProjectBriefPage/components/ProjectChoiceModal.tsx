import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SentenceLines } from "../projectBrief.utils";
import type { ProjectOption } from "../projectBrief.types";

type ProjectChoiceModalProps = {
  option: ProjectOption;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ProjectChoiceModal({ option, onClose, onConfirm }: ProjectChoiceModalProps) {
  return (
    <>
      <motion.button
        key="project-choice-backdrop"
        type="button"
        aria-label="סגירת חלון"
        className="fixed inset-0 z-[120] bg-[#050816]/62 backdrop-blur-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[130] flex items-center justify-center px-4 md:px-8">
        <motion.div
          key={`project-choice-modal-${option.id}`}
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 18 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[390px] md:max-w-[780px] lg:max-w-[860px]"
          dir="rtl"
        >
          <div
            className="relative isolate overflow-hidden rounded-[30px] border border-white/12 text-center backdrop-blur-xl md:rounded-[34px]"
            style={{
              background: "linear-gradient(145deg, rgba(8,13,25,0.97), rgba(22,10,29,0.93))",
              boxShadow: "0 0 42px rgba(58,134,255,0.16), 0 0 42px rgba(255,46,126,0.12)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 18% 18%, rgba(58,134,255,0.22), transparent 32%), radial-gradient(circle at 84% 16%, rgba(255,46,126,0.18), transparent 28%), radial-gradient(circle at 50% 100%, rgba(255,119,69,0.12), transparent 30%)",
              }}
            />

            <div className="pointer-events-none absolute inset-[12px] rounded-[24px] border border-white/10 md:inset-[16px] md:rounded-[28px]" />

            <button
              type="button"
              onClick={onClose}
              aria-label="סגור"
              className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg font-bold text-white/78 transition hover:bg-white/[0.08] active:scale-[0.96] md:left-5 md:top-5"
            >
              ×
            </button>

            <div className="relative z-10 px-6 pb-7 pt-12 md:px-12 md:pb-10 md:pt-12 lg:px-16 lg:pb-12">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#8FE7FF]/75">PROJECT TYPE</p>
              <h3 className="mx-auto mt-3 max-w-[15ch] text-[24px] font-extrabold leading-tight text-white md:max-w-none md:text-[34px] lg:text-[38px]">
                {option.title}
              </h3>

              <span
                className="mx-auto mt-4 block h-[3px] rounded-full"
                style={{
                  width: "118px",
                  background: "linear-gradient(90deg, #3A86FF 0%, #FF2E7E 55%, #FF7745 100%)",
                  boxShadow: "0 0 12px rgba(58,134,255,0.35)",
                }}
              />

              <SentenceLines text={option.short} className="mt-5 text-[14px] font-semibold leading-6 text-white/88 md:text-[18px] md:leading-7" />

              <div className="mx-auto mt-5 max-w-[66ch] rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-right backdrop-blur-md md:mt-6 md:px-8 md:py-7">
                <SentenceLines text={option.description} className="text-[14px] leading-6 text-white/78 md:text-[16px] md:leading-7" />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-8">
                <button
                  type="button"
                  onClick={onConfirm}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3A86FF]/35 bg-[linear-gradient(90deg,#FF2E7E,#3A86FF,#FF7745)] px-6 py-3.5 text-[15px] font-black text-white shadow-[0_0_26px_rgba(58,134,255,0.22)] transition hover:scale-[1.01]"
                >
                  לבחור במסלול הזה
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-6 py-3.5 text-[15px] font-bold text-white/85 transition hover:border-white/22 hover:bg-white/[0.08]"
                >
                  זה לא מה שחיפשתי
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
