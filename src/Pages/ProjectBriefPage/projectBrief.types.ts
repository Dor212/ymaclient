export type ProjectType = "landing" | "one-page" | "multi-page" | "shop" | "admin";
export type GoalOption = "form" | "whatsapp" | "meeting" | "sell" | "brand" | "organize" | "other";
export type DesignOption = "minimal" | "luxury" | "warm" | "dynamic" | "sales" | "calm" | "unsure";
export type OnePagePriority = "show" | "explain" | "convert" | "blend";
export type ShopRole = "main" | "hybrid" | "unsure";
export type AdminUsage = "content" | "leads" | "products" | "daily" | "unsure";

export type FormState = {
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  businessSummary: string;
  mainGoal: GoalOption;
  mainGoalOther: string;
  firstImpression: string;
  importantItems: string[];
  importantItemsOther: string;
  designStyle: DesignOption;
  designNotes: string;
  avoidOnSite: string;
  existingAssets: string[];
  existingAssetsNotes: string;
  brandPalette: string;
  siteLanguages: string;
  inspirationLinks: string;
  extraNotes: string;
  landingOffer: string;
  landingTrafficSources: string[];
  landingTrafficOther: string;
  landingDifferentiator: string;
  landingTrust: string;
  onePageFlow: string;
  onePagePriority: OnePagePriority | "";
  onePageFinalFeeling: string;
  multiContentWorlds: string;
  multiDepthNeeds: string;
  multiMissingPresence: string;
  shopProductVolume: string;
  shopProductStructure: string;
  shopShoppingFlow: string;
  shopRole: ShopRole | "";
  adminManageItems: string[];
  adminManageItemsOther: string;
  adminUsers: string;
  adminSystemPriority: string;
  adminUsage: AdminUsage | "";
};

export type UploadState = {
  branding: File[];
  supporting: File[];
};

export type ProjectOption = {
  id: ProjectType;
  title: string;
  short: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  chip: string;
  fallbackProjectType: "landing" | "business" | "shop" | "other";
};

export type OptionItem = {
  value: string;
  label: string;
  help?: string;
};

export type BriefErrors = Record<string, string>;

export type SetFormField = <K extends keyof FormState>(field: K, value: FormState[K]) => void;
