import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ContactApiError, contactApiPost } from "../../constants/contactApi.ts";
import HoneypotField from "../../Common/Components/HoneypotField.tsx";
import { useHoneypot } from "../../Common/Hooks/useHoneypot.ts";

type Status = "idle" | "sending" | "sent" | "failed";

export default function UnsubscribePage() {
    const [status, setStatus] = useState<Status>("idle");
    const { getHeaders } = useHoneypot();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setStatus("sending");

        try {
            await contactApiPost("/unsubscribe", {
                body: { email: formData.get("email") },
                headers: getHeaders(formData),
            });
            setStatus("sent");
        } catch (error) {
            console.error(error);
            // A missing contact also 404s here; show the same message either
            // way so the page can't be used to check which emails are on the list.
            setStatus(error instanceof ContactApiError && error.status === 404 ? "sent" : "failed");
        }
    }

    return (
        <main className="font-caslon mx-auto w-full max-w-2xl px-4 py-20 text-center">
            {status === "sent" ? (
                <>
                    <h1 className="font-bold text-4xl">CHECK YOUR INBOX</h1>
                    <p className="mt-4 text-lg leading-relaxed">
                        If that address is on our list, we&apos;ve sent a link to confirm
                        you want off it. Click it and you&apos;re all set.
                    </p>
                    <Link to="/" className="btn-primary mt-8">
                        Go to home page
                    </Link>
                </>
            ) : (
                <>
                    <h1 className="font-bold text-4xl">UNSUBSCRIBE</h1>
                    <p className="italic mt-2">Sorry to see you go.</p>
                    <p className="mt-4 text-lg leading-relaxed">
                        Enter the email you signed up with and we&apos;ll send you a link
                        to confirm.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-end"
                    >
                        <div className="flex-1 text-start">
                            <label className="form-label" htmlFor="unsub-email">
                                Email
                            </label>
                            <input
                                id="unsub-email"
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
                            {status === "sending" ? "Sending…" : "Unsubscribe"}
                        </button>

                        <HoneypotField />
                    </form>

                    {status === "failed" && (
                        <p role="alert" className="mt-4 text-[#EB4335]">
                            That didn&apos;t go through. Check the address and try again.
                        </p>
                    )}

                    <p className="mt-10 text-sm text-white/70">
                        Read how we handle your data on our{" "}
                        <Link to="/legal" className="link-accent">
                            legal page
                        </Link>
                        .
                    </p>
                </>
            )}
        </main>
    );
}
