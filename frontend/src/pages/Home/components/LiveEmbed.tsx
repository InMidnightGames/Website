import { useState } from "react";
import { ArrowUpRight, Play, TwitchLogo, YoutubeLogo } from "@phosphor-icons/react";
import { pagesConfig } from "../../../constants/config.tsx";
import ExternalLink from "../../../common/components/ExternalLink.tsx";

type Platform = "twitch" | "youtube";

const { live } = pagesConfig.home.updates;

const PLATFORMS: Record<Platform, { label: string; icon: React.ReactNode; embed: () => string | null; watch: string | null }> = {
    twitch: {
        label: "Twitch",
        icon: <TwitchLogo weight="fill" />,
        embed: () =>
            live.twitchChannel
                ? `https://player.twitch.tv/?${new URLSearchParams({ channel: live.twitchChannel, parent: window.location.hostname, autoplay: "true" })}`
                : null,
        watch: live.twitchChannel ? `https://www.twitch.tv/${live.twitchChannel}` : null,
    },
    youtube: {
        label: "YouTube",
        icon: <YoutubeLogo weight="fill" />,
        embed: () => (live.youtubeChannelId ? `https://www.youtube.com/embed/live_stream?channel=${live.youtubeChannelId}&autoplay=1` : null),
        watch: live.youtubeChannelId ? `https://www.youtube.com/channel/${live.youtubeChannelId}/live` : null,
    },
};

/**
 * Twitch / YouTube stream player with a toggle between the two. The player
 * sits behind a click-to-load poster, so neither embed (or its cookies and
 * player script) loads until a visitor asks for it; after that first click,
 * switching platforms loads the other player straight away.
 */
export default function LiveEmbed() {
    // Start on the configured platform, unless it has no channel set and the other does.
    const fallback: Platform = live.defaultPlatform === "twitch" ? "youtube" : "twitch";
    const [platform, setPlatform] = useState<Platform>(
        PLATFORMS[live.defaultPlatform].embed() || !PLATFORMS[fallback].embed() ? live.defaultPlatform : fallback,
    );
    const [started, setStarted] = useState(false);
    const current = PLATFORMS[platform];
    const embed = current.embed();

    return (
        <div>
            <div className="mb-3 flex gap-1" role="group" aria-label="Stream platform">
                {(Object.keys(PLATFORMS) as Platform[]).map((p) => (
                    <button
                        key={p}
                        type="button"
                        onClick={() => setPlatform(p)}
                        aria-pressed={p === platform}
                        className={`flex items-center gap-2 px-4 py-2 font-display text-sm font-bold tracking-[0.2em] uppercase transition-colors ${
                            p === platform ? "bg-inverse text-inverse-ink" : "text-muted hover:text-ink"
                        }`}
                    >
                        {PLATFORMS[p].icon}
                        {PLATFORMS[p].label}
                    </button>
                ))}
            </div>

            <div className="torn-frame relative aspect-video overflow-hidden bg-[#1a1726] text-moon">
                {!embed ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                        <span className="text-4xl text-moon/60">{current.icon}</span>
                        <p className="text-lg text-moon/80">We&apos;re not streaming on {current.label} yet.</p>
                    </div>
                ) : started ? (
                    <iframe
                        key={platform}
                        src={embed}
                        title={`In Midnight Games on ${current.label}`}
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 size-full"
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setStarted(true)}
                        className="group absolute inset-0 flex items-center justify-center"
                        aria-label={`Load the ${current.label} stream`}
                    >
                        <img src={live.poster} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-60" />
                        <span className="relative flex size-16 items-center justify-center rounded-full bg-ember text-2xl text-moon transition-transform duration-500 ease-(--ease-out-soft) group-hover:scale-110">
                            <Play weight="fill" />
                        </span>
                    </button>
                )}
            </div>

            {current.watch && (
                <ExternalLink
                    href={current.watch}
                    className="mt-3 inline-flex items-center gap-2 font-display text-sm font-bold tracking-[0.2em] text-muted uppercase transition-colors hover:text-ink"
                >
                    Open on {current.label} <ArrowUpRight />
                </ExternalLink>
            )}
        </div>
    );
}
