import { Link } from "react-router";

function Heading({ children }: { children: React.ReactNode }) {
    return <h2 className="mt-10 font-bold text-2xl text-[#EB4335]">{children}</h2>;
}

export default function LegalPage() {
    return (
        <main className="font-caslon mx-auto w-full max-w-3xl px-4 py-16">
            <h1 className="font-bold text-4xl">LEGAL &amp; DATA DISCLOSURE</h1>
            <p className="italic mt-2 text-white/70">Last updated September 24, 2026</p>

            <div className="mt-8 space-y-4 text-lg leading-relaxed">
                <p>
                    In Midnight Games collects only the information it needs to send
                    its newsletter: your name and email address. We don&apos;t sell
                    your information or share it for advertising.
                </p>

                <Heading>Newsletter</Heading>
                <p>
                    When you sign up on our website, we store your name and email
                    address so we can send you news about our studio and our games. Every newsletter
                    email is sent only to people who are subscribed.
                </p>

                <Heading>Unsubscribing</Heading>
                <p>
                    You can leave the newsletter at any time from our{" "}
                    <Link to="/unsubscribe" className="link-accent">
                        unsubscribe page
                    </Link>
                    . We&apos;ll email you a link to confirm, and once you click it your
                    record is marked as unsubscribed and you won&apos;t receive any
                    further newsletter emails.
                </p>

                <Heading>Deleting your data</Heading>
                <p>
                    Unsubscribing stops the emails but doesn&apos;t erase your record.
                    If you&apos;d like your information removed entirely, reach out
                    to us through one of the channels listed under{" "}
                    <Link to="/#footer" className="link-accent">
                        Contact us
                    </Link>
                    . Copies may remain in our routine backups for a limited time
                    before they are cleared.
                </p>

                <Heading>Service providers</Heading>
                <p>
                    We use trusted third-party services to host our database and to
                    deliver email. They process your information only to provide those
                    services to us.
                </p>

                <Heading>Questions</Heading>
                <p>
                    If you have any questions about how your data is handled, reach out
                    through one of the channels listed under{" "}
                    <Link to="/#footer" className="link-accent">
                        Contact us
                    </Link>
                    .
                </p>
            </div>
        </main>
    );
}
