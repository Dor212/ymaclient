import { LayoutDashboard, Layers3, ScrollText, ShoppingBag, Target } from "lucide-react";
import {
  ADMIN_MANAGE_OPTIONS,
  ADMIN_USAGE_OPTIONS,
  LANDING_TRAFFIC_OPTIONS,
  ONE_PAGE_PRIORITY_OPTIONS,
  SHOP_ROLE_OPTIONS,
  SHOP_VOLUME_OPTIONS,
} from "../projectBrief.constants";
import { CheckboxGrid, FieldShell, RadioGrid, SectionLabel, TextArea, TextInput } from "../components/FormControls";
import { toggleArrayValue } from "../projectBrief.utils";
import type {
  AdminUsage,
  BriefErrors,
  FormState,
  OnePagePriority,
  ProjectType,
  SetFormField,
  ShopRole,
} from "../projectBrief.types";

type ProjectSpecificSectionProps = {
  selectedType: ProjectType;
  form: FormState;
  errors: BriefErrors;
  setField: SetFormField;
};

export default function ProjectSpecificSection({ selectedType, form, errors, setField }: ProjectSpecificSectionProps) {
  if (selectedType === "landing") {
    return (
      <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
        <SectionLabel
          icon={Target}
          title="שאלות ממוקדות לדף נחיתה"
          caption="כאן המטרה היא להבין מה בדיוק הדף הזה אמור לקדם, מאיפה יגיעו אנשים, ומה צריך לגרום להם לפעול."
        />

        <div className="space-y-5">
          <FieldShell label="מה ההצעה, השירות או הדבר המדויק שהדף הזה צריך לקדם?" required help="אם יש משהו אחד שאתה רוצה לשים עליו את הפוקוס, זה המקום לכתוב אותו בצורה הכי פשוטה שיש." error={errors.landingOffer}>
            <TextArea
              value={form.landingOffer}
              onChange={(value) => setField("landingOffer", value)}
              rows={5}
              placeholder={"לדוגמה:\nפגישת ייעוץ ראשונית\nשירות אחד מרכזי\nמבצע מסוים\nהרשמה לתהליך\nטיפול אחד שאני רוצה לקדם עכשיו"}
            />
          </FieldShell>

          <FieldShell label="מאיפה רוב האנשים אמורים להגיע לדף הזה?" help="אפשר לסמן כמה מקורות אם יש יותר מאחד." error={errors.landingTrafficSources}>
            <CheckboxGrid
              values={form.landingTrafficSources}
              onToggle={(value) => setField("landingTrafficSources", toggleArrayValue(form.landingTrafficSources, value))}
              options={LANDING_TRAFFIC_OPTIONS}
            />
          </FieldShell>

          {form.landingTrafficSources.includes("other") ? (
            <FieldShell label="אם יש מקור אחר, מה הוא?" required error={errors.landingTrafficOther}>
              <TextInput
                value={form.landingTrafficOther}
                onChange={(value) => setField("landingTrafficOther", value)}
                placeholder="לדוגמה: דיוור קיים / הפצה בקבוצות / קישור מאתר אחר / מפה לאוזן"
              />
            </FieldShell>
          ) : null}

          <div className="grid gap-5 lg:grid-cols-2">
            <FieldShell label="מה לדעתך יגרום לאדם לפנות דווקא אליך?" required error={errors.landingDifferentiator}>
              <TextArea
                value={form.landingDifferentiator}
                onChange={(value) => setField("landingDifferentiator", value)}
                rows={5}
                placeholder={"לדוגמה:\nשירות אישי\nניסיון\nמחיר\nתוצאות\nיחס מהיר\nגישה שונה מהמתחרים\nהסבר ברור ופשוט ללקוח"}
              />
            </FieldShell>

            <FieldShell label="איזה אלמנט אמון הכי חשוב שיהיה בדף?" required error={errors.landingTrust}>
              <TextArea
                value={form.landingTrust}
                onChange={(value) => setField("landingTrust", value)}
                rows={5}
                placeholder={"לדוגמה:\nהמלצות מלקוחות\nצילומי לפני ואחרי\nמספר לקוחות\nניסיון\nהסמכות\nסיפורי הצלחה\nוידאו קצר שמסביר מי אני"}
              />
            </FieldShell>
          </div>
        </div>
      </section>
    );
  }

  if (selectedType === "one-page") {
    return (
      <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
        <SectionLabel
          icon={ScrollText}
          title="שאלות ממוקדות ל-One Page"
          caption="כאן המטרה להבין איך נכון לספר את העסק בעמוד אחד, ומה התפקיד המרכזי שהעמוד הזה צריך למלא."
        />

        <div className="space-y-5">
          <FieldShell label="מה הסדר ההגיוני מבחינתך שבו נכון להציג את העסק בעמוד?" required help="לא צריך לדעת לבנות אתר. רק לכתוב איך מרגיש לך נכון לספר את הסיפור." error={errors.onePageFlow}>
            <TextArea
              value={form.onePageFlow}
              onChange={(value) => setField("onePageFlow", value)}
              rows={6}
              placeholder={"לדוגמה:\nקודם מסר קצר וחזק\nאחר כך קצת עליי\nאחר כך שירותים\nאחר כך עבודות או המלצות\nואז יצירת קשר\nאו: קודם להסביר מה אני פותר, אחר כך להראות תוצאות, ואז להוביל לפנייה"}
            />
          </FieldShell>

          <FieldShell label="מה חשוב יותר בעמוד הזה?" required error={errors.onePagePriority}>
            <RadioGrid
              value={form.onePagePriority}
              onChange={(value) => setField("onePagePriority", value as OnePagePriority)}
              options={ONE_PAGE_PRIORITY_OPTIONS}
            />
          </FieldShell>

          <FieldShell label="אם מישהו גולל את כל העמוד, מה אתה רוצה שיישאר לו בראש?" required error={errors.onePageFinalFeeling}>
            <TextArea
              value={form.onePageFinalFeeling}
              onChange={(value) => setField("onePageFinalFeeling", value)}
              rows={5}
              placeholder={"לדוגמה:\nשאני מקצועי\nשבא לי לפנות\nשהכול ברור\nשיש כאן איכות\nשאני נותן פתרון אמיתי ולא רק נראה טוב"}
            />
          </FieldShell>
        </div>
      </section>
    );
  }

  if (selectedType === "multi-page") {
    return (
      <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
        <SectionLabel
          icon={Layers3}
          title="שאלות ממוקדות לאתר תדמית מלא"
          caption="כאן המטרה להבין אילו עולמות תוכן צריכים מקום נפרד, איפה צריך יותר עומק, ומה האתר החדש אמור לפתור."
        />

        <div className="space-y-5">
          <FieldShell label="אילו עולמות תוכן או תחומים שונים צריך לתת להם מקום נפרד באתר?" required help="כאן המטרה להבין אם צריך כמה עמודים שונים או חלוקה ברורה בין נושאים." error={errors.multiContentWorlds}>
            <TextArea
              value={form.multiContentWorlds}
              onChange={(value) => setField("multiContentWorlds", value)}
              rows={6}
              placeholder={"לדוגמה:\nאודות\nשירותים\nפרויקטים\nהמלצות\nמאמרים\nאו: כמה שירותים שונים שכל אחד צריך מקום נפרד"}
            />
          </FieldShell>

          <FieldShell label="האם יש באתר הזה מידע שצריך להיות מסודר לעומק ולא רק מוצג בקצרה?" required error={errors.multiDepthNeeds}>
            <TextArea
              value={form.multiDepthNeeds}
              onChange={(value) => setField("multiDepthNeeds", value)}
              rows={5}
              placeholder={"לדוגמה:\nכן, יש כמה שירותים שצריך להסביר\nיש הרבה מידע מקצועי\nיש שאלות נפוצות שצריך לעשות בהן סדר\nאני רוצה שלקוחות יבינו יותר לעומק מה אני מציע"}
            />
          </FieldShell>

          <FieldShell label="מה אתה מרגיש שחסר היום בנוכחות שלך, שאתר מלא אמור לפתור?" required error={errors.multiMissingPresence}>
            <TextArea
              value={form.multiMissingPresence}
              onChange={(value) => setField("multiMissingPresence", value)}
              rows={5}
              placeholder={"לדוגמה:\nאין מספיק סדר\nלא ברור מה אני מציע\nאין לי מקום להציג הכול\nהעסק לא נראה מספיק מקצועי אונליין\nאני רוצה להיראות רציני יותר"}
            />
          </FieldShell>
        </div>
      </section>
    );
  }

  if (selectedType === "shop") {
    return (
      <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
        <SectionLabel
          icon={ShoppingBag}
          title="שאלות ממוקדות לחנות"
          caption="כאן המטרה להבין בערך את היקף המוצרים, המבנה שלהם, ומה חשוב בתהליך הקנייה ובמקום של החנות בתוך העסק."
        />

        <div className="space-y-5">
          <FieldShell label="בערך כמה מוצרים יהיו בשלב הראשון?" required error={errors.shopProductVolume}>
            <RadioGrid value={form.shopProductVolume} onChange={(value) => setField("shopProductVolume", value)} options={SHOP_VOLUME_OPTIONS} />
          </FieldShell>

          <div className="grid gap-5 lg:grid-cols-2">
            <FieldShell label="איך המוצרים שלך בנויים בדרך כלל?" required help="המטרה כאן היא להבין אם מדובר במוצרים פשוטים או במבנה שדורש יותר סדר." error={errors.shopProductStructure}>
              <TextArea
                value={form.shopProductStructure}
                onChange={(value) => setField("shopProductStructure", value)}
                rows={5}
                placeholder={"לדוגמה:\nמוצרים די דומים אחד לשני\nיש כמה קטגוריות\nיש צבעים או מידות\nיש מוצרים שונים לגמרי אחד מהשני\nעדיין לא סגור עד הסוף"}
              />
            </FieldShell>

            <FieldShell label="מה חשוב שיהיה נוח וברור במיוחד בתהליך הקנייה?" required error={errors.shopShoppingFlow}>
              <TextArea
                value={form.shopShoppingFlow}
                onChange={(value) => setField("shopShoppingFlow", value)}
                rows={5}
                placeholder={"לדוגמה:\nשיהיה קל למצוא מוצרים\nשהקנייה תהיה קצרה\nשזה יעבוד מעולה במובייל\nשיהיה מסודר לפי קטגוריות\nשירגיש בטוח ומקצועי"}
              />
            </FieldShell>
          </div>

          <FieldShell label="איך אתה מדמיין את החנות בתוך העסק?" required error={errors.shopRole}>
            <RadioGrid value={form.shopRole} onChange={(value) => setField("shopRole", value as ShopRole)} options={SHOP_ROLE_OPTIONS} />
          </FieldShell>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
      <SectionLabel
        icon={LayoutDashboard}
        title="שאלות ממוקדות לאזור ניהול"
        caption="כאן המטרה להבין מה אתה רוצה לנהל לבד, מי ישתמש במערכת, ואיך היא אמורה לשרת את העסק ביום־יום."
      />

      <div className="space-y-5">
        <FieldShell label="מה אתה רוצה שתוכל לעדכן בעצמך באתר?" help="אפשר לסמן כמה דברים." error={errors.adminManageItems}>
          <CheckboxGrid
            values={form.adminManageItems}
            onToggle={(value) => setField("adminManageItems", toggleArrayValue(form.adminManageItems, value))}
            options={ADMIN_MANAGE_OPTIONS}
          />
        </FieldShell>

        {form.adminManageItems.includes("other") ? (
          <FieldShell label="אם סימנת משהו אחר, מה חשוב לך לנהל?" required error={errors.adminManageItemsOther}>
            <TextArea
              value={form.adminManageItemsOther}
              onChange={(value) => setField("adminManageItemsOther", value)}
              rows={4}
              placeholder={"לדוגמה:\nהזמנות\nסטטוסים של לקוחות\nמסמכים\nתוכן פנימי\nאירועים או פגישות"}
            />
          </FieldShell>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-2">
          <FieldShell label="מי אמור להשתמש באזור הניהול?" required error={errors.adminUsers}>
            <TextArea
              value={form.adminUsers}
              onChange={(value) => setField("adminUsers", value)}
              rows={5}
              placeholder={"לדוגמה:\nרק אני\nאני ועוד עובד אחד\nכמה אנשים בצוות\nאני והמזכירה\nאני עדיין לא בטוח מי ייגע בזה ביום יום"}
            />
          </FieldShell>

          <FieldShell label="מה הכי חשוב לך במערכת הניהול עצמה?" required error={errors.adminSystemPriority}>
            <TextArea
              value={form.adminSystemPriority}
              onChange={(value) => setField("adminSystemPriority", value)}
              rows={5}
              placeholder={"לדוגמה:\nשתהיה פשוטה\nשלא תדרוש ידע טכני\nשיהיה קל לעדכן דברים\nשיהיה מסודר וברור\nשיהיה אפשר לעקוב אחרי פניות בלי להסתבך"}
            />
          </FieldShell>
        </div>

        <FieldShell label="איך אתה רואה את השימוש במערכת?" required error={errors.adminUsage}>
          <RadioGrid value={form.adminUsage} onChange={(value) => setField("adminUsage", value as AdminUsage)} options={ADMIN_USAGE_OPTIONS} />
        </FieldShell>
      </div>
    </section>
  );
}
