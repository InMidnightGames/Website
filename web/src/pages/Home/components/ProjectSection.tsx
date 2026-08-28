export default function ProjectSection() {
    const highlightText = "text-[#EB4335]";
    const textColor = "";
    const headerColor = "";

    return (
        <section className=" font-caslon">
            <div className="h-120 w-screen grid grid-cols-2  items-center max-w-300 mx-auto px-5">
                <div className="flex justify-center">
                    <span className="inline-flex justify-center items-center size-100 border border-line-100 text-foreground">
                        {/* SVG */}
                    </span>
                </div>

                <div className="flex flex-col ">
                    <h3 className={"mt-0 font-bold italic text-3xl  " + headerColor}>OUR PROJECT</h3>
                    <p className={"  max-w-85 mt-1 text-md " + textColor}>


                        <span className={highlightText}>Project CORE </span> is a third-person
                        <span className={highlightText}> 5v5 MOBA</span> and the first
                        playable part of a new Dark Fantasy IP.
                        In place of conventional creep waves and turret lanes, teams fight to capture territory and
                        claim a path toward the enemy base. Players take command of legendary
                        <span className={highlightText}> champions </span> drawn from
                        <span className={highlightText}> worlds
                        colliding</span>, while contestable events emerge across the battlefield.

                        <br/><br/>

                        Currently in production for  <span className={highlightText}> PC </span>entirely within
                        Unreal Engine,  <span className={highlightText}>CORE</span> is designed around decisive
                        skill expression and one central conviction: no battle is over while players still possess the
                        will to turn it.

                        <br/><br/>

                        <span className={highlightText}>CORE</span> introduces the characters, setting, and combat
                        foundation of a larger connected experience
                    </p>
                </div>
            </div>
        </section>
    );
}

