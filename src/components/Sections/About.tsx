import { motion, useReducedMotion } from "framer-motion";
import GradientRule from "../../components/ui/GradientRule";
import HighlightText from "../../components/ui/HighlightText";

type AboutSectionProps = {
    id?: string;
    text?: string;
    ringFrom?: string;
    ringTo?: string;
    highlights?: string[];
    className?: string;
    heading?: string;
    highlightSizeRem?: number;
};

export default function AboutSection({
    id = "about",
    heading = "Y.M.A - אתרים מותאמים אישית בקוד מלא",
    text = `ב־Y.M.A אנחנו רואים בבניית אתר תהליך אישי שמתחיל מהבנה אמיתית של העסק שלך. 
כל אתר נבנה בקוד מלא ולא באמצעות תבניות, מה שמאפשר גמישות מלאה ויכולת התאמה אמיתית לכל צורך, מעיצוב ייחודי ועד פונקציונליות מותאמת. 
אנחנו שמים דגש על מהירות טעינה גבוהה, אבטחה והתאמה מלאה לנייד ולמחשב (Responsive), כדי שהאתר ישרת אותך ואת הלקוחות שלך בצורה חלקה ואמינה.

בזכות שילוב בין טכנולוגיה עדכנית לחשיבה על חוויית המשתמש, כל אתר יוצא מהיר, מאובטח וקל לשימוש. 
המטרה שלנו היא לספק נוכחות דיגיטלית שתהיה אמינה ותשרת את העסק שלך לאורך זמן.`,
    ringFrom = "#FF2E7E",
    ringTo = "#FF7745",
    highlights = [
        "קוד מלא",
        "גמישות מלאה",
        "מהירות טעינה",
        "אבטחה",
        "Responsive",
        "טכנולוגיה עדכנית",
        "חוויית המשתמש",
        "מהיר",
        "מאובטח",
        "קל לשימוש",
        "נוכחות דיגיטלית",
    ],
    className = "",
    highlightSizeRem = 1.3,
}: AboutSectionProps) {
    const prefersReduced = useReducedMotion() ?? false;

    return (
        <section
            id={id}
            aria-labelledby={`${id}-heading`}
            dir="rtl"
            className={`relative flex flex-col items-center justify-center text-center min-h-[70vh] py-10 md:py-14 gap-6 md:gap-8 ${className}`}
        >
            <h2 id={`${id}-heading`} className="sr-only">
                {heading}
            </h2>

            <GradientRule
                from={ringFrom}
                to={ringTo}
                className="w-1/3 mx-auto mb-6 md:mb-7 lg:mb-8 md:w-2/5 lg:w-1/3"
            />

            <div className="w-11/12 max-w-3xl mx-auto sm:w-10/12">
                <motion.div
                    initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-20% 0px -10% 0px" }}
                    transition={{ duration: prefersReduced ? 0.2 : 0.6, ease: "easeOut" }}
                    className="leading-relaxed text-gray-200"
                    style={{ fontSize: "1rem" }}
                >
                    {text.split("\n").map((para, i) =>
                        para.trim() ? (
                            <p key={i} className="mb-6 last:mb-0">
                                <HighlightText
                                    text={para}
                                    highlights={highlights}
                                    from={ringFrom}
                                    to={ringTo}
                                    size={`${highlightSizeRem}rem`}
                                />
                            </p>
                        ) : (
                            <div key={`sp-${i}`} className="h-3" />
                        )
                    )}
                </motion.div>
            </div>

            <div
                className="w-1/3 md:w-2/5 lg:w-1/3 h-[2px] rounded-full mt-6 md:mt-7 lg:mt-8 mx-auto"
                style={{ backgroundImage: `linear-gradient(90deg, ${ringFrom}, ${ringTo})` }}
            />
        </section>
    );
}
