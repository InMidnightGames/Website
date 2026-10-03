import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { contactApiPost } from "../../constants/contactApi.ts";
import useDocumentTitle from "../../common/Hooks/useDocumentTitle.ts";

type Status = "confirming" | "confirmed" | "failed";

/** Landing page for the link in the unsubscribe confirmation email. */
export default function UnsubscribeConfirmPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<Status>(token ? "confirming" : "failed");
    // StrictMode runs effects twice in dev; only spend the token once.
    const ran = useRef(false);

    useDocumentTitle("Unsubscribe");

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
        <div className="shell max-w-2xl pt-36 pb-28 text-center md:pt-44">
            {status === "confirming" && (
                <div role="status">
                    <h1 className="display text-4xl">Confirming...</h1>
                    <p className="mt-5 text-lg text-muted">Hang tight while we take you off the list.</p>
                </div>
            )}

            {status === "confirmed" && (
                <>
                    <h1 className="display text-4xl">You&apos;re unsubscribed</h1>
                    <p className="mt-5 text-lg leading-relaxed text-muted">
                        You won&apos;t receive our newsletter anymore. Thanks for following along, and all the best!
                    </p>
                </>
            )}

            {status === "failed" && (
                <>
                    <h1 className="display text-4xl">That link didn&apos;t work</h1>
                    <p className="mt-5 text-lg leading-relaxed text-muted">
                        It may have expired or already been used. Head back and request a fresh unsubscribe link.
                    </p>
                </>
            )}

            <div className="mt-10 flex flex-wrap justify-center gap-3">
                {status === "failed" && (
                    <Link to="/unsubscribe" className="btn btn-primary">
                        Try again
                    </Link>
                )}
                <Link to="/" className={status === "failed" ? "btn btn-secondary" : "btn btn-primary"}>
                    Go to home page
                </Link>
            </div>
        </div>
    );
}
