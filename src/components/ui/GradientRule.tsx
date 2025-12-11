import { motion } from "framer-motion";
export default function GradientRule({
    from = "#FF7745", to = "#00C9A7", className = "", once = true,
}: { from?: string; to?: string; className?: string; once?: boolean }) {
    const style: React.CSSProperties = {
        backgroundImage: `linear-gradient(90deg, ${from}, ${to}, ${from})`,
        backgroundSize: "200% 100%",
    };
    return (
        <motion.div
            className={`h-[2px] rounded-full ${className}`}
            style={style}
            initial={{ opacity: 0, backgroundPosition: "0% 50%" }}
            whileInView={{ opacity: 1, backgroundPosition: "100% 50%" }}
            viewport={{ once }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            aria-hidden
        />
    );
}
