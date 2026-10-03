import { pillars } from "../../constants/config.tsx";
import Reveal from "./Reveal.tsx";
import TiltCard from "./TiltCard.tsx";

/** Each pillar's plate sits at its own angle, so the row looks laid down by hand. */
const PLATES = [
    "translate-x-3 translate-y-3 -rotate-3",
    "-translate-x-3 translate-y-3 rotate-2",
    "translate-x-3 translate-y-2 rotate-3",
];

/**
 * The studio pillars: one character silhouette each on a torn paper panel,
 * over a crimson plate, leaning toward the pointer like the key art in the
 * project section. Every figure is fitted to the same box so they read at one size.
 */
export default function PillarGrid() {
    return (
        <ul className="mx-auto grid max-w-[61.25rem] gap-16 sm:grid-cols-3 sm:gap-10">
            {pillars.map((pillar, i) => (
                <Reveal as="li" key={pillar.title} delay={i * 120} className={`text-center ${i === 1 ? "sm:mt-14" : ""}`}>
                    <TiltCard
                        className="mx-auto aspect-square w-full max-w-[16.875rem]"
                        panelClassName={`bg-moon p-5 ${i === 1 ? "-rotate-1" : "rotate-1"}`}
                        plateClassName={PLATES[i % PLATES.length]}
                        strength={12}
                    >
                        <img
                            src={pillar.image}
                            alt={pillar.alt}
                            loading="lazy"
                            className="size-full object-contain object-bottom"
                        />
                    </TiltCard>
                    <h3 className="display mt-8 text-lg text-ink">{pillar.title}</h3>
                    <p className="mx-auto mt-2 max-w-[30ch] text-lg text-muted">{pillar.blurb}</p>
                </Reveal>
            ))}
        </ul>
    );
}
