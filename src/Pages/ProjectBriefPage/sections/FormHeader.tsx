import { ChevronDown } from "lucide-react";
import { SentenceLines } from "../projectBrief.utils";
import type { ProjectOption } from "../projectBrief.types";

type FormHeaderProps = {
  selectedOption: ProjectOption;
  onChangeProject: () => void;
};

export default function FormHeader({ selectedOption, onChangeProject }: FormHeaderProps) {
  return (
    <>
      <div className="mb-5 flex justify-center sm:mb-6">
        <button
          type="button"
          onClick={onChangeProject}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-[13px] font-bold text-white transition hover:border-white/22 hover:bg-white/[0.08]"
        >
          <ChevronDown className="h-4 w-4" />
          בחירת מסלול אחר
        </button>
      </div>

      <div className="mb-6 rounded-[28px] border border-white/10 bg-black/20 p-5 sm:mb-7 sm:p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#8FE7FF]/75">FOCUSED QUESTIONS</p>
          <h2 className="text-[1.7rem] font-black leading-tight text-white sm:text-[2.1rem]">{selectedOption.title}</h2>
          <SentenceLines
            text="כאן מתחיל החלק הממוקד. השאלות שמופיעות בהמשך בנויות כדי להבין את הכיוון בצורה רחבה. בלי להעמיס. ובלי לבקש ממך עדיין לרדת לפרטים קטנים כמו מחירים, קטלוג מלא או חומר סופי."
            className="mx-auto max-w-3xl text-[13px] leading-6 text-white/72 sm:text-[14px] sm:leading-6"
          />

          <div className="w-full max-w-xl rounded-[24px] border border-[#3A86FF]/20 bg-[linear-gradient(135deg,rgba(58,134,255,0.12),rgba(255,46,126,0.08))] px-5 py-4 text-center">
            <p className="text-[12px] font-bold text-white/68">מה כדאי לדעת לפני שמתחילים</p>
            <SentenceLines
              text='אפשר לכתוב פשוט. אפשר לענות גם חלקית. ואם משהו עוד לא סגור זה ממש בסדר. עדיף לרשום איך אתה מרגיש את העסק והכיוון, מאשר לנסות לענות "מושלם".'
              className="mt-2 text-[13px] leading-6 text-white/82"
            />
          </div>
        </div>
      </div>
    </>
  );
}
