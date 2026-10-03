import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { pagesConfig, siteConfig } from "../../constants/config.tsx";
import PostCard from "../../common/components/PostCard.tsx";
import { EmptyState, ErrorState, SkeletonGrid } from "../../common/components/States.tsx";
import { usePosts } from "../../common/Hooks/useContent.ts";
import useDocumentTitle from "../../common/Hooks/useDocumentTitle.ts";
import type { PostSummary } from "../../common/types/content.ts";
import { formatDate } from "../../common/utils/format.ts";

const PAGE_SIZE = 12;

/** The newest post as a full-bleed banner, after the Gardens Interactive blog. */
function Feature({ post }: { post: PostSummary | undefined }) {
    return (
        <section className="torn-bottom relative isolate flex min-h-[70vh] items-end overflow-hidden bg-night pt-28 pb-20 text-moon md:min-h-[35rem]">
            <img
                src={post?.coverUrl || "/media/hero-banner.webp"}
                alt=""
                className="absolute inset-0 -z-10 size-full animate-fade-in object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/90 via-night/55 to-night/10" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/70 to-transparent" />

            <div className="shell">
                {post ? (
                    <div className="max-w-xl animate-fade-up">
                        <h2 className="display text-2xl md:text-4xl">{post.title}</h2>
                        <p className="mt-3 font-display text-sm font-bold tracking-[0.24em] text-blood uppercase">
                            {formatDate(post.publishedAt)}
                        </p>
                        {post.excerpt && <p className="mt-3 text-xl leading-relaxed text-moon/85">{post.excerpt}</p>}
                        <Link to={`/devblog/${post.slug}`} className="btn btn-moon mt-7">
                            Read more
                        </Link>
                    </div>
                ) : (
                    <div className="h-40 max-w-xl animate-pulse bg-moon/10" aria-hidden="true" />
                )}
            </div>
        </section>
    );
}

export default function DevBlogPage() {
    const [params, setParams] = useSearchParams();
    const tag = params.get("tag") ?? "";
    const [limit, setLimit] = useState(PAGE_SIZE);
    const { data, loading, error } = usePosts(tag || undefined, limit);
    const { title, subtitle } = pagesConfig.devblog;

    useDocumentTitle(title);

    const setTag = (value: string) => {
        setLimit(PAGE_SIZE);
        setParams(value ? { tag: value } : {}, { replace: true });
    };

    const [lead, ...rest] = data?.items ?? [];
    const tabs = ["", ...(data?.tags ?? [])];

    return (
        <>
            <Feature post={lead} />

            <div className="shell pt-10 pb-20 md:pb-24">
                <header className="flex flex-col gap-6 border-b border-line pb-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="display text-2xl md:text-3xl">{title}</h1>
                        <p className="mt-1 text-lg text-muted">{subtitle}</p>
                    </div>

                    <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0" role="toolbar" aria-label="Filter posts by tag">
                        <ul className="flex min-w-max gap-6">
                            {tabs.map((value) => {
                                const active = value === tag;

                                return (
                                    <li key={value || "all"}>
                                        <button
                                            type="button"
                                            onClick={() => setTag(value)}
                                            aria-pressed={active}
                                            className={`font-display text-sm font-bold tracking-[0.2em] uppercase transition-colors ${
                                                active ? "text-accent" : "text-faint hover:text-ink"
                                            }`}
                                        >
                                            {value || "All"}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </header>

                <div className="mt-10">
                    {loading && !data ? (
                        <SkeletonGrid count={3} />
                    ) : error ? (
                        <ErrorState message="Posts couldn't load right now." />
                    ) : !lead ? (
                        <EmptyState title={tag ? `No posts tagged "${tag}"` : "No posts yet"}>
                            {tag ? "Try another tag." : `The first update from ${siteConfig.name} is on its way.`}
                        </EmptyState>
                    ) : rest.length === 0 ? (
                        <p className="text-lg text-muted">That's every post{tag ? ` tagged "${tag}"` : ""} so far.</p>
                    ) : (
                        <>
                            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                                {rest.map((post) => (
                                    <PostCard key={post.id} post={post} headingLevel="h2" />
                                ))}
                            </div>
                            {data && data.total > data.items.length && (
                                <div className="mt-14 flex justify-center">
                                    <button type="button" onClick={() => setLimit((l) => l + PAGE_SIZE)} className="btn btn-secondary">
                                        Load more
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
