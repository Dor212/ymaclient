import { MessageCircleMore } from "lucide-react";
import { FieldShell, SectionLabel, TextArea } from "../components/FormControls";
import type { BriefErrors, FormState, SetFormField } from "../projectBrief.types";

type ExtraNotesSectionProps = {
  form: FormState;
  errors: BriefErrors;
  setField: SetFormField;
};

export default function ExtraNotesSection({ form, errors, setField }: ExtraNotesSectionProps) {
  return (
    <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
      <SectionLabel
        icon={MessageCircleMore}
        title="משהו נוסף שחשוב לי לדעת"
        caption="כל דבר שיכול לעזור להבין אותך, את העסק, את הקצב שאתה מחפש, או משהו שלא נכנס למקומות הקודמים."
      />

      <FieldShell label="אפשר לכתוב כאן חופשי" error={errors.extraNotes}>
        <TextArea
          value={form.extraNotes}
          onChange={(value) => setField("extraNotes", value)}
          rows={6}
          placeholder={"לדוגמה:\nאני בתחילת הדרך ורוצה משהו מסודר אבל לא כבד\nאני רוצה שהאתר ירגיש אישי ולא גנרי\nאני מתכנן לפרסם ממומן בהמשך\nיש לי כבר עסק פעיל ואני רוצה לשדרג נראות\nאני פתוח להצעות אם משהו מרגיש לך נכון יותר"}
        />
      </FieldShell>
    </section>
  );
}
