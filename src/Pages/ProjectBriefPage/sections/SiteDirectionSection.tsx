import { Palette } from "lucide-react";
import { DESIGN_OPTIONS, IMPORTANT_ITEMS_OPTIONS } from "../projectBrief.constants";
import { CheckboxGrid, FieldShell, RadioGrid, SectionLabel, TextArea } from "../components/FormControls";
import { toggleArrayValue } from "../projectBrief.utils";
import type { BriefErrors, DesignOption, FormState, SetFormField } from "../projectBrief.types";

type SiteDirectionSectionProps = {
  form: FormState;
  errors: BriefErrors;
  setField: SetFormField;
};

export default function SiteDirectionSection({ form, errors, setField }: SiteDirectionSectionProps) {
  return (
    <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
      <SectionLabel
        icon={Palette}
        title="כיוון לאתר"
        caption="כאן המטרה להבין מה חשוב לכלול באתר, איזה סגנון מתאים לך, ומה כבר קיים אצלך היום."
      />

      <div className="space-y-5">
        <FieldShell label="מה חשוב שיכלול האתר?" help="אפשר לסמן כמה דברים. לא צריך לדעת אם הכול ייכנס בסוף, רק מה חשוב לך כרגע." error={errors.importantItems}>
          <CheckboxGrid
            values={form.importantItems}
            onToggle={(value) => setField("importantItems", toggleArrayValue(form.importantItems, value))}
            options={IMPORTANT_ITEMS_OPTIONS}
          />
        </FieldShell>

        {form.importantItems.includes("other") ? (
          <FieldShell label="מה עוד חשוב לך שיהיה באתר?" required error={errors.importantItemsOther}>
            <TextArea
              value={form.importantItemsOther}
              onChange={(value) => setField("importantItemsOther", value)}
              rows={4}
              placeholder={"לדוגמה:\nלוח זמנים\nמחשבון קצר\nאזור לשאלון\nחיבור לקלנדר\nמקום לשלוח חומר ללקוח"}
            />
          </FieldShell>
        ) : null}

        <FieldShell label="איזה כיוון עיצובי מרגיש לך נכון?" help="לא צריך להבין בעיצוב. פשוט לבחור מה הכי קרוב לאופי של העסק שלך." error={errors.designStyle}>
          <RadioGrid value={form.designStyle} onChange={(value) => setField("designStyle", value as DesignOption)} options={DESIGN_OPTIONS} />
        </FieldShell>

        <FieldShell label="אם יש משהו שחשוב לך בעיצוב, אפשר לפרט כאן" help="לדוגמה צבעים, תחושה, רמת ניקיון, או מה אתה אוהב ולא אוהב." error={errors.designNotes}>
          <TextArea
            value={form.designNotes}
            onChange={(value) => setField("designNotes", value)}
            rows={5}
            placeholder={"לדוגמה:\nאני אוהב מראה נקי ולא עמוס\nחשוב לי שיראה יוקרתי אבל לא מנוכר\nאני לא אוהב צבעים חזקים מדי\nכן רוצה משהו מודרני עם נוכחות"}
          />
        </FieldShell>

        <FieldShell label="יש משהו שאתה ממש לא רוצה לראות באתר?" help="לפעמים יותר קל לנסח מה לא רוצים, וזה עוזר לדייק את הכיוון." error={errors.avoidOnSite}>
          <TextArea
            value={form.avoidOnSite}
            onChange={(value) => setField("avoidOnSite", value)}
            rows={4}
            placeholder={"לדוגמה:\nלא רוצה מראה עמוס\nלא רוצה יותר מדי טקסט\nלא רוצה אתר שנראה מיושן\nלא רוצה צבעים צעקניים או תחושה ילדותית"}
          />
        </FieldShell>
      </div>
    </section>
  );
}
