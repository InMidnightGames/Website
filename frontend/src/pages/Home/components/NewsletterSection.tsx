import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { features, pagesConfig } from "../../../constants/config.tsx";
import { contactApiPost } from "../../../constants/contactApi.ts";
import HoneypotField from "../../../common/components/HoneypotField.tsx";
import { useHoneypot } from "../../../common/Hooks/useHoneypot.ts";

type Status = "idle" | "sending" | "joined" | "failed";

export default function NewsletterSection() {
    const [status, setStatus] = useState<Status>("idle");
    const { getHeaders } = useHoneypot();
    const { newsletter } = pagesConfig.home;

    async function handleSignUp(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setStatus("sending");

        try {
            await contactApiPost("", {
                body: {
                    // The API's Contact schema requires an id.
                    id: crypto.randomUUID(),
                    name: formData.get("name") ?? "",
                    email: formData.get("email"),
                    subscribed: true,
                    shouldDelete: false,
                    tags: newsletter.tags,
                },
                headers: getHeaders(formData),
            });
            setStatus("joined");
        } catch (error) {
            console.error(error);
            setStatus("failed");
        }
    }

    const field =
        "form-field border-transparent bg-moon text-night placeholder:text-night/55 focus:border-blood focus:ring-blood";

    return (
        <section id="newsletter" className="relative z-10 -mt-10 scroll-mt-20 py-16 text-moon md:-mt-14 md:py-20">
            {/* A strip of dark wine paper laid slightly askew across the page. */}
            <div aria-hidden="true" className="torn-band absolute -inset-x-4 inset-y-0 -rotate-[1.2deg] bg-[#3d2230] shadow-xl" />

            <div className="shell relative grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-4">
                    <h2 className="display text-2xl md:text-3xl">{newsletter.heading}</h2>
                    <p className="mt-2 max-w-sm text-lg text-moon/90">{newsletter.blurb}</p>
                </div>

                <div className="lg:col-span-8">
                    {status === "joined" ? (
                        <div role="status" className="border-l-2 border-moon py-2 pl-5">
                            <p className="display text-lg">You&apos;re on the list</p>
                            <p className="mt-1 text-moon/90">Watch your inbox for news from the studio.</p>
                        </div>
                    ) : (
                        <>
                            <form onSubmit={handleSignUp} className="relative flex flex-col gap-4 sm:flex-row sm:items-end">
                                <div className="sm:w-52">
                                    <label className="form-label text-moon/90" htmlFor="newsletter-name">
                                        Name
                                    </label>
                                    <input id="newsletter-name" name="name" type="text" autoComplete="name" className={field} placeholder="Your name" />
                                </div>

                                <div className="flex-1">
                                    <label className="form-label text-moon/90" htmlFor="newsletter-email">
                                        Email
                                    </label>
                                    <input
                                        id="newsletter-email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className={field}
                                        placeholder="you@email.com"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary shrink-0" disabled={status === "sending"}>
                                    {status === "sending" ? "Sending..." : "Subscribe"}
                                </button>

                                <HoneypotField />
                            </form>

                            {status === "failed" && (
                                <p role="alert" className="mt-3 font-bold text-[#ff8a7d]">
                                    That didn&apos;t go through. Check the address and try again.
                                </p>
                            )}

                            {features.pages.legal && (
                                <p className="mt-3 text-moon/85">
                                    See how we handle your data on our{" "}
                                    <Link to="/legal" className="underline underline-offset-4">
                                        legal page
                                    </Link>
                                    .
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
