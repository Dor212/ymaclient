import type { Variants } from "framer-motion";
import {
  LayoutDashboard,
  Layers3,
  ScrollText,
  ShoppingBag,
  Target,
} from "lucide-react";
import type { FormState, OptionItem, ProjectOption, ProjectType, UploadState } from "./projectBrief.types";

export const RAW_API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
export const DEFAULT_BRIEF_ENDPOINT = `${RAW_API_BASE}/api/project-briefs`;
export const CONFIGURED_BRIEF_ENDPOINT = ((import.meta.env.VITE_PROJECT_BRIEF_ENDPOINT || "").trim() || DEFAULT_BRIEF_ENDPOINT);

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      delay: 0.08 * i,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const PROJECT_OPTIONS: ProjectOption[] = [
  {
    id: "landing",
    title: "דף נחיתה",
    short: "עמוד ממוקד שמטרתו פנייה אחת ברורה.",
    description: "מתאים לקמפיין, הצעה אחת, שירות אחד או מסר מכירתי ממוקד.",
    icon: Target,
    chip: "מיקוד להמרה",
    fallbackProjectType: "landing",
  },
  {
    id: "one-page",
    title: "אתר תדמית One Page",
    short: "הצגה מסודרת של העסק בעמוד אחד.",
    description: "מתאים לעסקים שרוצים נוכחות דיגיטלית נקייה, ברורה ומקצועית.",
    icon: ScrollText,
    chip: "סיפור בעמוד אחד",
    fallbackProjectType: "business",
  },
  {
    id: "multi-page",
    title: "אתר תדמית מלא",
    short: "אתר עם כמה עמודים ועולמות תוכן.",
    description: "מתאים לעסק שצריך יותר עומק, יותר סדר, וחלוקה ברורה בין נושאים.",
    icon: Layers3,
    chip: "יותר עומק",
    fallbackProjectType: "business",
  },
  {
    id: "shop",
    title: "חנות אונליין",
    short: "אתר שמציג ומוכר מוצרים אונליין.",
    description: "מתאים לעסקים שרוצים חוויית קנייה מסודרת, ברורה ונוחה במובייל.",
    icon: ShoppingBag,
    chip: "מכירה דיגיטלית",
    fallbackProjectType: "shop",
  },
  {
    id: "admin",
    title: "אתר עם אזור ניהול",
    short: "אתר שכולל מערכת עבודה וניהול תוכן.",
    description: "מתאים כשצריך לעדכן דברים לבד, לנהל תוכן, פניות, מוצרים או צוות.",
    icon: LayoutDashboard,
    chip: "ניהול חכם",
    fallbackProjectType: "other",
  },
];

export const GOAL_OPTIONS: OptionItem[] = [
  { value: "form", label: "לקבל פניות דרך טופס" },
  { value: "whatsapp", label: "לקבל פניות בוואטסאפ" },
  { value: "meeting", label: "לקבוע שיחה או פגישה" },
  { value: "sell", label: "למכור מוצרים או שירותים" },
  { value: "brand", label: "להציג את העסק בצורה מקצועית" },
  { value: "organize", label: "לרכז מידע מסודר על העסק" },
  { value: "other", label: "משהו אחר" },
];

export const IMPORTANT_ITEMS_OPTIONS: OptionItem[] = [
  { value: "contact-form", label: "טופס יצירת קשר" },
  { value: "whatsapp-button", label: "כפתור וואטסאפ" },
  { value: "gallery", label: "גלריה" },
  { value: "reviews", label: "המלצות מלקוחות" },
  { value: "faq", label: "שאלות נפוצות" },
  { value: "video", label: "סרטון" },
  { value: "about", label: "אודות" },
  { value: "services", label: "שירותים" },
  { value: "articles", label: "בלוג או מאמרים" },
  { value: "shop", label: "חנות" },
  { value: "dashboard", label: "אזור ניהול" },
  { value: "other", label: "משהו אחר" },
];

export const DESIGN_OPTIONS: OptionItem[] = [
  { value: "minimal", label: "נקי ומינימליסטי" },
  { value: "luxury", label: "יוקרתי ואלגנטי" },
  { value: "warm", label: "חם ואישי" },
  { value: "dynamic", label: "צעיר ודינמי" },
  { value: "sales", label: "חד ומכירתי" },
  { value: "calm", label: "רגוע ומקצועי" },
  { value: "unsure", label: "עדיין לא בטוח" },
];

export const EXISTING_ASSETS_OPTIONS: OptionItem[] = [
  { value: "logo", label: "לוגו" },
  { value: "brand", label: "צבעים או מיתוג קיים" },
  { value: "photos", label: "תמונות" },
  { value: "video", label: "סרטון" },
  { value: "copy", label: "טקסטים כתובים" },
  { value: "reviews", label: "המלצות מלקוחות" },
  { value: "current-site", label: "אתר קיים" },
  { value: "other", label: "אחר" },
  { value: "none", label: "אין לי עדיין כמעט כלום" },
];

export const LANDING_TRAFFIC_OPTIONS: OptionItem[] = [
  { value: "ads", label: "פרסום ממומן" },
  { value: "instagram", label: "אינסטגרם" },
  { value: "facebook", label: "פייסבוק" },
  { value: "google", label: "גוגל" },
  { value: "whatsapp", label: "וואטסאפ" },
  { value: "recommendations", label: "המלצות" },
  { value: "other", label: "אחר" },
  { value: "unsure", label: "עדיין לא יודע" },
];

export const ONE_PAGE_PRIORITY_OPTIONS: OptionItem[] = [
  { value: "show", label: "להציג אותי ואת העסק" },
  { value: "explain", label: "להסביר את השירות בצורה ברורה" },
  { value: "convert", label: "לגרום לפנייה" },
  { value: "blend", label: "שילוב בין הכול" },
];

export const SHOP_VOLUME_OPTIONS: OptionItem[] = [
  { value: "small", label: "עד 10" },
  { value: "medium", label: "10 עד 30" },
  { value: "large", label: "30 עד 100" },
  { value: "xlarge", label: "יותר מ-100" },
  { value: "unsure", label: "עדיין לא בטוח" },
];

export const SHOP_ROLE_OPTIONS: OptionItem[] = [
  { value: "main", label: "החנות היא המרכז של האתר" },
  { value: "hybrid", label: "החנות היא חלק מתוך אתר תדמית" },
  { value: "unsure", label: "עדיין לא בטוח" },
];

export const ADMIN_MANAGE_OPTIONS: OptionItem[] = [
  { value: "texts", label: "טקסטים" },
  { value: "images", label: "תמונות" },
  { value: "products", label: "מוצרים" },
  { value: "gallery", label: "גלריה" },
  { value: "leads", label: "לידים או פניות" },
  { value: "articles", label: "מאמרים" },
  { value: "prices", label: "מחירים" },
  { value: "users", label: "משתמשים" },
  { value: "other", label: "משהו אחר" },
];

export const ADMIN_USAGE_OPTIONS: OptionItem[] = [
  { value: "content", label: "בעיקר לניהול תוכן" },
  { value: "leads", label: "גם לניהול פניות או לידים" },
  { value: "products", label: "גם לניהול מוצרים" },
  { value: "daily", label: "כלי עבודה שוטף לעסק" },
  { value: "unsure", label: "עדיין לא יודע" },
];

export const EMPTY_FORM: FormState = {
  fullName: "",
  phone: "",
  email: "",
  businessName: "",
  businessSummary: "",
  mainGoal: "form",
  mainGoalOther: "",
  firstImpression: "",
  importantItems: [],
  importantItemsOther: "",
  designStyle: "unsure",
  designNotes: "",
  avoidOnSite: "",
  existingAssets: [],
  existingAssetsNotes: "",
  brandPalette: "",
  siteLanguages: "",
  inspirationLinks: "",
  extraNotes: "",
  landingOffer: "",
  landingTrafficSources: [],
  landingTrafficOther: "",
  landingDifferentiator: "",
  landingTrust: "",
  onePageFlow: "",
  onePagePriority: "",
  onePageFinalFeeling: "",
  multiContentWorlds: "",
  multiDepthNeeds: "",
  multiMissingPresence: "",
  shopProductVolume: "",
  shopProductStructure: "",
  shopShoppingFlow: "",
  shopRole: "",
  adminManageItems: [],
  adminManageItemsOther: "",
  adminUsers: "",
  adminSystemPriority: "",
  adminUsage: "",
};

export const EMPTY_UPLOADS: UploadState = {
  branding: [],
  supporting: [],
};

export function isProjectType(value: string | null): value is ProjectType {
  return PROJECT_OPTIONS.some((option) => option.id === value);
}
