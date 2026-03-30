import { ArrowRight } from "lucide-react";

type FinalSubmitSectionProps = {
  isSubmitting: boolean;
};

export default function FinalSubmitSection({ isSubmitting }: FinalSubmitSectionProps) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(6,10,20,0.82),rgba(16,8,20,0.7))] p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-right">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#8FE7FF]/75">FINAL STEP</p>
          <h3 className="mt-2 text-2xl font-black text-white">זהו. מכאן זה עובר אליי.</h3>
          <p className="mt-3 max-w-3xl text-[14px] leading-7 text-white/70">
            אחרי השליחה אעבור על הכול ואחזור אליך עם המשך מסודר. אם משהו עדיין לא היה לך ברור, זה בסדר גמור.
            עדיף לשלוח תמונה טובה של הכיוון, מאשר להתקע על תשובה מושלמת.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3A86FF]/35 bg-[linear-gradient(90deg,#FF2E7E,#3A86FF,#FF7745)] px-6 py-3.5 text-[15px] font-black text-white shadow-[0_0_26px_rgba(58,134,255,0.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "שולח עכשיו..." : "שליחת השאלון"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
