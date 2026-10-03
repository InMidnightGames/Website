import { isAxiosError } from "axios";
import { api } from "../../constants/axiosClient.ts";
import { mockPostDetail, mockPosts } from "../data/mockData.ts";
import type { Post, PostPage, PostSummary } from "../types/content.ts";
import withMockFallback from "./withMockFallback.ts";

/** Raw post summary as the API returns it (snake_case). */
interface ApiPostSummary {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_url: string | null;
    tags: string[];
    author: string;
    published_at: string | null;
    reading_minutes: number;
}

interface ApiPost extends ApiPostSummary {
    body: string;
    updated_at: string;
}

interface ApiPostPage {
    items: ApiPostSummary[];
    total: number;
    tags: string[];
}

export class PostNotFoundError extends Error {}

const toSummary = (post: ApiPostSummary): PostSummary => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverUrl: post.cover_url || null,
    tags: post.tags,
    author: post.author,
    publishedAt: post.published_at,
    readingMinutes: post.reading_minutes,
});

export async function loadPosts(tag?: string, offset: number = 0, limit: number = 20): Promise<PostPage> {
    return withMockFallback(
        async () => {
            const response = await api.get<ApiPostPage>("/devblog", {
                params: { tag: tag || undefined, offset, limit },
            });

            return {
                items: response.data.items.map(toSummary),
                total: response.data.total,
                tags: response.data.tags,
            };
        },
        () => {
            const items = mockPosts.filter((p) => !tag || p.tags.includes(tag));

            return {
                items: items.slice(offset, offset + limit),
                total: items.length,
                tags: [...new Set(mockPosts.flatMap((p) => p.tags))].sort(),
            };
        },
    );
}

export async function loadPost(slug: string): Promise<Post> {
    try {
        return await withMockFallback(
            async () => {
                const response = await api.get<ApiPost>(`/devblog/${encodeURIComponent(slug)}`);

                return { ...toSummary(response.data), body: response.data.body, updatedAt: response.data.updated_at };
            },
            () => {
                const post = mockPostDetail(slug);

                if (!post) {
                    throw new PostNotFoundError(slug);
                }

                return post;
            },
        );
    } catch (err) {
        // A real 404 shows the not-found page; anything else is a load error.
        if (isAxiosError(err) && err.response?.status === 404) {
            throw new PostNotFoundError(slug);
        }

        throw err;
    }
}
