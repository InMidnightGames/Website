import type { Post, PostSummary } from "../types/content.ts";

/* Demo posts used when the API isn't running or isn't deployed yet (see
   Loaders/withMockFallback.ts). Mirrors backend/src/seed.py so the two look
   the same. */

const bodies: Record<string, string> = {
    "project-core-territory-instead-of-lanes":
        "<p>Project CORE is a third-person 5v5 MOBA and the first playable part of a new dark fantasy IP.</p>" +
        "<h2>Territory, not lanes</h2>" +
        "<p>In place of conventional creep waves and turret lanes, teams fight to capture territory and claim a path toward the enemy base, while contestable events emerge across the battlefield.</p>" +
        "<h2>Built in Unreal</h2>" +
        "<p>CORE is in production for PC, entirely within Unreal Engine, and designed around decisive skill expression and one conviction: no battle is over while players still have the will to turn it.</p>",
    "why-we-build-gameplay-first":
        "<p>We believe numerical balance should support good mechanics, not substitute for them.</p>" +
        "<p>By intentionally providing multiple avenues of skill expression, we aim to create matches where victory is never out of reach.</p>" +
        "<blockquote>Competition carries more weight when players care about what they are fighting for.</blockquote>",
    "meet-the-team-behind-in-midnight-games":
        "<p>In Midnight Games is a gameplay-first independent studio founded by combat designer and high-level competitive player Tanner Liou.</p>" +
        "<p>Our team brings experience spanning indie, AAA production and large-scale online development, supported by attached industry advisors. Meet everyone on the home page.</p>",
    "welcome-to-the-dev-blog":
        "<p>Welcome to the In Midnight Games dev blog. This is where we'll share studio news, design notes and updates on Project CORE.</p>" +
        "<p>Want to follow along between posts? Join the community on Discord.</p>",
};

export const mockPosts: PostSummary[] = [
    {
        id: 1,
        title: "Project CORE: territory instead of lanes",
        slug: "project-core-territory-instead-of-lanes",
        excerpt:
            "CORE is a third-person 5v5 MOBA where teams fight to capture territory and claim a path toward the enemy base, in place of creep waves and turret lanes.",
        coverUrl: "/media/key-art.webp",
        tags: ["Project CORE", "Design"],
        author: "In Midnight Games",
        publishedAt: "2026-09-18T00:00:00Z",
        readingMinutes: 1,
    },
    {
        id: 2,
        title: "Why we build gameplay first",
        slug: "why-we-build-gameplay-first",
        excerpt:
            "Numerical balance should support good mechanics, not substitute for them. Here is how that idea shapes the way we design combat.",
        coverUrl: "/media/careers-banner.webp",
        tags: ["Studio", "Design"],
        author: "In Midnight Games",
        publishedAt: "2026-09-04T00:00:00Z",
        readingMinutes: 1,
    },
    {
        id: 3,
        title: "Meet the team behind In Midnight Games",
        slug: "meet-the-team-behind-in-midnight-games",
        excerpt: "A remote-first team with experience spanning indie, AAA production and large-scale online development.",
        coverUrl: "/media/roster.webp",
        tags: ["Studio", "Team"],
        author: "In Midnight Games",
        publishedAt: "2026-08-21T00:00:00Z",
        readingMinutes: 1,
    },
    {
        id: 4,
        title: "Welcome to the dev blog",
        slug: "welcome-to-the-dev-blog",
        excerpt: "This is where we'll share studio news, design notes and updates on Project CORE.",
        coverUrl: null,
        tags: ["Studio"],
        author: "In Midnight Games",
        publishedAt: "2026-08-07T00:00:00Z",
        readingMinutes: 1,
    },
];

export function mockPostDetail(slug: string): Post | null {
    const post = mockPosts.find((p) => p.slug === slug);

    if (!post) {
        return null;
    }

    return { ...post, body: bodies[slug] ?? `<p>${post.excerpt}</p>`, updatedAt: post.publishedAt ?? "" };
}
