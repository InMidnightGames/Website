import { Outlet } from "react-router";
import NavBar from "../Components/NavBar.tsx";
import Footer from "../Components/Footer.tsx";
import { ScrollToHash } from "../Hooks/ScrollToHash.ts";

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <ScrollToHash />
            <NavBar />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
