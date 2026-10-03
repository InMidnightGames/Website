import type { ReactNode } from "react";
import Reveal from "./Reveal.tsx";

export interface SectionTitleProps {
    children: ReactNode;
    /** Small accent line above the title, e.g. "Meet the". Use sparingly. */
    eyebrow?: string;
    /** Centered between hairlines (default), or left-aligned with no rules. */
    align?: "center" | "left";
    as?: "h1" | "h2";
    id?: string;
}

/** Section heading after the Gardens Interactive "Meet the Gardeners" title. */
export default function SectionTitle({ children, eyebrow, align = "center", as: Heading = "h2", id }: SectionTitleProps) {
    const title = <Heading id={id} className="display text-2xl text-ink sm:text-3xl md:text-4xl">{children}</Heading>;

    if (align === "left") {
        return (
            <Reveal>
                {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
                {title}
            </Reveal>
        );
    }

    return (
        <Reveal className="text-center">
            {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
            <div className="ruled-title">{title}</div>
        </Reveal>
    );
}
