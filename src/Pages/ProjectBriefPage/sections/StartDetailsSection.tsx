import { UserRound } from "lucide-react";
import { FieldShell, SectionLabel, TextInput } from "../components/FormControls";
import type { BriefErrors, FormState, SetFormField } from "../projectBrief.types";

type StartDetailsSectionProps = {
  form: FormState;
  errors: BriefErrors;
  setField: SetFormField;
};

export default function StartDetailsSection({ form, errors, setField }: StartDetailsSectionProps) {
  return (
    <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
      <SectionLabel
        icon={UserRound}
        title="פרטי התחלה"
        caption="כמה פרטים בסיסיים כדי שאדע למי אני חוזר, ואיך לחבר בין התשובות שלך לעסק הנכון."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <FieldShell label="שם מלא" required help="השם שלך או של מי שמוביל את הפרויקט מולי." error={errors.fullName}>
          <TextInput value={form.fullName} onChange={(value) => setField("fullName", value)} />
        </FieldShell>

        <FieldShell label="שם העסק" required help="כמו שהיית רוצה שאזהה את העסק שלך." error={errors.businessName}>
          <TextInput value={form.businessName} onChange={(value) => setField("businessName", value)} />
        </FieldShell>

        <FieldShell label="טלפון" required help="מספר שנוח לחזור אליו, כולל וואטסאפ אם זה אותו אחד." error={errors.phone}>
          <TextInput
            value={form.phone}
            onChange={(value) => setField("phone", value)}
            type="tel"
            placeholder="לדוגמה: 054-123-4567"
          />
        </FieldShell>

        <FieldShell label="אימייל" required help="כדי שאוכל לשלוח חזרה חומר, סיכום או המשך מסודר אם צריך." error={errors.email}>
          <TextInput
            value={form.email}
            onChange={(value) => setField("email", value)}
            type="email"
            placeholder="לדוגמה: name@business.com"
          />
        </FieldShell>
      </div>
    </section>
  );
}
