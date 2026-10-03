import { Link } from "react-router";
import { features, jobs, pagesConfig } from "../../../constants/config.tsx";
import PillarGrid from "../../../common/components/PillarGrid.tsx";
import Reveal from "../../../common/components/Reveal.tsx";
import SectionTitle from "../../../common/components/SectionTitle.tsx";

export default function JoinUsSection() {
    const { joinUs } = pagesConfig.home;

    return (
        <section id="join" className="torn-band scroll-mt-16 bg-surface py-20 md:py-28">
            <div className="shell">
                <SectionTitle>{joinUs.heading}</SectionTitle>

                <div className="mt-14">
                    <PillarGrid />
                </div>

                {/* Open roles, posted like a notice pinned slightly askew. */}
                <Reveal className="mt-20 flex justify-center">
                    <div className="torn-frame relative w-full max-w-xl rotate-[0.8deg] bg-page px-8 pt-10 pb-9 text-center shadow-[0_20px_40px_-24px_rgb(21_18_30/0.5)]">
                        <span aria-hidden="true" className="absolute top-3 left-1/2 size-3 -translate-x-1/2 rounded-full bg-ember shadow" />
                        <h3 className="display text-xl md:text-2xl">
                            Open positions <span className="text-accent">({jobs.length})</span>
                        </h3>
                        <p className="mt-2 text-lg text-muted">
                            {jobs.length > 0 ? "See the roles and how to apply." : "No open roles right now. Join the Discord to hear when that changes."}
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {features.pages.careers && (
                                <Link to="/careers" className="btn btn-primary">
                                    View careers
                                </Link>
                            )}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
