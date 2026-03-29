import { FileText } from "lucide-react";
import { SectionLabel, UploadBox } from "../components/FormControls";
import type { UploadState } from "../projectBrief.types";

type UploadsSectionProps = {
  uploads: UploadState;
  setUploads: React.Dispatch<React.SetStateAction<UploadState>>;
};

export default function UploadsSection({ uploads, setUploads }: UploadsSectionProps) {
  return (
    <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
      <SectionLabel
        icon={FileText}
        title="קבצים וחומרים"
        caption="אם יש לך חומרים מוכנים, אפשר לצרף אותם כאן. אם לא, זה ממש בסדר. הטופס בנוי גם למי שעוד אין לו הכול מוכן."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <UploadBox
          title="לוגו, מיתוג, צבעים או השראות"
          subtitle="אפשר לצרף לוגו, PDF מיתוג, קובץ צבעים, צילום מסך מהאינסטגרם, או כל דבר שיעזור להבין את הוייב והכיוון של העסק."
          files={uploads.branding}
          onChange={(files) => setUploads((prev) => ({ ...prev, branding: files }))}
          accept="image/*,.pdf,.doc,.docx,.txt,.ai,.eps,.svg"
        />

        <UploadBox
          title="תמונות, מסמכים או חומרים נוספים"
          subtitle="אפשר לצרף תמונות, מסמך מסודר, הצעת תוכן, בריף פנימי, צילום מסך של המלצות, או כל חומר שעוזר להבין יותר טוב את התמונה."
          files={uploads.supporting}
          onChange={(files) => setUploads((prev) => ({ ...prev, supporting: files }))}
          accept="image/*,.pdf,.doc,.docx,.txt,.zip"
        />
      </div>
    </section>
  );
}
