import { motion } from "framer-motion";
import { fadeUp, PROJECT_OPTIONS } from "../projectBrief.constants";
import { SentenceLines } from "../projectBrief.utils";
import SelectionOrb from "../components/SelectionOrb";
import type { BriefErrors, ProjectType } from "../projectBrief.types";

type SelectionScreenProps = {
  errors: BriefErrors;
  onOpenPreview: (type: ProjectType) => void;
};

export default function SelectionScreen({ errors, onOpenPreview }: SelectionScreenProps) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={0}
      className="flex min-h-[100svh] flex-col justify-center py-0"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex justify-center">
          <img src="/Logo.png" alt="YMA" className="h-14 w-auto select-none sm:h-20" />
        </div>

        <h1 className="mt-2 text-[1.45rem] font-black leading-tight sm:mt-3 sm:text-[2.3rem] lg:text-[3rem]">
          <span className="bg-gradient-to-r from-[#FF2E7E] via-[#3A86FF] to-[#FF7745] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(58,134,255,0.28)]">
            בוחרים מסלול,
          </span>
          <br />
          <span className="text-white">ומשם עוברים ישר לשאלון המדויק בשבילך</span>
        </h1>

        <SentenceLines
          text="לא צריך להבין בבניית אתרים. פשוט לבחור את האפשרות שהכי קרובה למה שיש לך בראש. לקרוא הסבר קצר. ואז להמשיך לשאלון שמותאם בדיוק לסוג הפרויקט שבחרת."
          className="mx-auto mt-2 max-w-[42rem] text-[12px] leading-5 text-white/70 sm:mt-3 sm:text-[14px] sm:leading-6"
        />
      </div>

      {errors.selectedType ? <p className="mt-3 text-center text-sm text-[#FF9DBD]">{errors.selectedType}</p> : null}

      <div className="mx-auto mt-3 grid max-w-[286px] grid-cols-2 place-items-center gap-x-1.5 gap-y-1.5 sm:mt-4 sm:max-w-[332px] sm:gap-x-2 sm:gap-y-2 md:max-w-[780px] md:grid-cols-3 md:gap-x-6 md:gap-y-5 xl:max-w-[1260px] xl:grid-cols-5 xl:gap-4">
        {PROJECT_OPTIONS.map((option, index) => {
          const isLastMobileItem = index === PROJECT_OPTIONS.length - 1;

          return (
            <SelectionOrb
              key={option.id}
              option={option}
              index={index}
              className={isLastMobileItem ? "col-span-2 justify-self-center md:col-span-1" : ""}
              onClick={() => onOpenPreview(option.id)}
            />
          );
        })}
      </div>

      <SentenceLines
        text="לחיצה על כל עיגול תפתח הסבר קצר ופשוט. כדי שיהיה קל להבין מה באמת מתאים לעסק שלך לפני שממשיכים."
        className="mx-auto mt-3 max-w-xl text-center text-[11px] leading-5 text-white/48 sm:mt-4 sm:text-[12px] sm:leading-6"
      />
    </motion.section>
  );
}
