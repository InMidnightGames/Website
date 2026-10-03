import { Link } from "react-router";
import { siteConfig } from "../../constants/config.tsx";
import { legalItems, navItems } from "../../constants/navigation.ts";
import ExternalLink from "./ExternalLink.tsx";

export default function Footer() {
    const socials = siteConfig.socials.filter((s) => s.url);

    return (
        <footer id="footer" className="mt-auto bg-night text-moon">
            <div className="shell flex flex-col items-center gap-8 py-12 text-center">
                <Link to="/" aria-label={`${siteConfig.name} home`}>
                    <img src={siteConfig.emblem} alt="" width={56} height={56} className="size-14" />
                </Link>

                <nav aria-label="Footer">
                    <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className="font-display text-sm font-bold tracking-[0.2em] text-moon/70 uppercase transition-colors hover:text-moon"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <ul className="flex gap-5 text-2xl text-moon/70" aria-label="Contact us">
                    {socials.map((s) => (
                        <li key={s.label}>
                            <ExternalLink href={s.url} aria-label={s.label} className="inline-block transition-[color,transform] duration-300 hover:-translate-y-1 hover:text-blood">
                                {s.icon}
                            </ExternalLink>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-moon/55">
                    <p>&copy; {new Date().getFullYear()} {siteConfig.name}</p>
                    {legalItems.map((item) => (
                        <Link key={item.to} to={item.to} className="transition-colors hover:text-moon">
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
