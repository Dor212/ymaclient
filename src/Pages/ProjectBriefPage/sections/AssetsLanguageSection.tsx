import { Globe } from "lucide-react";
import { EXISTING_ASSETS_OPTIONS } from "../projectBrief.constants";
import { CheckboxGrid, FieldShell, SectionLabel, TextArea, TextInput } from "../components/FormControls";
import { toggleArrayValue } from "../projectBrief.utils";
import type { BriefErrors, FormState, SetFormField } from "../projectBrief.types";

type AssetsLanguageSectionProps = {
  form: FormState;
  errors: BriefErrors;
  setField: SetFormField;
};

export default function AssetsLanguageSection({ form, errors, setField }: AssetsLanguageSectionProps) {
  return (
    <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
      <SectionLabel
        icon={Globe}
        title="חומרים, שפה והשראות"
        caption="החלק הזה עוזר לי להבין מה כבר יש, באילו שפות האתר צריך להיות, ואילו אתרים או כיוונים מדברים אליך."
      />

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <FieldShell label="מה כבר קיים אצלך היום?" help="אפשר לסמן כמה דברים. אם אין כמעט כלום, גם זה לגמרי בסדר." error={errors.existingAssets}>
            <CheckboxGrid
              values={form.existingAssets}
              onToggle={(value) => {
                if (value === "none") {
                  setField("existingAssets", form.existingAssets.includes("none") ? [] : ["none"]);
                  if (!form.existingAssets.includes("none")) {
                    setField("existingAssetsNotes", "");
                  }
                  return;
                }

                const withoutNone = form.existingAssets.filter((item) => item !== "none");
                const nextValues = toggleArrayValue(withoutNone, value);
                setField("existingAssets", nextValues);
                if (!nextValues.includes("other")) {
                  setField("existingAssetsNotes", "");
                }
              }}
              options={EXISTING_ASSETS_OPTIONS}
            />
          </FieldShell>

          {form.existingAssets.includes("other") ? (
            <FieldShell label={'אם סימנת "אחר", אפשר לפרט כאן'} help="כאן אפשר לרשום חומרים נוספים או כל דבר קיים שלא הופיע ברשימה." error={errors.existingAssetsNotes}>
              <TextArea
                value={form.existingAssetsNotes}
                onChange={(value) => setField("existingAssetsNotes", value)}
                rows={4}
                placeholder={`לדוגמה:
יש לי מצגת קצרה על העסק
יש לי קבצי PDF
יש לי עמוד אינסטגרם מסודר שאפשר לקחת ממנו כיוון
יש לי חומר מפוזר בכמה מקומות`}
              />
            </FieldShell>
          ) : null}
        </div>

        <div className="space-y-5">
          <FieldShell label="אם יש צבעים, שפה גרפית או כיוון מיתוגי שחשוב לך לשמור עליו, כתוב כאן" help="אפשר לכתוב שמות צבעים, קודים, או לתאר פשוט את הכיוון." error={errors.brandPalette}>
            <TextArea
              value={form.brandPalette}
              onChange={(value) => setField("brandPalette", value)}
              rows={4}
              placeholder={`לדוגמה:
שחור, לבן ונגיעות כחול.
ירוק כהה עם תחושה מקצועית ונקייה.
פחות צבעוני, יותר יוקרתי.
אין לי פלטה סגורה עדיין אבל כן חשוב לי משהו אלגנטי וחם.`}
            />
          </FieldShell>

          <FieldShell label="באיזו שפה או שפות האתר צריך להיות?" required help="אפשר לרשום שפה אחת, כמה שפות, או כל שפה שחשובה לעסק שלך." error={errors.siteLanguages}>
            <TextInput
              value={form.siteLanguages}
              onChange={(value) => setField("siteLanguages", value)}
              placeholder="לדוגמה: עברית / אנגלית / כל שפה אחרת / עברית ואנגלית / עברית, אנגלית וצרפתית"
            />
          </FieldShell>

          <FieldShell label="יש אתרים שאהבת ויכולים לעזור לי להבין את הכיוון?" help="לא חובה. גם אם אהבת רק את הסגנון, המבנה או התחושה, זה יכול לעזור מאוד." error={errors.inspirationLinks}>
            <TextArea
              value={form.inspirationLinks}
              onChange={(value) => setField("inspirationLinks", value)}
              rows={5}
              placeholder={"אפשר להדביק כאן קישור לאתר שאהבת\nאו לכתוב משהו כמו:\nאהבתי את הניקיון\nאהבתי את הצבעים\nאהבתי איך שהכול מסודר\nאהבתי את התחושה המקצועית אבל הלא כבדה"}
            />
          </FieldShell>
        </div>
      </div>
    </section>
  );
}
