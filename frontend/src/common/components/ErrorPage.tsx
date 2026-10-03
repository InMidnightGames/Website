import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import useDocumentTitle from "../Hooks/useDocumentTitle.ts";

/** Router error boundary + the 404 page. */
export default function ErrorPage({ notFound = false }: { notFound?: boolean }) {
    const error = useRouteError();
    const is404 = notFound || (isRouteErrorResponse(error) && error.status === 404);

    useDocumentTitle(is404 ? "Not found" : "Something went wrong");

    return (
        <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden bg-night pt-24 pb-16 text-moon">
            <img src="/media/hero-banner-sm.webp" alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-30" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-night/30" />
            <div className="shell">
                <p className="display text-6xl text-blood md:text-8xl">{is404 ? "404" : "Lost"}</p>
                <h1 className="display mt-6 text-2xl md:text-3xl">{is404 ? "Nothing waits here." : "Something went wrong."}</h1>
                <p className="mt-4 max-w-md text-lg text-moon/80">
                    {is404 ? "This page doesn't exist, or it may have moved." : "Try refreshing, or head back home."}
                </p>
                <Link to="/" className="btn btn-moon mt-10">
                    Back home
                </Link>
            </div>
        </section>
    );
}
