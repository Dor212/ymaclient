import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageSEO from "../../components/seo/PageSEO";
import { CONFIGURED_BRIEF_ENDPOINT, EMPTY_FORM, EMPTY_UPLOADS, FALLBACK_ENDPOINT, PROJECT_OPTIONS, fadeUp, isProjectType } from "./projectBrief.constants";
import { buildFallbackMessage, buildStructuredPayload, cleanPhone } from "./projectBrief.utils";
import { validateForm } from "./projectBrief.validation";
import type { BriefErrors, FormState, ProjectType, UploadState } from "./projectBrief.types";
import ProjectChoiceModal from "./components/ProjectChoiceModal";
import SelectionScreen from "./sections/SelectionScreen";
import FormHeader from "./sections/FormHeader";
import StartDetailsSection from "./sections/StartDetailsSection";
import BusinessOverviewSection from "./sections/BusinessOverviewSection";
import SiteDirectionSection from "./sections/SiteDirectionSection";
import AssetsLanguageSection from "./sections/AssetsLanguageSection";
import ProjectSpecificSection from "./sections/ProjectSpecificSection";
import UploadsSection from "./sections/UploadsSection";
import ExtraNotesSection from "./sections/ExtraNotesSection";
import FinalSubmitSection from "./sections/FinalSubmitSection";

export default function ProjectBriefPage() {
  const [selectedType, setSelectedType] = useState<ProjectType | null>(null);
  const [activePreviewId, setActivePreviewId] = useState<ProjectType | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [uploads, setUploads] = useState<UploadState>(EMPTY_UPLOADS);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<BriefErrors>({});
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeFromQuery = params.get("type");

    if (isProjectType(typeFromQuery)) {
      setSelectedType(typeFromQuery);
    }
  }, []);

  const currentScreen = selectedType ? "form" : "selection";

  const selectedOption = useMemo(
    () => PROJECT_OPTIONS.find((option) => option.id === selectedType) ?? null,
    [selectedType],
  );

  const activePreviewOption = useMemo(
    () => PROJECT_OPTIONS.find((option) => option.id === activePreviewId) ?? null,
    [activePreviewId],
  );

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const syncQueryType = (type: ProjectType | null) => {
    const params = new URLSearchParams(window.location.search);
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${window.location.pathname}?${nextQuery}` : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
  };

  const chooseType = (type: ProjectType) => {
    setSelectedType(type);
    setActivePreviewId(null);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.selectedType;
      return next;
    });
    syncQueryType(type);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const clearSelection = () => {
    setSelectedType(null);
    setActivePreviewId(null);
    syncQueryType(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedOption) {
      setErrors({ selectedType: "צריך לבחור מסלול לפני שממשיכים." });
      return;
    }

    const nextErrors = validateForm(selectedType, form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus("error");
      setStatusMessage("יש כמה שדות שכדאי להשלים כדי שאוכל להבין את הכיוון כמו שצריך.");
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      if (CONFIGURED_BRIEF_ENDPOINT) {
        const payload = buildStructuredPayload(selectedOption, form, uploads);
        const formData = new FormData();
        formData.append("selectedType", selectedOption.id);
        formData.append("selectedTitle", selectedOption.title);
        formData.append("summary", buildFallbackMessage(selectedOption, form, uploads));
        formData.append("payload", JSON.stringify(payload));
        formData.append("fullName", form.fullName.trim());
        formData.append("phone", cleanPhone(form.phone));
        formData.append("email", form.email.trim());
        formData.append("businessName", form.businessName.trim());
        uploads.branding.forEach((file) => formData.append("brandingFiles", file));
        uploads.supporting.forEach((file) => formData.append("supportingFiles", file));

        const response = await fetch(CONFIGURED_BRIEF_ENDPOINT, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("submit_failed");
        }
      } else {
        const message = buildFallbackMessage(selectedOption, form, uploads);
        const response = await fetch(FALLBACK_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.fullName.trim(),
            phone: cleanPhone(form.phone),
            email: form.email.trim(),
            businessName: form.businessName.trim(),
            niche: selectedOption.title,
            note: message,
            message,
            projectType: selectedOption.fallbackProjectType,
          }),
        });

        if (!response.ok) {
          throw new Error("submit_failed");
        }
      }

      setStatus("success");
      setStatusMessage("קיבלתי את הפרטים שלך. אעבור על הכול ואחזור אליך עם כיוון מסודר להמשך.");
      setForm(EMPTY_FORM);
      setUploads(EMPTY_UPLOADS);
      setErrors({});
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setStatus("error");
      setStatusMessage("לא הצלחתי לשלוח כרגע את הטופס. אפשר לנסות שוב בעוד רגע.");
    }
  };

  return (
    <div dir="rtl" className="relative overflow-hidden px-5 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      <PageSEO
        path="/project-brief"
        title="Y.M.A | שאלון פתיחה לפרויקט"
        description="שאלון פתיחה פשוט ומדויק שיעזור להבין את העסק, לחדד כיוון ולבנות התחלה נכונה לפרויקט באתר של Y.M.A."
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 12% 20%, rgba(58,134,255,0.24), transparent 30%), radial-gradient(circle at 85% 18%, rgba(255,46,126,0.24), transparent 28%), radial-gradient(circle at 50% 0%, rgba(255,119,69,0.18), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        {currentScreen === "selection" ? <SelectionScreen errors={errors} onOpenPreview={setActivePreviewId} /> : null}

        {currentScreen === "form" && selectedOption ? (
          <div ref={formRef} className="mx-auto max-w-6xl pt-2 sm:pt-4">
            <FormHeader selectedOption={selectedOption} onChangeProject={clearSelection} />

            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={8}
              className="mx-auto max-w-6xl rounded-[34px] border border-white/10 bg-[linear-gradient(155deg,rgba(8,12,24,0.82),rgba(18,9,22,0.72))] p-5 shadow-[0_0_42px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-7 lg:p-9"
            >
              {status !== "idle" ? (
                <div
                  className={`mb-6 rounded-[24px] border px-5 py-4 text-right text-[14px] leading-6 ${
                    status === "success"
                      ? "border-[#00C9A7]/25 bg-[#00C9A7]/10 text-white"
                      : status === "error"
                        ? "border-[#FF2E7E]/25 bg-[#FF2E7E]/10 text-white"
                        : "border-[#3A86FF]/25 bg-[#3A86FF]/10 text-white"
                  }`}
                >
                  {statusMessage || (status === "submitting" ? "שולח את הפרטים..." : "")}
                </div>
              ) : null}

              <form onSubmit={submit} className="space-y-10">
                <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr]">
                  <div className="space-y-10">
                    <StartDetailsSection form={form} errors={errors} setField={setField} />
                    <BusinessOverviewSection form={form} errors={errors} setField={setField} />
                  </div>

                  <div className="space-y-10">
                    <SiteDirectionSection form={form} errors={errors} setField={setField} />
                  </div>
                </div>

                <AssetsLanguageSection form={form} errors={errors} setField={setField} />
                <ProjectSpecificSection selectedType={selectedOption.id} form={form} errors={errors} setField={setField} />
                <UploadsSection uploads={uploads} setUploads={setUploads} />
                <ExtraNotesSection form={form} errors={errors} setField={setField} />
                <FinalSubmitSection isSubmitting={status === "submitting"} />
              </form>
            </motion.section>
          </div>
        ) : null}

        <AnimatePresence>
          {activePreviewOption ? (
            <ProjectChoiceModal
              option={activePreviewOption}
              onClose={() => setActivePreviewId(null)}
              onConfirm={() => chooseType(activePreviewOption.id)}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
