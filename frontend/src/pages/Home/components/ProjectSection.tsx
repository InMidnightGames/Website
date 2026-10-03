import type { ReactNode } from "react";
import { pagesConfig } from "../../../constants/config.tsx";
import Reveal from "../../../common/components/Reveal.tsx";
import SectionTitle from "../../../common/components/SectionTitle.tsx";
import TiltCard from "../../../common/components/TiltCard.tsx";

const Mark = ({ children }: { children: ReactNode }) => <strong className="font-bold text-ink">{children}</strong>;

export default function ProjectSection() {
    const { project } = pagesConfig.home;

    return (
        <section id="project" className="scroll-mt-16 overflow-hidden py-24 md:py-32">
            <div className="shell grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
                <Reveal className="order-2 lg:order-1 lg:col-span-6">
                    <TiltCard className="mx-auto w-full max-w-[500px]" panelClassName="rotate-1 bg-[#d9d4cc]">
                        <img src={project.image} alt={project.alt} width={1400} height={1469} loading="lazy" className="w-full" />
                    </TiltCard>
                </Reveal>

                <div className="order-1 lg:order-2 lg:col-span-6">
                    <SectionTitle align="left" eyebrow="Our project">
                        {project.title}
                    </SectionTitle>

                    <Reveal delay={100} className="mt-6 space-y-4 text-xl leading-relaxed text-muted">
                        <p>
                            <Mark>Project CORE</Mark> is a third-person <Mark>5v5 MOBA</Mark> and the first playable part of a
                            new dark fantasy IP. In place of creep waves and turret lanes, teams fight to capture territory
                            and claim a path toward the enemy base.
                        </p>
                        <p>
                            Players command legendary <Mark>champions</Mark> drawn from <Mark>worlds colliding</Mark>, while
                            contestable events emerge across the battlefield.
                        </p>
                        <p>
                            In production for <Mark>PC</Mark> in Unreal Engine, CORE is built around decisive skill
                            expression and one conviction: no battle is over while players still have the will to turn it.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
