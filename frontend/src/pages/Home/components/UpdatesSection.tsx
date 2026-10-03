import { Link } from "react-router";
import { features, pagesConfig } from "../../../constants/config.tsx";
import { PostCover, PostMeta } from "../../../common/components/PostCard.tsx";
import Reveal from "../../../common/components/Reveal.tsx";
import SectionTitle from "../../../common/components/SectionTitle.tsx";
import { EmptyState, ErrorState } from "../../../common/components/States.tsx";
import { usePosts } from "../../../common/Hooks/useContent.ts";
import LiveEmbed from "./LiveEmbed.tsx";

function LatestPosts() {
    const { postCount } = pagesConfig.home.updates;
    const { data, loading, error } = usePosts(undefined, postCount);

    if (loading) {
        return (
            <div className="space-y-6" aria-busy="true" aria-label="Loading posts">
                {Array.from({ length: postCount }, (_, i) => (
                    <div key={i} className="h-24 animate-pulse bg-raised" />
                ))}
            </div>
        );
    }

    if (error) {
        return <ErrorState message="Posts couldn't load right now." />;
    }

    if (!data?.items.length) {
        return <EmptyState title="No posts yet">The first update is on its way.</EmptyState>;
    }

    return (
        <ul className="space-y-6">
            {data.items.map((post) => (
                <li key={post.id}>
                    <article className="group relative grid grid-cols-[112px_1fr] items-center gap-5 transition-transform duration-300 ease-(--ease-out-soft) hover:translate-x-1.5 sm:grid-cols-[140px_1fr]">
                        <PostCover post={post} className="torn-frame aspect-[4/3] transition-transform duration-500 group-hover:-rotate-2" />
                        <div>
                            <PostMeta post={post} />
                            <h3 className="mt-1 text-xl leading-snug font-bold text-balance text-ink transition-colors group-hover:text-accent">
                                <Link to={`/devblog/${post.slug}`}>
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    {post.title}
                                </Link>
                            </h3>
                        </div>
                    </article>
                </li>
            ))}
        </ul>
    );
}

/** Stream player beside the latest dev blog posts (after Riot's "What's happening?"). */
export default function UpdatesSection() {
    const { updates } = pagesConfig.home;
    const blog = features.pages.devblog;

    return (
        <section id="updates" className="torn-band scroll-mt-16 bg-surface py-24 md:py-28">
            <div className="shell">
                <SectionTitle align="left">{updates.heading}</SectionTitle>

                <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
                    <Reveal className={blog ? "lg:col-span-7" : "lg:col-span-8 lg:col-start-3"}>
                        <LiveEmbed />
                    </Reveal>
                    {blog && (
                        <Reveal delay={100} className="lg:col-span-5 lg:pt-12">
                            <LatestPosts />
                        </Reveal>
                    )}
                </div>

                {blog && (
                    <div className="mt-14 flex justify-center">
                        <Link to="/devblog" className="btn btn-secondary">
                            Visit the dev blog
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
