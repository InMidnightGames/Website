import { useState } from "react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { features, jobs, pagesConfig, siteConfig, type Job } from "../../constants/config.tsx";
import ExternalLink from "../../common/components/ExternalLink.tsx";
import PillarGrid from "../../common/components/PillarGrid.tsx";
import Reveal from "../../common/components/Reveal.tsx";
import SectionTitle from "../../common/components/SectionTitle.tsx";
import { EmptyState } from "../../common/components/States.tsx";
import useDocumentTitle from "../../common/Hooks/useDocumentTitle.ts";

type FilterKey = "department" | "location" | "type";

const FILTERS: { key: FilterKey; all: string }[] = [
    { key: "department", all: "All departments" },
    { key: "location", all: "All locations" },
    { key: "type", all: "All employment types" },
];

const unique = (key: FilterKey) => [...new Set(jobs.map((job) => job[key]))].sort();

function Banner() {
    const { banner, intro } = pagesConfig.careers;

    return (
        <>
            <section className="torn-bottom relative isolate flex h-[52vh] min-h-[380px] max-h-[560px] items-center overflow-hidden bg-night text-moon">
                <img
                    src={banner.image}
                    alt={banner.alt}
                    fetchPriority="high"
                    className="absolute inset-0 -z-10 size-full animate-fade-in object-cover object-[50%_60%]"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/85 via-night/40 to-transparent" />
                <div className="shell pt-16">
                    <p className="eyebrow animate-fade-up text-moon/85">{banner.eyebrow}</p>
                    <h1 className="display mt-2 animate-fade-up text-3xl [animation-delay:120ms] md:text-5xl">{banner.title}</h1>
                </div>
            </section>

            <Reveal as="section" className="shell py-16 md:py-20">
                <h2 className="display mx-auto max-w-2xl text-center text-xl text-balance md:text-2xl">{intro.heading}</h2>
                <div className="mx-auto mt-8 grid max-w-4xl gap-5 text-lg text-muted md:grid-cols-2 md:gap-x-12">
                    {intro.paragraphs.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                </div>
            </Reveal>
        </>
    );
}

function JobRow({ job }: { job: Job }) {
    return (
        <li className="group relative flex flex-col gap-3 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h4 className="text-xl font-bold text-ink transition-colors group-hover:text-accent">
                    <ExternalLink href={job.url}>
                        <span className="absolute inset-0" aria-hidden="true" />
                        {job.title}
                    </ExternalLink>
                </h4>
                <p className="mt-1 text-muted">
                    {job.department}, {job.location}, {job.type}
                </p>
            </div>
            <span className="inline-flex items-center gap-2 font-display text-sm font-bold tracking-[0.2em] text-ink uppercase">
                Apply <ArrowUpRight />
            </span>
        </li>
    );
}

function Openings() {
    const [filters, setFilters] = useState<Record<FilterKey, string>>({ department: "", location: "", type: "" });
    const filtered = jobs.filter((job) => FILTERS.every(({ key }) => !filters[key] || job[key] === filters[key]));

    return (
        <section id="openings" className="scroll-mt-16 bg-surface py-16 md:py-20">
            <div className="shell max-w-[1040px]">
                <SectionTitle eyebrow="A career at In Midnight">
                    Open positions <span className="text-accent">({jobs.length})</span>
                </SectionTitle>

                <div className="mt-10 grid gap-3 md:grid-cols-3">
                    {FILTERS.map(({ key, all }) => (
                        <div key={key} className="relative">
                            <label htmlFor={`filter-${key}`} className="sr-only">
                                {all}
                            </label>
                            <select
                                id={`filter-${key}`}
                                value={filters[key]}
                                onChange={(e) => setFilters((f) => ({ ...f, [key]: e.target.value }))}
                                className="form-field appearance-none bg-none py-2.5 pr-12"
                            >
                                <option value="">{all}</option>
                                {unique(key).map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            <CaretDown className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-accent" />
                        </div>
                    ))}
                </div>

                <h3 className="display mt-10 text-lg">
                    Jobs <span className="text-accent">({filtered.length})</span>
                </h3>

                <div className="mt-4">
                    {filtered.length > 0 ? (
                        <ul className="border-t border-line">
                            {filtered.map((job) => (
                                <JobRow key={job.id} job={job} />
                            ))}
                        </ul>
                    ) : (
                        <EmptyState title={jobs.length ? "No roles match those filters" : "No open positions right now"}>
                            <p>{jobs.length ? "Try clearing a filter to see every role." : "Join the Discord to hear when new roles open."}</p>
                            {jobs.length === 0 && (
                                <ExternalLink href={siteConfig.cta.community.url} className="btn btn-primary mt-6">
                                    {siteConfig.cta.community.icon}
                                    {siteConfig.cta.community.label}
                                </ExternalLink>
                            )}
                        </EmptyState>
                    )}
                </div>
            </div>
        </section>
    );
}

export default function CareersPage() {
    const show = features.sections.careers;

    useDocumentTitle("Careers");

    return (
        <>
            {show.banner ? <Banner /> : <div className="h-24" />}
            {show.pillars && (
                <section className="pb-16 md:pb-20">
                    <div className="shell">
                        <SectionTitle>Our pillars</SectionTitle>
                        <div className="mt-10">
                            <PillarGrid />
                        </div>
                    </div>
                </section>
            )}
            {show.openings && <Openings />}
        </>
    );
}
