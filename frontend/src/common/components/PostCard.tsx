import { Link } from "react-router";
import { siteConfig } from "../../constants/config.tsx";
import type { PostSummary } from "../types/content.ts";
import { formatShortDate } from "../utils/format.ts";

/** Cover image, or the studio emblem on a midnight plate when a post has none. */
export function PostCover({ post, className = "" }: { post: PostSummary; className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-[#1a1726] ${className}`}>
            {post.coverUrl ? (
                <img
                    src={post.coverUrl}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.04]"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={siteConfig.emblem} alt="" loading="lazy" className="w-1/5 max-w-20 opacity-80" />
                </div>
            )}
        </div>
    );
}

/** Tag and date line shared by every post teaser. */
export function PostMeta({ post }: { post: PostSummary }) {
    return (
        <p className="font-display text-sm font-bold tracking-[0.2em] uppercase">
            {post.tags[0] && <span className="text-accent">{post.tags[0]}</span>}
            {post.tags[0] && <span className="mx-2 text-faint">/</span>}
            <span className="text-faint">{formatShortDate(post.publishedAt)}</span>
        </p>
    );
}

/** Dev blog teaser card: torn-edge cover, meta, title. The whole card is the link. */
export default function PostCard({ post, headingLevel: Heading = "h3" }: { post: PostSummary; headingLevel?: "h2" | "h3" }) {
    return (
        <article className="group relative flex flex-col">
            <PostCover post={post} className="torn-frame aspect-video" />
            <div className="mt-5">
                <PostMeta post={post} />
            </div>
            <Heading className="display mt-2 text-lg text-balance text-ink">
                <Link to={`/devblog/${post.slug}`} className="transition-colors group-hover:text-accent">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                </Link>
            </Heading>
            {post.excerpt && <p className="mt-2 line-clamp-2 text-muted">{post.excerpt}</p>}
        </article>
    );
}
