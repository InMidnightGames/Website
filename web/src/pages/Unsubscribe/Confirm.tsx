import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { contactApiPost } from "../../constants/contactApi.ts";

type Status = "confirming" | "confirmed" | "failed";

/** Landing page for the link in the unsubscribe confirmation email. */
export default function UnsubscribeConfirmPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<Status>(token ? "confirming" : "failed");
    // StrictMode runs effects twice in dev; only spend the token once.
    const ran = useRef(false);

    useEffect(() => {
        if (!token || ran.current) return;
        ran.current = true;

        contactApiPost("/unsubscribe/confirm", { params: { token } })
            .then(() => setStatus("confirmed"))
            .catch((error) => {
                console.error(error);
                setStatus("failed");
            });
    }, [token]);

    return (
        <main className="font-caslon mx-auto w-full max-w-2xl px-4 py-20 text-center">
            {status === "confirming" && (
                <div role="status">
                    <h1 className="font-bold text-4xl">CONFIRMING…</h1>
                    <p className="mt-4 text-lg">Hang tight while we take you off the list.</p>
                </div>
            )}

            {status === "confirmed" && (
                <>
                    <h1 className="font-bold text-4xl">YOU&apos;RE UNSUBSCRIBED</h1>
                    <p className="mt-4 text-lg leading-relaxed">
                        You won&apos;t receive our newsletter anymore. Thanks for
                        following along, and all the best!
                    </p>
                </>
            )}

            {status === "failed" && (
                <>
                    <h1 className="font-bold text-4xl">THAT LINK DIDN&apos;T WORK</h1>
                    <p className="mt-4 text-lg leading-relaxed">
                        It may have expired or already been used. Head back and request a
                        fresh unsubscribe link.
                    </p>
                </>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                {status === "failed" && (
                    <Link to="/unsubscribe" className="btn-primary">
                        Try again
                    </Link>
                )}
                <Link to="/" className={status === "failed" ? "btn-ghost" : "btn-primary"}>
                    Go to home page
                </Link>
            </div>
        </main>
    );
}
