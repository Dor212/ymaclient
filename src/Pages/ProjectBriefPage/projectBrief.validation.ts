import type { BriefErrors, FormState, ProjectType } from "./projectBrief.types";

export function validateForm(selectedType: ProjectType | null, form: FormState): BriefErrors {
  const nextErrors: BriefErrors = {};

  if (!selectedType) nextErrors.selectedType = "צריך לבחור מסלול כדי להמשיך.";
  if (!form.fullName.trim()) nextErrors.fullName = "צריך לרשום שם מלא.";
  if (!form.phone.trim()) nextErrors.phone = "צריך לרשום מספר טלפון.";
  if (!form.email.trim()) nextErrors.email = "צריך לרשום אימייל.";
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    nextErrors.email = "האימייל לא נראה תקין.";
  }
  if (!form.businessName.trim()) nextErrors.businessName = "צריך לרשום את שם העסק.";
  if (!form.businessSummary.trim()) nextErrors.businessSummary = "צריך לספר בכמה מילים על העסק.";
  if (!form.firstImpression.trim()) nextErrors.firstImpression = "חשוב לכתוב מה אתה רוצה שיעבור לגולש בהתחלה.";
  if (!form.siteLanguages.trim()) nextErrors.siteLanguages = "צריך לרשום באיזו שפה או שפות האתר צריך להיות.";

  if (form.mainGoal === "other" && !form.mainGoalOther.trim()) {
    nextErrors.mainGoalOther = "אם בחרת משהו אחר, צריך לפרט אותו.";
  }

  if (form.importantItems.includes("other") && !form.importantItemsOther.trim()) {
    nextErrors.importantItemsOther = "אם סימנת משהו אחר, צריך לכתוב מה חסר לך כאן.";
  }

  if (form.existingAssets.includes("other") && !form.existingAssetsNotes.trim()) {
    nextErrors.existingAssetsNotes = 'אם סימנת "אחר", צריך לפרט אותו.';
  }

  if (selectedType === "landing") {
    if (!form.landingOffer.trim()) nextErrors.landingOffer = "צריך לכתוב מה הדף הזה אמור לקדם.";
    if (!form.landingDifferentiator.trim()) nextErrors.landingDifferentiator = "כדאי לכתוב למה שיבחרו דווקא בעסק שלך.";
    if (!form.landingTrust.trim()) nextErrors.landingTrust = "כדאי לכתוב איזה אלמנט אמון חשוב להבליט.";
    if (form.landingTrafficSources.includes("other") && !form.landingTrafficOther.trim()) {
      nextErrors.landingTrafficOther = "אם סימנת מקור תנועה אחר, צריך לפרט אותו.";
    }
  }

  if (selectedType === "one-page") {
    if (!form.onePageFlow.trim()) nextErrors.onePageFlow = "כדאי לכתוב איך נכון לדעתך לספר את העסק בעמוד.";
    if (!form.onePagePriority) nextErrors.onePagePriority = "צריך לבחור מה העמוד הזה אמור לעשות בעיקר.";
    if (!form.onePageFinalFeeling.trim()) nextErrors.onePageFinalFeeling = "כדאי לכתוב מה צריך להישאר לגולש בראש בסוף.";
  }

  if (selectedType === "multi-page") {
    if (!form.multiContentWorlds.trim()) nextErrors.multiContentWorlds = "צריך לכתוב אילו עולמות תוכן צריכים מקום נפרד.";
    if (!form.multiDepthNeeds.trim()) nextErrors.multiDepthNeeds = "כדאי לכתוב מה צריך יותר עומק באתר.";
    if (!form.multiMissingPresence.trim()) nextErrors.multiMissingPresence = "כדאי לכתוב מה האתר החדש אמור לפתור.";
  }

  if (selectedType === "shop") {
    if (!form.shopProductVolume) nextErrors.shopProductVolume = "צריך לבחור בערך כמה מוצרים יהיו בשלב הראשון.";
    if (!form.shopProductStructure.trim()) nextErrors.shopProductStructure = "כדאי לכתוב איך המוצרים בנויים בדרך כלל.";
    if (!form.shopShoppingFlow.trim()) nextErrors.shopShoppingFlow = "כדאי לכתוב מה חשוב בתהליך הקנייה.";
    if (!form.shopRole) nextErrors.shopRole = "צריך לבחור איך החנות משתלבת בעסק.";
  }

  if (selectedType === "admin") {
    if (!form.adminUsers.trim()) nextErrors.adminUsers = "כדאי לכתוב מי אמור להשתמש באזור הניהול.";
    if (!form.adminSystemPriority.trim()) nextErrors.adminSystemPriority = "כדאי לכתוב מה הכי חשוב במערכת הניהול.";
    if (!form.adminUsage) nextErrors.adminUsage = "צריך לבחור איך אתה רואה את השימוש במערכת.";
    if (form.adminManageItems.includes("other") && !form.adminManageItemsOther.trim()) {
      nextErrors.adminManageItemsOther = "אם סימנת משהו אחר, צריך לפרט אותו.";
    }
  }

  return nextErrors;
}
