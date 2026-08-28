import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header
            className="sticky top-0 z-50 w-full bg-white bg-navbar border-b border-navbar-line font-caslon"
        >
            <nav className="max-w-340 w-full mx-auto px-4">

                {/* Top row */}
                <div className="flex items-center justify-between py-3">

                    {/* Logo */}
                    <a
                        className="flex-none text-xl font-semibold text-foreground
                        focus:outline-hidden focus:opacity-80 transition-all duration-300"
                        href="#hero"
                        aria-label="Brand"
                    >
                        <span className="inline-flex items-center gap-x-2 text-xl font-bold">
                            In Midnight Games!
                        </span>
                    </a>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="sm:hidden relative size-9 flex justify-center items-center
                        rounded-lg bg-layer border border-layer-line
                        text-layer-foreground shadow-2xs
                        hover:bg-layer-hover
                        focus:outline-hidden"
                        aria-expanded={menuOpen}
                        aria-controls="navbar-menu"
                        aria-label="Toggle navigation"
                    >
                        {/* Hamburger */}
                        <svg
                            className={`${menuOpen ? "hidden" : "block"} size-4`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="3" x2="21" y1="6" y2="6" />
                            <line x1="3" x2="21" y1="12" y2="12" />
                            <line x1="3" x2="21" y1="18" y2="18" />
                        </svg>

                        {/* X */}
                        <svg
                            className={`${menuOpen ? "block" : "hidden"} size-4`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>

                    {/* Desktop navigation */}
                    <div className="hidden sm:block">
                        <div className="flex items-center gap-5">
                            <a
                                className="font-bold text-xl text-primary-active
                                hover:text-[#EB4335] transition-all duration-300"
                                href="#team"
                            >
                                Team
                            </a>

                            <a
                                className="text-xl text-navbar-nav-foreground
                                hover:text-[#EB4335] transition-all duration-300"
                                href="#footer"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mobile navigation */}
                <div
                    id="navbar-menu"
                    className={`
                        sm:hidden
                        ${menuOpen ? "block" : "hidden"}
                        border-t border-navbar-line
                        py-4
                    `}
                >
                    <div className="flex flex-col gap-5">

                        <a
                            className="font-bold text-xl text-primary-active
                            hover:text-[#EB4335] transition-all duration-300"
                            href="#team"
                            onClick={() => setMenuOpen(false)}
                        >
                            Team
                        </a>

                        <a
                            className="text-xl text-navbar-nav-foreground
                            hover:text-[#EB4335] transition-all duration-300"
                            href="#footer"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </a>

                    </div>
                </div>

            </nav>
        </header>
    );
}