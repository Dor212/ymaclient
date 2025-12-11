import React from "react";
export default function HighlightText({
    text, highlights, from = "#FF7745", to = "#00C9A7", size = "1.3rem",
}: { text: string; highlights: string[]; from?: string; to?: string; size?: string }) {
    if (!highlights?.length) return <>{text}</>;
    const esc = highlights.filter(Boolean).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!esc.length) return <>{text}</>;
    const split = new RegExp(`(${esc.join("|")})`, "g");
    const exact = new RegExp(`^(?:${esc.join("|")})$`);
    return (
        <>
            {text.split(split).map((p, i) =>
                exact.test(p) ? (
                    <span key={i}
                        className="font-semibold text-transparent align-baseline bg-clip-text"
                        style={{ backgroundImage: `linear-gradient(90deg, ${from}, ${to})`, fontSize: size }}>
                        {p}
                    </span>
                ) : (<React.Fragment key={i}>{p}</React.Fragment>)
            )}
        </>
    );
}
