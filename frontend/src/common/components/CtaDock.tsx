import { useEffect, useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { siteConfig } from "../../constants/config.tsx";
import ExternalLink from "./ExternalLink.tsx";

const STORAGE_KEY = "img-cta-dock-open";

/** Compact by default so it never covers page content; remembers if the viewer expands it. */
function initialOpen(): boolean {
    try {
        return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
        // Storage blocked (private mode etc.): stay compact.
        return false;
    }
}

/**
 * The persistent "Join the community / Support us / socials" dock, bottom
 * right on every page. Small, collapsible, and it steps aside while the
 * footer (which carries the same links) is on screen.
 */
export default function CtaDock() {
    const [open, setOpen] = useState(initialOpen);
    const [footerVisible, setFooterVisible] = useState(false);
    const { community, support } = siteConfig.cta;
    const socials = siteConfig.socials.filter((s) => s.url && s.url !== community.url && s.url !== support?.url);

    useEffect(() => {
        const footer = document.getElementById("footer");

        if (!footer) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
        observer.observe(footer);

        return () => observer.disconnect();
    }, []);

    function toggle() {
        setOpen((o) => {
            try {
                localStorage.setItem(STORAGE_KEY, String(!o));
            } catch {
                // Not saved; the dock still works for this visit.
            }

            return !o;
        });
    }

    const iconButton = "flex size-10 items-center justify-center text-xl transition-colors";

    return (
        <aside
            aria-label="Community links"
            inert={footerVisible}
            className={`fixed right-3 bottom-3 z-30 transition-[opacity,translate] duration-500 ease-(--ease-out-soft) sm:right-5 sm:bottom-5 ${
                footerVisible ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
            }`}
        >
            <div className="border border-moon/15 bg-night/95 text-moon shadow-[0_16px_40px_-12px_rgb(0_0_0/0.6)]">
                {open ? (
                    <div className="flex w-60 flex-col gap-2 p-2.5">
                        <button
                            type="button"
                            onClick={toggle}
                            className="ml-auto flex size-7 items-center justify-center text-moon/70 transition-colors hover:text-moon"
                            aria-label="Minimise community links"
                            aria-expanded="true"
                        >
                            <CaretDown />
                        </button>
                        <ExternalLink href={community.url} className="btn btn-primary w-full px-4 text-[0.8125rem]">
                            {community.icon}
                            {community.label}
                        </ExternalLink>
                        {support && (
                            <ExternalLink href={support.url} className="btn btn-moon w-full px-4 text-[0.8125rem]">
                                {support.icon}
                                {support.label}
                            </ExternalLink>
                        )}
                        {socials.length > 0 && (
                            <ul className="mt-1 flex justify-between border-t border-moon/15 px-1 pt-2">
                                {socials.map((s) => (
                                    <li key={s.label}>
                                        <ExternalLink
                                            href={s.url}
                                            aria-label={s.label}
                                            className="flex size-8 items-center justify-center text-lg text-moon/75 transition-colors hover:text-blood"
                                        >
                                            {s.icon}
                                        </ExternalLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-1 p-1.5">
                        <ExternalLink
                            href={community.url}
                            aria-label={community.label}
                            title={community.label}
                            className={`${iconButton} bg-ember hover:bg-ember-hover`}
                        >
                            {community.icon}
                        </ExternalLink>
                        {support && (
                            <ExternalLink
                                href={support.url}
                                aria-label={support.label}
                                title={support.label}
                                className={`${iconButton} hidden hover:bg-moon/10 sm:flex`}
                            >
                                {support.icon}
                            </ExternalLink>
                        )}
                        <button
                            type="button"
                            onClick={toggle}
                            className="flex size-8 items-center justify-center text-moon/70 transition-colors hover:text-moon"
                            aria-label="Show all community links"
                            aria-expanded="false"
                        >
                            <CaretUp />
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}
