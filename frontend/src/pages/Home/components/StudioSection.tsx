import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { pagesConfig } from "../../../constants/config.tsx";
import Reveal from "../../../common/components/Reveal.tsx";
import SectionTitle from "../../../common/components/SectionTitle.tsx";

/**
 * Positioning statement, then the champion line-up on a torn strip of paper.
 * The line-up marches sideways as the strip scrolls past, like a procession.
 */
export default function StudioSection() {
    const { studio } = pagesConfig.home;
    const bandRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "0%"]);

    return (
        <section id="studio" className="scroll-mt-16 pt-20 pb-6 md:pt-28 md:pb-8">
            <div className="shell">
                <SectionTitle align="left">Our studio</SectionTitle>
                <Reveal as="p" delay={100} className="mt-5 max-w-3xl font-display text-2xl leading-snug text-ink italic md:text-4xl md:leading-tight">
                    {studio.statement}
                </Reveal>
            </div>

            {/* A flat light band: the navy silhouettes need a pale ground to read. */}
            <div ref={bandRef} className="torn-band mt-12 overflow-hidden bg-band py-10 md:mt-16 md:py-14">
                {/* Wider than a phone screen so the drift never shows an edge. */}
                <div className="-mx-[7.5%] w-[115%] md:mx-auto md:w-full md:max-w-[73.75rem] md:px-4">
                    <motion.img
                        style={{ x }}
                        src={studio.roster}
                        alt={studio.rosterAlt}
                        width={2600}
                        height={770}
                        loading="lazy"
                        className="w-full"
                    />
                </div>
            </div>
        </section>
    );
}
