export default function ProjectSection() {
    const highlightText = "text-[#1397a6]";
    const textColor = "";
    const headerColor = "";

    return (
        <section className=" font-caslon  lg:mb-20 md:mb-5  lg:mb-0  ">
            {/* Fade overlay */}
            {/*<div className="absolute inset-0 bg-gradient-to-b from-[#10021e] via-transparent to-black" />*/}
            <div className="h-150 md:h-180 lg:h-150 portrait:h-200  w-screen flex flex-col md:portrait:grid md:portrait:grid-cols-2
            landscape:grid landscape:grid-cols-2
              lg:landscape:grid lg:landscape:grid-cols-2  items-center max-w-300 mx-auto px-5">
                <div className="flex justify-center mt-20 ">
                    <span className="inline-flex justify-center items-center size-50 landscape:size-80 md:size-80 lg:size-100 border border-line-100 text-foreground">
                        {/* SVG */}
                    </span>
                </div>

                <div className="flex flex-col w-85  ">
                    <h3 className={" mt-0 md:mt-15 xl:mt-20 lg:mt-20 font-bold md:text-4xl text-3xl md:portrait:text-4xl text-center md:portrait:text-start landscape:text-center lg:text-center" + headerColor}>OUR PROJECT</h3>
                    <p className={"   mt-5 lg:landscape:text-justify lg:mt-5 text-lg xl:text-xl landscape:text-md md:text-md  md:text-start landscape:text-start" + textColor}>


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

