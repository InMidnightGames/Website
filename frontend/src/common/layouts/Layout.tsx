import { Outlet } from "react-router";
import { features } from "../../constants/config.tsx";
import CtaDock from "../components/CtaDock.tsx";
import Footer from "../components/Footer.tsx";
import NavBar from "../components/NavBar.tsx";
import { ScrollToHash } from "../Hooks/ScrollToHash.ts";

export default function Layout() {
    return (
        <div className="relative flex min-h-[100dvh] flex-col">
            <ScrollToHash />
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ember focus:px-4 focus:py-2 focus:text-moon"
            >
                Skip to content
            </a>
            <NavBar />
            <main id="main" className="flex-1">
                <Outlet />
            </main>
            <Footer />
            {features.ctaDock && <CtaDock />}
        </div>
    );
}
