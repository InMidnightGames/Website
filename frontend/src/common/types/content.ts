/* Camel-cased shapes the UI works with. Loaders map the API's snake_case
   responses into these (see common/Loaders). */

export type PostSummary = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    coverUrl: string | null;
    tags: string[];
    author: string;
    publishedAt: string | null;
    readingMinutes: number;
};

export type Post = PostSummary & {
    body: string;
    updatedAt: string;
};

export type PostPage = {
    items: PostSummary[];
    total: number;
    tags: string[];
};
