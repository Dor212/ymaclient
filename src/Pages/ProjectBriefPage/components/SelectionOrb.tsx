import { motion } from "framer-motion";
import { fadeUp } from "../projectBrief.constants";
import type { ProjectOption } from "../projectBrief.types";

type SelectionOrbProps = {
  option: ProjectOption;
  index: number;
  className?: string;
  onClick: () => void;
};

export default function SelectionOrb({ option, index, className = "", onClick }: SelectionOrbProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index + 1}
      className={`flex items-center justify-center ${className}`}
    >
      <div className="relative flex h-[112px] w-[112px] items-center justify-center sm:h-[142px] sm:w-[142px] lg:h-[210px] lg:w-[210px] xl:h-[230px] xl:w-[230px]">
        <motion.button
          type="button"
          onClick={onClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border border-white/12 text-center backdrop-blur-xl transition sm:h-[122px] sm:w-[122px] lg:h-[182px] lg:w-[182px] xl:h-[194px] xl:w-[194px]"
          style={{
            background: "linear-gradient(145deg, rgba(8,13,25,0.90), rgba(18,10,24,0.82))",
            boxShadow: "0 0 18px rgba(255,46,126,0.08), 0 0 14px rgba(58,134,255,0.08)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 18% 18%, rgba(58,134,255,0.18), transparent 32%), radial-gradient(circle at 84% 16%, rgba(255,46,126,0.15), transparent 28%), radial-gradient(circle at 50% 100%, rgba(255,119,69,0.10), transparent 30%)",
            }}
          />
          <div className="pointer-events-none absolute inset-[8px] rounded-full border border-white/10" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-2.5 sm:px-4">
            <div className="max-w-[9ch] text-[10.5px] font-extrabold leading-tight text-white sm:max-w-[11ch] sm:text-[13px] xl:text-[18px]">
              {option.title}
            </div>
            <span
              className="mt-3 h-[3px] rounded-full"
              style={{
                width: "42px",
                background: "linear-gradient(90deg, #3A86FF 0%, #FF2E7E 55%, #FF7745 100%)",
                boxShadow: "0 0 12px rgba(58,134,255,0.35)",
              }}
            />
            <p className="mt-1.5 text-[9px] font-medium text-white/42 sm:mt-2.5 sm:text-[10px]">לחצו להסבר</p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
