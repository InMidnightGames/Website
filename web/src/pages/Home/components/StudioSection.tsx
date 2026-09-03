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
        <section ref={sectionRef} className={` bg-cover bg-top transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
        }`} style={{
            backgroundImage: `url(${StudioBackground})`
        }}>

            {/*<div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />*/}
            <div className="h-215  md:h-310 w-screen flex flex-col items-center mx-auto ">
                <div className="flex justify-center md:mt-50">
                <img src={studio_key_art} alt="Sketch of Character Lineup" className="inline-flex justify-center mt-20
                 items-center h-50 md:h-100"/>

                </div>
                {/*<img src={StudioContentBorder} className="inline-flex justify-center mt-20"/>*/}
                <div className="flex justify-center ">
                    {/*Left Border*/}
                    <img src={StudioContentBorderLeft}
                        className="hidden min-[480px]:block w-30 h-100 md:mt-20 lg:mt-10 mr-5" alt="content border left"
                    />


                    {/*Content*/}
                    <div className="flex flex-col items-center text-center font-caslon ">
                        <h3 className={"sm:mt-0 md:mt-15 lg:mt-5 font-bold  md:text-4xl text-3xl text-center " + headerColor}>OUR STUDIO</h3>
                        <p className={"max-w-120 mt-1 md:mt-5 text-lg xl:text-xl text-justify" + textColor}>
                            <span className={highlightText}> In Midnight Games</span> is a gameplay-first independent studio founded by combat designer and high-level
                            competitive player <span className={highlightText}>Tanner Liou</span>. Our {memberCount}-person team brings experience spanning indie, AAA production,
                            and large-scale online development, supported by seven attached industry advisors. We build games by
                            and for people who love competition: approachable, difficult to master, and with the depth necessary
                            to reward study, execution, and teamwork.

                            <br /><br />

                            We believe numerical balance should support good mechanics, not substitute for them. By intentionally
                            providing multiple avenues of <span className={highlightText}>skill expression</span>, we aim to create matches where victory is never out of reach.

                            <br /><br />

                            Competition also carries more weight when players care about what they are fighting for.
                            We build worlds and characters worth protecting, so every test of skill has something human at stake.
                        </p>
                    </div>
                    {/*Right Border*/}
                    <img src={StudioContentBorderRight}
                         className="hidden min-[480px]:block w-30 h-100 md:mt-20 lg:mt-10 ml-5"
                         alt="content border right"
                    />



                </div>
            </div>
        </section>
    );
}

