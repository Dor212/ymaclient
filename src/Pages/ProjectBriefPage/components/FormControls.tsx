import { useRef, type ChangeEvent } from "react";
import { FileImage, FileText } from "lucide-react";
import { uniqueFileList } from "../projectBrief.utils";
import type { OptionItem } from "../projectBrief.types";

export function SectionLabel({
  icon: Icon,
  title,
  caption,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  caption?: string;
}) {
  return (
    <div className="mb-5 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8FE7FF]/85">
        <Icon className="w-4 h-4" />
        <span>{title}</span>
      </div>
      {caption ? <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-white/72">{caption}</p> : null}
    </div>
  );
}

export function FieldShell({
  label,
  required,
  help,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-right">
      <div className="mb-2 flex items-center gap-2 text-[15px] font-bold text-white">
        <span>{label}</span>
        {required ? <span className="text-[#FF8FB8]">*</span> : null}
      </div>
      {help ? <p className="mb-3 text-[13px] leading-6 text-white/65">{help}</p> : null}
      {children}
      {error ? <p className="mt-2 text-[12px] font-medium text-[#FF9DBD]">{error}</p> : null}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      type={type}
      className="w-full rounded-[22px] border border-white/12 bg-[#050816]/65 px-4 py-3.5 text-right text-[15px] text-white outline-none transition placeholder:text-white/32 focus:border-[#3A86FF]/55 focus:bg-[#070b18]/85 focus:shadow-[0_0_0_4px_rgba(58,134,255,0.12)]"
      placeholder={placeholder}
      dir="rtl"
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 5,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rows={rows}
      className="w-full rounded-[24px] border border-white/12 bg-[#050816]/65 px-4 py-3.5 text-right text-[15px] leading-7 text-white outline-none transition placeholder:text-white/32 focus:border-[#3A86FF]/55 focus:bg-[#070b18]/85 focus:shadow-[0_0_0_4px_rgba(58,134,255,0.12)]"
      placeholder={placeholder}
      dir="rtl"
    />
  );
}

export function RadioGrid({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: OptionItem[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-[22px] border px-4 py-3.5 text-right transition ${
              active
                ? "border-[#3A86FF]/55 bg-[linear-gradient(135deg,rgba(58,134,255,0.18),rgba(255,46,126,0.12))] shadow-[0_0_22px_rgba(58,134,255,0.15)]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-1 h-4 w-4 shrink-0 rounded-full border ${
                  active ? "border-[#7CB2FF] bg-[#7CB2FF] shadow-[0_0_12px_rgba(124,178,255,0.6)]" : "border-white/30"
                }`}
              />
              <div>
                <div className="text-[14px] font-bold text-white">{option.label}</div>
                {option.help ? <div className="mt-1 text-[12px] leading-6 text-white/58">{option.help}</div> : null}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function CheckboxGrid({
  values,
  onToggle,
  options,
}: {
  values: string[];
  onToggle: (value: string) => void;
  options: OptionItem[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {options.map((option) => {
        const active = values.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            className={`rounded-[22px] border px-4 py-3.5 text-right transition ${
              active
                ? "border-[#FF2E7E]/45 bg-[linear-gradient(135deg,rgba(255,46,126,0.14),rgba(58,134,255,0.12))] shadow-[0_0_18px_rgba(255,46,126,0.12)]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                  active ? "border-[#FF7AA7] bg-[#FF2E7E] text-white" : "border-white/30 text-transparent"
                }`}
              >
                ✓
              </span>
              <div>
                <div className="text-[14px] font-bold text-white">{option.label}</div>
                {option.help ? <div className="mt-1 text-[12px] leading-6 text-white/58">{option.help}</div> : null}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function UploadBox({
  title,
  subtitle,
  files,
  onChange,
  accept,
}: {
  title: string;
  subtitle: string;
  files: File[];
  onChange: (files: File[]) => void;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(event.target.files || []);
    onChange(uniqueFileList([...files, ...incoming]));
    event.target.value = "";
  };

  return (
    <div className="rounded-[24px] border border-dashed border-white/15 bg-white/[0.03] p-4 text-right">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[15px] font-bold text-white">{title}</div>
          <p className="mt-2 max-w-xl text-[13px] leading-6 text-white/62">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 text-[13px] font-bold text-white transition hover:border-white/22 hover:bg-white/[0.09]"
        >
          <FileImage className="h-4 w-4" />
          לבחור קבצים
        </button>
      </div>

      <input ref={inputRef} type="file" multiple accept={accept} className="hidden" onChange={handleFiles} />

      {files.length ? (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
              className="flex items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-[#050816]/45 px-3.5 py-3"
            >
              <button
                type="button"
                onClick={() => onChange(files.filter((_, fileIndex) => fileIndex !== index))}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-bold text-white/72 transition hover:bg-white/[0.09]"
              >
                להסיר
              </button>

              <div className="min-w-0 flex-1 text-right">
                <div className="truncate text-[13px] font-medium text-white">{file.name}</div>
                <div className="mt-1 text-[11px] text-white/45">{Math.max(1, Math.round(file.size / 1024))} KB</div>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <FileText className="h-4 w-4 text-white/72" />
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-[12px] leading-6 text-white/42">אפשר להשאיר ריק אם עדיין אין לך חומרים מסודרים.</p>
      )}
    </div>
  );
}
