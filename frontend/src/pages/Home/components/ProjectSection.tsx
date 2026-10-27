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
                    <TiltCard className="mx-auto w-full max-w-[31.25rem]" panelClassName="rotate-1 bg-[#d9d4cc]">
                        <img src={project.image} alt={project.alt} width={1400} height={1469} loading="lazy" className="w-full" />
                    </TiltCard>
                </Reveal>

                <div className="order-1 lg:order-2 lg:col-span-6">
                    <SectionTitle align="left" eyebrow="Our project">
                        {project.title}
                    </SectionTitle>

                    <Reveal delay={100} className="mt-6 space-y-4 text-xl leading-relaxed text-muted">
                        <p>
                            {/*<Mark>Project CORE</Mark> is a third-person <Mark>5v5 MOBA</Mark> and the first playable part of a*/}
                            A non-isometric, third-person <Mark>MOBA</Mark> and the first playable part of a new dark fantasy IP.
                        </p>
                        <p>
                            <Mark>Command legendary champions </Mark> drawn from worlds colliding in a fresh take on the MOBA genre.
                        </p>
                        <p>
                            "Our world remembers those who <Mark>stand defiant </Mark> in the face of impossible odds."
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
