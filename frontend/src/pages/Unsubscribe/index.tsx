import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { features } from "../../constants/config.tsx";
import { ContactApiError, contactApiPost } from "../../constants/contactApi.ts";
import HoneypotField from "../../common/components/HoneypotField.tsx";
import useDocumentTitle from "../../common/Hooks/useDocumentTitle.ts";
import { useHoneypot } from "../../common/Hooks/useHoneypot.ts";

type Status = "idle" | "sending" | "sent" | "failed";

export default function UnsubscribePage() {
    const [status, setStatus] = useState<Status>("idle");
    const { getHeaders } = useHoneypot();

    useDocumentTitle("Unsubscribe");

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
        <div className="shell max-w-2xl pt-36 pb-28 text-center md:pt-44">
            {status === "sent" ? (
                <>
                    <h1 className="display text-4xl">Check your inbox</h1>
                    <p className="mt-5 text-lg leading-relaxed text-muted">
                        If that address is on our list, we&apos;ve sent a link to confirm you want off it. Click it and
                        you&apos;re all set.
                    </p>
                    <Link to="/" className="btn btn-primary mt-10">
                        Go to home page
                    </Link>
                </>
            ) : (
                <>
                    <h1 className="display text-4xl">Unsubscribe</h1>
                    <p className="mt-5 text-lg leading-relaxed text-muted">
                        Sorry to see you go. Enter the email you signed up with and we&apos;ll send you a link to confirm.
                    </p>

                    <form onSubmit={handleSubmit} className="relative mx-auto mt-10 flex max-w-md flex-col gap-4 text-start sm:flex-row sm:items-end">
                        <div className="flex-1">
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

                        <button type="submit" className="btn btn-primary shrink-0" disabled={status === "sending"}>
                            {status === "sending" ? "Sending..." : "Unsubscribe"}
                        </button>

                        <HoneypotField />
                    </form>

                    {status === "failed" && (
                        <p role="alert" className="mt-4 text-accent">
                            That didn&apos;t go through. Check the address and try again.
                        </p>
                    )}

                    {features.pages.legal && (
                        <p className="mt-10 text-sm text-faint">
                            Read how we handle your data on our{" "}
                            <Link to="/legal" className="link-accent">
                                legal page
                            </Link>
                            .
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
