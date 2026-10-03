import DOMPurify from "dompurify";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import { siteConfig } from "../../constants/config.tsx";
import ErrorPage from "../../common/components/ErrorPage.tsx";
import ExternalLink from "../../common/components/ExternalLink.tsx";
import { ErrorState } from "../../common/components/States.tsx";
import { usePost } from "../../common/Hooks/useContent.ts";
import useDocumentTitle from "../../common/Hooks/useDocumentTitle.ts";
import { PostNotFoundError } from "../../common/Loaders/DevBlogLoader.ts";
import { formatDate } from "../../common/utils/format.ts";

export default function PostDetailPage() {
    const { slug = "" } = useParams();
    const { data: post, loading, error } = usePost(slug);

    useDocumentTitle(post?.title ?? "Dev Blog");

    if (error instanceof PostNotFoundError) {
        return <ErrorPage notFound />;
    }

    return (
        <article>
            <header className="torn-bottom relative isolate flex min-h-[46vh] items-end overflow-hidden bg-night pt-28 pb-14 text-moon">
                <img
                    src={post?.coverUrl || "/media/hero-banner-sm.webp"}
                    alt=""
                    className="absolute inset-0 -z-10 size-full object-cover opacity-50"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/60 to-night/30" />

                <div className="shell max-w-3xl">
                    <Link
                        to="/devblog"
                        className="inline-flex items-center gap-2 font-display text-sm font-bold tracking-[0.2em] text-moon/80 uppercase transition-colors hover:text-moon"
                    >
                        <ArrowLeft /> All posts
                    </Link>

                    {error ? (
                        <p className="mt-6 text-lg text-moon/80" role="alert">
                            This post couldn&apos;t load right now.
                        </p>
                    ) : loading || !post ? (
                        <div className="mt-6 h-12 w-4/5 animate-pulse bg-moon/10" aria-busy="true" />
                    ) : (
                        <>
                            <h1 className="display mt-6 animate-fade-up text-3xl text-balance md:text-5xl">{post.title}</h1>
                            <p className="mt-4 font-display text-sm font-bold tracking-[0.2em] uppercase">
                                <span className="text-blood">{formatDate(post.publishedAt)}</span>
                                <span className="mx-2 text-moon/50">/</span>
                                <span className="text-moon/75">{post.author}</span>
                            </p>
                        </>
                    )}
                </div>
            </header>

            {Boolean(error) && (
                <div className="shell max-w-3xl py-16">
                    <ErrorState message="Try refreshing the page." />
                </div>
            )}

            {post && (
                <div className="shell max-w-3xl pt-12 pb-20 md:pb-24">
                    {post.tags.length > 0 && (
                        <ul className="mb-10 flex flex-wrap gap-x-5 gap-y-2">
                            {post.tags.map((tag) => (
                                <li key={tag}>
                                    <Link
                                        to={`/devblog?tag=${encodeURIComponent(tag)}`}
                                        className="font-display text-sm font-bold tracking-[0.2em] text-accent uppercase hover:underline"
                                    >
                                        {tag}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div
                        className="prose-post"
                        // Admin-authored HTML, sanitized anyway: never trust stored markup.
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }}
                    />

                    <div className="mt-16 flex flex-col items-start gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-lg text-muted">Talk about this post with the team and other players.</p>
                        <ExternalLink href={siteConfig.cta.community.url} className="btn btn-primary">
                            {siteConfig.cta.community.icon}
                            {siteConfig.cta.community.label}
                        </ExternalLink>
                    </div>
                </div>
            )}
        </article>
    );
}
