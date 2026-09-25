import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { contactApiPost } from "../../../constants/contactApi.ts";
import HoneypotField from "../../../Common/Components/HoneypotField.tsx";
import { useHoneypot } from "../../../Common/Hooks/useHoneypot.ts";

type Status = "idle" | "sending" | "joined" | "failed";

export default function NewsletterSection() {
    const [status, setStatus] = useState<Status>("idle");
    const { getHeaders } = useHoneypot();

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
                    tags: [],
                },
                headers: getHeaders(formData),
            });
            setStatus("joined");
        } catch (error) {
            console.error(error);
            setStatus("failed");
        }
    }

    return (
        <section
            id="newsletter"
            className="w-full scroll-mt-30 font-caslon px-4 py-20 flex flex-col items-center text-center"
        >
            <h3 className="font-bold text-4xl">NEWSLETTER</h3>

            {status === "joined" ? (
                <div role="status" className="mt-4">
                    <p className="text-2xl text-[#1397a6]">You&apos;re on the list</p>
                    <p className="mt-2 text-lg">
                        Watch your inbox for news from the studio.
                    </p>
                </div>
            ) : (
                <>
                    <p className="italic text-md mt-1">
                        Get studio news and updates on Project CORE in your inbox.
                    </p>

                    <form
                        onSubmit={handleSignUp}
                        className="relative mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-end"
                    >
                        <div className="text-start sm:w-48">
                            <label className="form-label" htmlFor="newsletter-name">
                                Name
                            </label>
                            <input
                                id="newsletter-name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                className="form-field"
                                placeholder="Your name"
                            />
                        </div>

                        <div className="flex-1 text-start">
                            <label className="form-label" htmlFor="newsletter-email">
                                Email
                            </label>
                            <input
                                id="newsletter-email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="form-field"
                                placeholder="you@email.com"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary shrink-0"
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? "Sending…" : "Join now"}
                        </button>

                        <HoneypotField />
                    </form>

                    {status === "failed" && (
                        <p role="alert" className="mt-4 text-[#EB4335]">
                            That didn&apos;t go through. Check the address and try again.
                        </p>
                    )}

                    <p className="mt-6 text-sm text-white/70">
                        Unsubscribe anytime. See how we handle your data on our{" "}
                        <Link to="/legal" className="link-accent">
                            legal page
                        </Link>
                        .
                    </p>
                </>
            )}
        </section>
    );
}
