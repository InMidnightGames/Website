import studio_key_art from "../../../assets/media/studio_key_art.png"
export default function StudioSection() {
    const highlightText  = "text-[#EB4335]";
    const textColor = "";
    const headerColor = "";

    return (
        <section className="">
            <div className="h-200 w-screen flex flex-col items-center mx-auto ">
                <div className="flex justify-center">
                <img src={studio_key_art} className="inline-flex justify-center mt-20 items-center h-50"/>
                {/*<span className="inline-flex justify-center items-center size-50 border border-2 border-line-100 mt-20 text-foreground">*/}
                {/*    */}
                {/*</span>*/}
                </div>

                <div className="flex flex-col items-center text-center font-caslon ">
                    <h3 className={"mt-0 font-bold italic text-3xl text-center " + headerColor}>OUR STUDIO</h3>
                    <p className={"text-center  max-w-120 mt-1 text-lg " + textColor}>
                        <span className={highlightText}> In Midnight Games</span> is a gameplay-first independent studio founded by combat designer and high-level
                        competitive player <span className={highlightText}>Tanner Liou</span>. Our 16-person team brings experience spanning indie, AAA production,
                        and large-scale online development, supported by seven attached industry advisors. We build games by
                        and for people who love competition: approachable, difficult to master, and with the depth necessary
                        to reward study, execution, and teamwork.

                        <br /><br />

                        We believe numerical balance should support good mechanics, not substitute for them. By intentionally
                        providing multiple avenues of <span className={highlightText}>skill expression</span>, we aim to create matches where victory is never out of reach.
                        Competition also carries more weight when players care about what they are fighting for.

                        <br /><br />

                        We build worlds and characters worth protecting, so every test of skill has something <br/> human at stake.
                    </p>
                </div>
            </div>
        </section>
    );
}

