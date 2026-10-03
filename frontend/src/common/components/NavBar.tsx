import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { List, X } from "@phosphor-icons/react";
import { features, siteConfig } from "../../constants/config.tsx";
import { navItems } from "../../constants/navigation.ts";
import useInView from "../Hooks/useInView.ts";
import ExternalLink from "./ExternalLink.tsx";

const linkClass = (active: boolean) =>
    `font-display text-sm font-bold tracking-[0.24em] uppercase transition-colors duration-300 ${
        active ? "text-blood" : "text-moon hover:text-blood"
    }`;

/**
 * Transparent over the artwork at the top of a page, solid once scrolled. The emblem
 * hangs from the top edge on a torn tab, after the Gardens Interactive nav.
 * The bar itself is always dark: it sits on artwork at the top of every page.
 */
export default function NavBar() {
    const { pathname, hash, key } = useLocation();
    // The menu belongs to the location it was opened on, so any navigation closes it.
    const [openAt, setOpenAt] = useState<string | null>(null);
    const open = openAt === key;
    // A 1px marker at the top of the page: while visible, the bar stays transparent.
    const { ref: topRef, inView: atTop } = useInView<HTMLDivElement>("0px", false);
    const socials = siteConfig.socials.filter((s) => s.url);

    // Only pages that open on dark artwork get the see-through bar; elsewhere
    // (legal, unsubscribe) there's nothing behind it, so it's solid from the start.
    const overArt =
        (pathname === "/" && features.sections.home.hero) ||
        (pathname === "/careers" && features.sections.careers.banner) ||
        pathname.startsWith("/devblog");
    const solid = !overArt || !atTop || open;

    return (
        <>
            <div ref={topRef} className="pointer-events-none absolute top-0 h-px w-full" aria-hidden="true" />
            <header
                className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
                    solid ? "bg-night shadow-[0_1px_0_rgb(243_236_224/0.1)]" : "bg-gradient-to-b from-night/75 to-transparent"
                }`}
            >
                <nav aria-label="Main" className="flex h-16 items-center justify-between gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-8">
                    <Link to="/" aria-label={`${siteConfig.name} home`} className="relative flex h-full w-[150px] shrink-0 items-center lg:w-[180px]">
                        {/* Over artwork: the emblem hangs on a torn ribbon. Once the bar is solid
                            the ribbon lifts away and the wide logo takes its place. */}
                        <span
                            aria-hidden="true"
                            className={`torn-frame absolute top-0 left-0 flex h-[76px] w-16 items-end justify-center bg-moon pb-3 transition-transform duration-500 ease-(--ease-out-soft) lg:h-[88px] lg:w-[72px] ${
                                solid ? "-translate-y-[110%]" : "translate-y-[-8px]"
                            }`}
                        >
                            <img src={siteConfig.emblem} alt="" width={48} height={48} className="size-11 lg:size-12" />
                        </span>
                        <img
                            src={siteConfig.logoWide}
                            alt=""
                            width={354}
                            height={120}
                            className={`h-10 w-auto transition-[opacity,translate] duration-500 ease-(--ease-out-soft) lg:h-12 ${
                                solid ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
                            }`}
                        />
                    </Link>

                    <div className="hidden items-center gap-10 lg:flex">
                        <ul className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    {item.section ? (
                                        <Link to={item.to} className={linkClass(pathname === "/" && hash === item.to.slice(1))}>
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <NavLink to={item.to} className={({ isActive }) => linkClass(isActive)}>
                                            {item.label}
                                        </NavLink>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <ul className="hidden items-center gap-4 text-xl text-moon xl:flex">
                            {socials.map((s) => (
                                <li key={s.label}>
                                    <ExternalLink href={s.url} aria-label={s.label} className="transition-colors hover:text-blood">
                                        {s.icon}
                                    </ExternalLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpenAt(open ? null : key)}
                        className="-mr-2 flex size-11 items-center justify-center text-2xl text-moon lg:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? "Close menu" : "Open menu"}
                    >
                        {open ? <X /> : <List />}
                    </button>
                </nav>

                <div
                    id="mobile-menu"
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-(--ease-out-soft) lg:hidden ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                >
                    <div className="min-h-0" inert={!open}>
                        <ul className="shell border-t border-moon/10 py-2">
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <Link to={item.to} className="display block py-3 text-lg text-moon">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}
