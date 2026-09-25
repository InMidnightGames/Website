import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Scrolls to the element named in the URL hash (e.g. "/#newsletter"), or to the
 * top of the page when a route has no hash. Keyed on the location so clicking
 * the same nav link twice still scrolls.
 */
export function ScrollToHash() {
    const { hash, pathname, key } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0 });
            return;
        }

        const id = decodeURIComponent(hash.slice(1));
        const scroll = () =>
            document.getElementById(id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

        const frame = requestAnimationFrame(scroll);

        // On a fresh load of "/#newsletter" the images above haven't sized in yet,
        // so the first scroll falls short; go again once they have.
        if (document.readyState !== "complete") {
            window.addEventListener("load", scroll, { once: true });
        }

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("load", scroll);
        };
    }, [hash, pathname, key]);

    return null;
}
