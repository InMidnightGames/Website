import studio_key_art from "../../../assets/media/studio_key_art.webp"
import TeamData from "../../../constants/TeamData.ts";
import StudioBackground from "../../../assets/media/img_bg_studio.webp"
import StudioContentBorderLeft from "../../../assets/media/studio_content_left.png"
import StudioContentBorderRight from "../../../assets/media/studio_content_right.png"
import {useEffect, useRef, useState} from "react";

export default function StudioSection() {
    const highlightText  = "text-[#1397a6]";
    const textColor = "";
    const headerColor = "";
    const memberCount = TeamData.map((member)=>member.status === "ACTIVE" && member.member_type !+ "ADVISOR").length;


    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);



    return (
        <section
            ref={sectionRef}
            className={`bg-cover bg-top transition-opacity duration-500 ${
                visible ? "opacity-100" : "opacity-0"
            }`}
            style={{
                backgroundImage: `url(${StudioBackground})`
            }}
        >
            <div className="   w-full flex flex-col items-center mx-auto pb-10 lg:pb-25">

                {/* Key Art */}
                <div className="flex justify-center w-full ">
                    <img
                        src={studio_key_art}
                        alt="Sketch of Character Lineup"
                        className="
                    mt-40
                    md:mt-50
                    lg:mt-60
                    w-[70%]
                    max-w-[700px]
                    h-auto
                "
                    />
                </div>

                {/* Content */}
                <div className="w-full max-w-5xl flex items-stretch  justify-center px-4 md:px-8">

                    {/* Left Border */}
                    <div
                        className="
                            hidden sm:block
                            w-10 md:w-16 lg:w-30
                            mr-3 md:mr-6
                            bg-no-repeat
                            bg-top
                            bg-contain
                            lg:mt-10
                        "
                        style={{
                            backgroundImage: `url(${StudioContentBorderLeft})`
                        }}
                    />

                    {/* Content */}
                    <div className="flex flex-col items-center text-center font-caslon w-full ">

                        <h3
                            className={
                                "mt-6 md:mt-8 lg:mt-4 font-bold text-3xl md:text-4xl xl:text-5xl text-center " +
                                headerColor
                            }
                        >
                            OUR STUDIO
                        </h3>

                        <p
                            className={
                                "w-full max-w-2xl mt-5 md:mt-5 text-base md:text-lg xl:text-xl text-justify " +
                                textColor
                            }
                        >
                            <span className={highlightText}>In Midnight Games</span> is a
                            gameplay-first independent studio founded by combat designer and
                            high-level competitive player <span className={highlightText}>Tanner Liou</span>.
                            Our {memberCount}-person team brings experience spanning indie, AAA production,
                            and large-scale online development, supported by seven attached industry advisors.
                            We build games by and for people who love competition: approachable, difficult to
                            master, and with the depth necessary to reward study, execution, and teamwork.

                            <br /><br />

                            We believe numerical balance should support good mechanics, not substitute for them.
                            By intentionally providing multiple avenues of
                            <span className={highlightText}> skill expression</span>, we aim to create matches
                            where victory is never out of reach.

                            <br /><br />

                            Competition also carries more weight when players care about what they are fighting for.
                            We build worlds and characters worth protecting, so every test of skill has something
                            human at stake.
                        </p>
                    </div>

                    {/* Right Border */}
                    <div
                        className="
                           hidden sm:block
                            w-10 md:w-16 lg:w-30
                            ml-3 md:ml-6
                            bg-no-repeat
                            bg-top
                            bg-contain
                            lg:mt-5
                        "
                        style={{
                            backgroundImage: `url(${StudioContentBorderRight})`
                        }}
                    />

                </div>
            </div>
        </section>
    );
}

