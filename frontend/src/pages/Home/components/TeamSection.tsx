import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { visibleTeam } from "../../../constants/team.ts";
import Reveal from "../../../common/components/Reveal.tsx";
import { pad2 } from "../../../common/utils/format.ts";

const arrowClass =
    "flex size-10 items-center justify-center border border-moon/25 text-lg text-moon transition-colors hover:border-blood hover:bg-blood/15";

/**
 * Selected member as a round portrait with their bio beside it, and the whole
 * team as a wide grid of square portraits to pick from (after the Gardens
 * Interactive "Meet the Gardeners" section). Always a dark, smoky band so it
 * stands apart from the paper sections around it. Changing member is a short
 * crossfade in place, so the eye stays anchored.
 */
export default function TeamSection() {
    const [index, setIndex] = useState(0);
    const team = visibleTeam;
    const member = team[index];
    const count = team.length;

    const go = (next: number) => setIndex((next + count) % count);

    if (!member) {
        return null;
    }

    return (
        <section id="team" className="torn-band relative isolate scroll-mt-16 overflow-hidden bg-night py-24 text-moon md:py-28">
            <img src="/media/smoke.webp" alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover opacity-30" />

            <div className="shell">
                <Reveal className="text-center">
                    <p className="eyebrow text-blood">Meet the</p>
                    <div className="ruled-title before:bg-moon/20 after:bg-moon/20">
                        <h2 className="display text-2xl sm:text-3xl md:text-4xl">Team</h2>
                    </div>
                </Reveal>

                <div className="mt-12 grid items-center gap-12 md:mt-16 lg:grid-cols-12 lg:gap-14">
                    {/* Selected portrait */}
                    <div className="flex flex-col items-center lg:col-span-4">
                        <div className="relative size-60 md:size-72">
                            <AnimatePresence initial={false}>
                                <motion.img
                                    key={member.name}
                                    src={member.portrait}
                                    alt={`Portrait of ${member.name}`}
                                    width={480}
                                    height={480}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="absolute inset-0 size-full rounded-full border-[6px] border-moon bg-moon object-cover shadow-[0_0_0_2px_var(--color-ember),0_24px_50px_-20px_rgb(0_0_0/0.8)]"
                                />
                            </AnimatePresence>
                        </div>

                        <div className="mt-8 flex items-center gap-5">
                            <button type="button" onClick={() => go(index - 1)} className={arrowClass} aria-label="Previous team member">
                                <CaretLeft />
                            </button>
                            <p className="w-24 text-center font-display text-sm font-bold tracking-[0.3em] text-moon/60" aria-hidden="true">
                                <span className="text-moon">{pad2(index + 1)}</span> / {pad2(count)}
                            </p>
                            <button type="button" onClick={() => go(index + 1)} className={arrowClass} aria-label="Next team member">
                                <CaretRight />
                            </button>
                        </div>
                    </div>

                    {/* Bio + picker */}
                    <div className="lg:col-span-8">
                        <div key={member.name} className="min-h-40 animate-fade-in text-center lg:text-left" aria-live="polite">
                            <h3 className="display text-2xl md:text-3xl">{member.name}</h3>
                            <p className="mt-1 font-display text-sm font-bold tracking-[0.24em] text-blood uppercase">{member.title}</p>
                            <p className="mt-4 max-w-[58ch] text-xl leading-relaxed text-moon/80 max-lg:mx-auto">{member.highlight}</p>
                        </div>

                        <ul className="mt-8 grid grid-cols-6 gap-1.5 border-t border-moon/15 pt-8 sm:grid-cols-9" aria-label="Choose a team member">
                            {team.map((m, i) => (
                                <li key={m.name}>
                                    <button
                                        type="button"
                                        onClick={() => go(i)}
                                        aria-label={`${m.name}, ${m.title}`}
                                        aria-pressed={i === index}
                                        className={`group block aspect-square w-full overflow-hidden transition duration-300 ease-(--ease-out-soft) hover:z-10 hover:-translate-y-1 hover:scale-110 ${
                                            i === index ? "ring-2 ring-blood ring-offset-2 ring-offset-night" : ""
                                        }`}
                                    >
                                        <img
                                            src={m.pic}
                                            alt=""
                                            loading="lazy"
                                            width={283}
                                            height={283}
                                            className={`size-full object-cover transition-opacity duration-300 ${
                                                i === index ? "" : "opacity-45 group-hover:opacity-100"
                                            }`}
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
