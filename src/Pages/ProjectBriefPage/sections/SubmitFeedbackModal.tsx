import { AlertTriangle, CheckCircle2, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SubmitFeedbackModalProps = {
    open: boolean;
    status: "success" | "error";
    title: string;
    message: string;
    onClose: () => void;
    onRetry?: () => void;
    showRetry?: boolean;
};

export default function SubmitFeedbackModal({
    open,
    status,
    title,
    message,
    onClose,
    onRetry,
    showRetry = false,
}: SubmitFeedbackModalProps) {
    const Icon = status === "success" ? CheckCircle2 : AlertTriangle;
    const iconClassName =
        status === "success"
            ? "text-[#00C9A7] drop-shadow-[0_0_14px_rgba(0,201,167,0.38)]"
            : "text-[#FF6B9D] drop-shadow-[0_0_14px_rgba(255,107,157,0.34)]";

    return (
        <AnimatePresence>
            {open ? (
                <>
                    <motion.button
                        type="button"
                        aria-label="סגירת חלון סטטוס"
                        className="fixed inset-0 z-[130] bg-[#050816]/74 backdrop-blur-[10px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <div className="fixed inset-0 z-[140] flex items-center justify-center px-4" dir="rtl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 18 }}
                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full max-w-[34rem]"
                        >
                            <div className="relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(145deg,rgba(8,13,25,0.96),rgba(22,10,29,0.92))] px-6 pb-7 pt-8 text-center shadow-[0_0_42px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:px-8 sm:pb-8 sm:pt-9">
                                <div
                                    aria-hidden
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background:
                                            status === "success"
                                                ? "radial-gradient(circle at 18% 18%, rgba(0,201,167,0.16), transparent 30%), radial-gradient(circle at 84% 18%, rgba(58,134,255,0.18), transparent 28%), radial-gradient(circle at 50% 100%, rgba(255,119,69,0.08), transparent 28%)"
                                                : "radial-gradient(circle at 18% 18%, rgba(255,46,126,0.16), transparent 30%), radial-gradient(circle at 84% 18%, rgba(58,134,255,0.14), transparent 28%), radial-gradient(circle at 50% 100%, rgba(255,119,69,0.08), transparent 28%)",
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="סגור"
                                    className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 transition hover:bg-white/[0.08]"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/12 bg-white/[0.05]">
                                        <Icon className={`h-8 w-8 ${iconClassName}`} />
                                    </div>

                                    <p className="mt-5 text-[11px] font-black uppercase tracking-[0.28em] text-[#8FE7FF]/72">
                                        {status === "success" ? "SENT" : "NOT SENT"}
                                    </p>

                                    <h3 className="mt-3 text-[1.75rem] font-black leading-tight text-white sm:text-[2rem]">
                                        {title}
                                    </h3>

                                    <p className="mt-4 max-w-[30rem] whitespace-pre-line text-[14px] leading-7 text-white/78 sm:text-[15px]">
                                        {message}
                                    </p>

                                    <div className="flex flex-col-reverse gap-3 mt-7 sm:flex-row sm:items-center sm:justify-center">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-white/[0.08]"
                                        >
                                            סגירה
                                        </button>

                                        {showRetry && onRetry ? (
                                            <button
                                                type="button"
                                                onClick={onRetry}
                                                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3A86FF]/35 bg-[linear-gradient(90deg,#FF2E7E,#3A86FF,#FF7745)] px-5 py-3 text-[14px] font-black text-white shadow-[0_0_24px_rgba(58,134,255,0.22)] transition hover:scale-[1.01]"
                                            >
                                                לנסות שוב
                                                <RefreshCw className="w-4 h-4" />
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            ) : null}
        </AnimatePresence>
    );
}