import {
  ADMIN_MANAGE_OPTIONS,
  ADMIN_USAGE_OPTIONS,
  DESIGN_OPTIONS,
  EXISTING_ASSETS_OPTIONS,
  GOAL_OPTIONS,
  IMPORTANT_ITEMS_OPTIONS,
  LANDING_TRAFFIC_OPTIONS,
  ONE_PAGE_PRIORITY_OPTIONS,
  SHOP_ROLE_OPTIONS,
  SHOP_VOLUME_OPTIONS,
} from "./projectBrief.constants";
import type { FormState, OptionItem, ProjectOption, UploadState } from "./projectBrief.types";

export function uniqueFileList(files: File[]) {
  const seen = new Set<string>();
  return files.filter((file) => {
    const key = `${file.name}-${file.size}-${file.lastModified}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function toggleArrayValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function cleanPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export function humanizeChoice(options: OptionItem[], value: string) {
  return options.find((item) => item.value === value)?.label || value;
}

export function humanizeMany(options: OptionItem[], values: string[]) {
  return values
    .map((value) => options.find((item) => item.value === value)?.label || value)
    .filter(Boolean)
    .join(", ");
}

export function splitTextToLines(text: string) {
  return text
    .replace(/\.\s+/g, ".\n")
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function SentenceLines({ text, className = "" }: { text: string; className?: string }) {
  const lines = splitTextToLines(text);

  return (
    <p className={className}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className={index === 0 ? "block" : "mt-1 block"}>
          {line}
        </span>
      ))}
    </p>
  );
}

export function buildFallbackMessage(selected: ProjectOption, form: FormState, uploads: UploadState) {
  const lines = [
    `סוג פרויקט: ${selected.title}`,
    `איש קשר: ${form.fullName}`,
    `טלפון: ${form.phone}`,
    `אימייל: ${form.email}`,
    `שם העסק: ${form.businessName}`,
    "",
    "מה העסק עושה ולמי הוא פונה:",
    form.businessSummary || "לא נמסר",
    "",
    `מטרה עיקרית של האתר: ${humanizeChoice(GOAL_OPTIONS, form.mainGoal)}${form.mainGoal === "other" && form.mainGoalOther ? ` | ${form.mainGoalOther}` : ""}`,
    "",
    "מה חשוב שיעבור לגולש כבר בהתחלה:",
    form.firstImpression || "לא נמסר",
    "",
    `מה חשוב שיכלול האתר: ${humanizeMany(IMPORTANT_ITEMS_OPTIONS, form.importantItems)}${form.importantItems.includes("other") && form.importantItemsOther ? ` | ${form.importantItemsOther}` : ""}`,
    `כיוון עיצובי: ${humanizeChoice(DESIGN_OPTIONS, form.designStyle)}`,
    form.designNotes ? `הערות עיצוב: ${form.designNotes}` : "",
    form.avoidOnSite ? `מה לא רוצים לראות: ${form.avoidOnSite}` : "",
    `חומרים קיימים: ${humanizeMany(EXISTING_ASSETS_OPTIONS, form.existingAssets) || "לא צוין"}`,
    form.existingAssetsNotes ? `פירוט חומרים: ${form.existingAssetsNotes}` : "",
    form.brandPalette ? `צבעים / כיוון מיתוגי: ${form.brandPalette}` : "",
    form.siteLanguages ? `שפות לאתר: ${form.siteLanguages}` : "",
    form.inspirationLinks ? `אתרים לדוגמה: ${form.inspirationLinks}` : "",
    form.extraNotes ? `משהו נוסף: ${form.extraNotes}` : "",
    "",
  ].filter(Boolean);

  if (selected.id === "landing") {
    lines.push(
      "שאלות ממוקדות לדף נחיתה:",
      `מה הדף צריך לקדם: ${form.landingOffer || "לא נמסר"}`,
      `מאיפה יגיעו אנשים: ${humanizeMany(LANDING_TRAFFIC_OPTIONS, form.landingTrafficSources) || "לא נמסר"}`,
      form.landingTrafficSources.includes("other") && form.landingTrafficOther
        ? `פירוט מקור תנועה נוסף: ${form.landingTrafficOther}`
        : "",
      `למה שיבחרו דווקא בעסק: ${form.landingDifferentiator || "לא נמסר"}`,
      `מה חשוב להבליט כדי לייצר אמון: ${form.landingTrust || "לא נמסר"}`,
      "",
    );
  }

  if (selected.id === "one-page") {
    lines.push(
      "שאלות ממוקדות לאתר One Page:",
      `איך נכון לספר את העסק בעמוד: ${form.onePageFlow || "לא נמסר"}`,
      `מה חשוב יותר בעמוד: ${form.onePagePriority ? humanizeChoice(ONE_PAGE_PRIORITY_OPTIONS, form.onePagePriority) : "לא נמסר"}`,
      `מה צריך להישאר לגולש בסוף: ${form.onePageFinalFeeling || "לא נמסר"}`,
      "",
    );
  }

  if (selected.id === "multi-page") {
    lines.push(
      "שאלות ממוקדות לאתר תדמית מלא:",
      `אילו עולמות תוכן צריך לתת להם מקום נפרד: ${form.multiContentWorlds || "לא נמסר"}`,
      `מה צריך לקבל יותר עומק: ${form.multiDepthNeeds || "לא נמסר"}`,
      `מה האתר החדש אמור לפתור בנוכחות של העסק: ${form.multiMissingPresence || "לא נמסר"}`,
      "",
    );
  }

  if (selected.id === "shop") {
    lines.push(
      "שאלות ממוקדות לחנות:",
      `כמות מוצרים בשלב הראשון: ${form.shopProductVolume ? humanizeChoice(SHOP_VOLUME_OPTIONS, form.shopProductVolume) : "לא נמסר"}`,
      `איך המוצרים בנויים: ${form.shopProductStructure || "לא נמסר"}`,
      `מה חשוב בתהליך הקנייה: ${form.shopShoppingFlow || "לא נמסר"}`,
      `איך החנות משתלבת בעסק: ${form.shopRole ? humanizeChoice(SHOP_ROLE_OPTIONS, form.shopRole) : "לא נמסר"}`,
      "",
    );
  }

  if (selected.id === "admin") {
    lines.push(
      "שאלות ממוקדות לאזור ניהול:",
      `מה רוצים לנהל לבד: ${humanizeMany(ADMIN_MANAGE_OPTIONS, form.adminManageItems) || "לא נמסר"}`,
      form.adminManageItems.includes("other") && form.adminManageItemsOther
        ? `פירוט ניהול נוסף: ${form.adminManageItemsOther}`
        : "",
      `מי ישתמש במערכת: ${form.adminUsers || "לא נמסר"}`,
      `מה הכי חשוב במערכת: ${form.adminSystemPriority || "לא נמסר"}`,
      `איך רואים את השימוש במערכת: ${form.adminUsage ? humanizeChoice(ADMIN_USAGE_OPTIONS, form.adminUsage) : "לא נמסר"}`,
      "",
    );
  }

  if (uploads.branding.length || uploads.supporting.length) {
    lines.push(
      "קבצים שנבחרו בצד הלקוח:",
      uploads.branding.length ? `קבצי מיתוג: ${uploads.branding.map((file) => file.name).join(", ")}` : "",
      uploads.supporting.length ? `קבצים וחומרים נוספים: ${uploads.supporting.map((file) => file.name).join(", ")}` : "",
      "",
    );
  }

  return lines.filter(Boolean).join("\n");
}

export function buildStructuredPayload(selected: ProjectOption, form: FormState, uploads: UploadState) {
  return {
    selectedType: selected.id,
    selectedTitle: selected.title,
    contact: {
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      businessName: form.businessName,
    },
    business: {
      summary: form.businessSummary,
      mainGoal: form.mainGoal,
      mainGoalLabel: humanizeChoice(GOAL_OPTIONS, form.mainGoal),
      mainGoalOther: form.mainGoalOther,
      firstImpression: form.firstImpression,
      importantItems: form.importantItems,
      importantItemsLabels: humanizeMany(IMPORTANT_ITEMS_OPTIONS, form.importantItems),
      importantItemsOther: form.importantItemsOther,
      designStyle: form.designStyle,
      designStyleLabel: humanizeChoice(DESIGN_OPTIONS, form.designStyle),
      designNotes: form.designNotes,
      avoidOnSite: form.avoidOnSite,
      existingAssets: form.existingAssets,
      existingAssetsLabels: humanizeMany(EXISTING_ASSETS_OPTIONS, form.existingAssets),
      existingAssetsNotes: form.existingAssetsNotes,
      brandPalette: form.brandPalette,
      siteLanguages: form.siteLanguages,
      inspirationLinks: form.inspirationLinks,
      extraNotes: form.extraNotes,
    },
    specific: {
      landingOffer: form.landingOffer,
      landingTrafficSources: form.landingTrafficSources,
      landingTrafficSourcesLabels: humanizeMany(LANDING_TRAFFIC_OPTIONS, form.landingTrafficSources),
      landingTrafficOther: form.landingTrafficOther,
      landingDifferentiator: form.landingDifferentiator,
      landingTrust: form.landingTrust,
      onePageFlow: form.onePageFlow,
      onePagePriority: form.onePagePriority,
      onePagePriorityLabel: form.onePagePriority ? humanizeChoice(ONE_PAGE_PRIORITY_OPTIONS, form.onePagePriority) : "",
      onePageFinalFeeling: form.onePageFinalFeeling,
      multiContentWorlds: form.multiContentWorlds,
      multiDepthNeeds: form.multiDepthNeeds,
      multiMissingPresence: form.multiMissingPresence,
      shopProductVolume: form.shopProductVolume,
      shopProductVolumeLabel: form.shopProductVolume ? humanizeChoice(SHOP_VOLUME_OPTIONS, form.shopProductVolume) : "",
      shopProductStructure: form.shopProductStructure,
      shopShoppingFlow: form.shopShoppingFlow,
      shopRole: form.shopRole,
      shopRoleLabel: form.shopRole ? humanizeChoice(SHOP_ROLE_OPTIONS, form.shopRole) : "",
      adminManageItems: form.adminManageItems,
      adminManageItemsLabels: humanizeMany(ADMIN_MANAGE_OPTIONS, form.adminManageItems),
      adminManageItemsOther: form.adminManageItemsOther,
      adminUsers: form.adminUsers,
      adminSystemPriority: form.adminSystemPriority,
      adminUsage: form.adminUsage,
      adminUsageLabel: form.adminUsage ? humanizeChoice(ADMIN_USAGE_OPTIONS, form.adminUsage) : "",
    },
    uploads: {
      branding: uploads.branding.map((file) => file.name),
      supporting: uploads.supporting.map((file) => file.name),
    },
  };
}
