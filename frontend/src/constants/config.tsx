import type { ReactNode } from "react";
import {
    DiscordLogo,
    FacebookLogo,
    InstagramLogo,
    PatreonLogo,
    TiktokLogo,
    XLogo,
    YoutubeLogo,
} from "@phosphor-icons/react";

/* ==========================================================================
   Site configuration
   --------------------------------------------------------------------------
   Everything that ISN'T managed from the admin dashboard lives here: copy,
   links, art, open roles and feature flags. Dev blog posts come from the API
   (backend/), the team list from constants/team.ts.

   Art lives in public/media (regenerate it with `npm run assets`), so image
   values are plain paths like "/media/hero-banner.webp". Any full URL works too.

   Colours and fonts are set in src/index.css (search "TOKENS" / "FONTS").
   ========================================================================== */

export type SocialLink = {
    label: string;
    url: string;
    icon: ReactNode;
};

export type Pillar = {
    title: string;
    blurb: string;
    image: string;
    alt: string;
};

export type Job = {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    /** Where "Apply" goes: an ATS link, a mailto:, a Notion page... */
    url: string;
};

const links = {
    // TODO: your Discord invite. Every "Join the community" button points here.
    discord: "https://discord.com/",
    patreon: "https://www.patreon.com/cw/InMidnightGames",
    youtube: "https://www.youtube.com/channel/UCR53qgxOvSYWjJnDx8RncaA",
    x: "https://x.com/inmidnightgames",
    tiktok: "https://www.tiktok.com/@inmidnightgames",
    instagram: "http://instagram.com/inmidnight.games",
    facebook: "https://www.facebook.com/people/InMidnight-Games/61592747566097/",
};

/* --------------------------------------------------------------------------
   Feature flags. `false` hides a page (its route, nav + footer links) or a
   section. Home-page nav links hide with the section they point at.
   -------------------------------------------------------------------------- */
export const features = {
    pages: {
        careers: false,
        devblog: false,
        legal: true,
        unsubscribe: false,
    },
    /** Floating Discord / Patreon / socials dock, bottom right on every page. */
    ctaDock: true,
    /** Patreon: the "Support us" buttons (hero + dock) and the Patreon social icon. */
    patreon: false,
    sections: {
        home: {
            hero: true,
            newsletter: false,
            studio: true,
            joinUs: true,
            team: true,
            project: true,
            updates: true,
        },
        careers: {
            banner: true,
            pillars: true,
            openings: true,
        },
    },
};

export type Theme = "dark" | "light" | "system";

export const siteConfig = {
    name: "In Midnight Games",

    /** Colour theme for the whole site: "dark", "light", or "system" (follows the
        visitor's OS setting). Artwork sections stay dark in every theme. */
    theme: "system" as Theme,

    logo: "/media/logo.webp",
    /** Emblem + wordmark with light text, shown in the solid nav bar. */
    logoWide: "/media/logo-wide.webp",
    emblem: "/media/logo-emblem.webp",

    api: {
        baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
        /** Skip the API and render bundled demo posts. Also on in a production
            build with no VITE_API_URL, so the site works before the backend is deployed. */
        useMock: import.meta.env.VITE_USE_MOCK === "true" || (import.meta.env.PROD && !import.meta.env.VITE_API_URL),
        /** In dev, fall back to demo data if the backend isn't running. */
        fallbackToMock: import.meta.env.DEV,
    },

    /** EmailService contacts API the newsletter + unsubscribe forms post to. */
    contactApiUrl: (import.meta.env.VITE_CONTACT_API_URL ?? "").replace(/\/+$/, ""),

    links,

    /** The two calls to action used by the floating dock, hero and footer. */
    cta: {
        community: { label: "Join the community", url: links.discord, icon: <DiscordLogo weight="fill" /> },
        /** null while features.patreon is off. */
        support: features.patreon
            ? { label: "Support us", url: links.patreon, icon: <PatreonLogo weight="fill" /> }
            : null,
    },

    /** Footer + dock socials. Entries with an empty url are hidden (Patreon's too while features.patreon is off). */
    socials: [
        { label: "Discord", url: links.discord, icon: <DiscordLogo weight="fill" /> },
        { label: "YouTube", url: links.youtube, icon: <YoutubeLogo weight="fill" /> },
        { label: "X", url: links.x, icon: <XLogo weight="bold" /> },
        { label: "TikTok", url: links.tiktok, icon: <TiktokLogo weight="fill" /> },
        { label: "Instagram", url: links.instagram, icon: <InstagramLogo weight="bold" /> },
        { label: "Facebook", url: links.facebook, icon: <FacebookLogo weight="fill" /> },
        { label: "Patreon", url: features.patreon ? links.patreon : "", icon: <PatreonLogo weight="fill" /> },
    ] satisfies SocialLink[],
};

/** Studio pillars, shown on the home page (Join us) and the careers page. */
export const pillars: Pillar[] = [
    {
        title: "Remote first",
        blurb: "A distributed team across time zones, hired for craft rather than a commute.",
        image: "/media/pillar-remote.webp",
        alt: "Silhouette of a wandering swordsman in a wide-brimmed hat",
    },
    {
        title: "Gameplay first",
        blurb: "Mechanics lead every decision. Numbers support good design, they never stand in for it.",
        image: "/media/pillar-gameplay.webp",
        alt: "Silhouette of a beast-like warrior lunging forward",
    },
    {
        title: "Skill expression",
        blurb: "Many ways to outplay an opponent, so no match is decided before the final fight.",
        image: "/media/pillar-skill.webp",
        alt: "Silhouette of a spear fighter mid-strike",
    },
];

/** Open roles. Leave empty to show "0 open positions". No backend: edit this list.
    Example entry:
    { id: "gameplay-engineer", title: "Gameplay Engineer", department: "Engineering",
      location: "Remote", type: "Contract", url: "mailto:jobs@example.com" } */
export const jobs: Job[] = [];

export const pagesConfig = {
    home: {
        hero: {
            image: "/media/hero-banner.webp",
            imageSmall: "/media/hero-banner-sm.webp",
            alt: "A gothic castle on a hill under a full moon",
            mission:
                "We build competitive games that are approachable, difficult to master, and deep enough to reward study, execution and teamwork.",
        },

        newsletter: {
            heading: "Get the news first",
            blurb: "Studio news and Project CORE updates in your inbox. Unsubscribe anytime.",
            /** Tags attached to the contact record, so signups can be attributed. */
            tags: [] as string[],
        },

        studio: {
            statement:
                "We are an independent game studio creating competitive multiplayer games built around deep combat and long-term player mastery.",
            roster: "/media/roster.webp",
            rosterAlt: "The Project CORE champion line-up in silhouette",
        },

        joinUs: {
            heading: "Our pillars",
        },

        team: {
            heading: "The team",
        },

        project: {
            title: "Project CORE",
            image: "/media/key-art.webp",
            alt: "Concept art of a horned beast warrior leaning on a greatsword",
        },

        updates: {
            heading: "What's happening?",
            /** How many dev blog posts sit beside the stream. */
            postCount: 3,
            live: {
                /** Which player the Twitch / YouTube toggle starts on. */
                defaultPlatform: "twitch" as "twitch" | "youtube",
                // TODO: your Twitch channel name (twitch.tv/<name>). Empty shows a "not live on Twitch yet" note.
                twitchChannel: "",
                youtubeChannelId: "UCR53qgxOvSYWjJnDx8RncaA",
                /** Shown until the viewer clicks play, so the player doesn't load on every visit. */
                poster: "/media/hero-banner-sm.webp",
            },
        },
    },

    careers: {
        banner: {
            image: "/media/careers-banner.webp",
            alt: "A gothic castle on a hill under a full moon",
            eyebrow: "Join In Midnight Games",
            title: "Build with us",
        },
        intro: {
            heading: "Making competitive games worth mastering",
            paragraphs: [
                "In Midnight Games is a gameplay-first independent studio founded by combat designer and high-level competitive player Tanner Liou. Our team brings experience spanning indie, AAA production and large-scale online development.",
                "We are building Project CORE, a third-person 5v5 MOBA and the first playable part of a new dark fantasy IP, in Unreal Engine for PC.",
                "We build games by and for people who love competition. If that sounds like you, we would like to hear from you, even when there is no role listed below.",
            ],
        },
    },

    devblog: {
        title: "Dev Blog",
        subtitle: "Studio news, design notes and updates on Project CORE.",
    },
};
