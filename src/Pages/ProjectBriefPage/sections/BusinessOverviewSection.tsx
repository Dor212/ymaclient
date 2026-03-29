import { Sparkles } from "lucide-react";
import { GOAL_OPTIONS } from "../projectBrief.constants";
import { FieldShell, RadioGrid, SectionLabel, TextArea } from "../components/FormControls";
import type { BriefErrors, FormState, GoalOption, SetFormField } from "../projectBrief.types";

type BusinessOverviewSectionProps = {
  form: FormState;
  errors: BriefErrors;
  setField: SetFormField;
};

export default function BusinessOverviewSection({ form, errors, setField }: BusinessOverviewSectionProps) {
  return (
    <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
      <SectionLabel
        icon={Sparkles}
        title="על העסק"
        caption="בחלק הזה המטרה היא להבין במה העסק עוסק, למי הוא מדבר, ואיזה רושם אתה רוצה שהאתר ייצור."
      />

      <div className="space-y-5">
        <FieldShell
          label="מה העסק שלך עושה ולמי הוא פונה?"
          required
          help="אפשר לכתוב פשוט, כאילו מישהו שאל אותך במה אתה עוסק ולמי זה מתאים."
          error={errors.businessSummary}
        >
          <TextArea
            value={form.businessSummary}
            onChange={(value) => setField("businessSummary", value)}
            rows={6}
            placeholder={
              "לדוגמה:\nאני בונה אתרים לעסקים שרוצים נראות מקצועית יותר ולידים מסודרים\nאני מלווה משפחות וזוגות צעירים בתכנון פיננסי\nאני מוכרת מארזי מתנה לעסקים ולאנשים פרטיים\nאני מקעקע אנשים שמחפשים קו אישי, מדויק ונקי"
            }
          />
        </FieldShell>

        <FieldShell label="מה אתה רוצה שהאתר יעזור לך להשיג בפועל?" help="מה הדבר הכי חשוב שיקרה בזכות האתר הזה." error={errors.mainGoal}>
          <RadioGrid value={form.mainGoal} onChange={(value) => setField("mainGoal", value as GoalOption)} options={GOAL_OPTIONS} />
        </FieldShell>

        {form.mainGoal === "other" ? (
          <FieldShell label="אם בחרת משהו אחר, מה הכי חשוב לך שהאתר יעשה?" required error={errors.mainGoalOther}>
            <TextArea
              value={form.mainGoalOther}
              onChange={(value) => setField("mainGoalOther", value)}
              rows={4}
              placeholder={
                "לדוגמה:\nשאנשים יבינו מהר מה אני עושה\nשיהיה לי מקום אחד מסודר לשלוח אליו לקוחות\nשיהיה אפשר להציג שירות מסוים בצורה הרבה יותר טובה"
              }
            />
          </FieldShell>
        ) : null}

        <FieldShell
          label="כשמישהו נכנס לאתר, מה הכי חשוב לך שהוא יבין או ירגיש כבר בהתחלה?"
          required
          help="זה יכול להיות מסר, תחושה, רושם מקצועי, או משהו שחשוב לך שיעבור מהר."
          error={errors.firstImpression}
        >
          <TextArea
            value={form.firstImpression}
            onChange={(value) => setField("firstImpression", value)}
            rows={5}
            placeholder={
              "לדוגמה:\nשאני מקצועי ואפשר לסמוך עליי\nשיש כאן שירות אישי ולא משהו גנרי\nשמדובר במותג איכותי\nשקל לפנות אליי\nשאני נותן פתרון ברור ולא רק עוד שירות"
            }
          />
        </FieldShell>
      </div>
    </section>
  );
}
