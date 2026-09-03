import HeroBanner from "./components/HeroBanner.tsx";
import StudioSection from "./components/StudioSection.tsx";
import ProjectSection from "./components/ProjectSection.tsx";
import TeamSection from "./components/TeamSection.tsx";
import ProjectBorder from "../../assets/media/project-bottom-border.png";


export default function Home() {
    return (
        <main className="scroll-smooth bg-black text-white ">
            <HeroBanner/>
            <StudioSection/>
            <ProjectSection/>
            <img src={ProjectBorder}
                 className=" w-4/5 xl:w-3/5 mx-auto" alt="seperation between Project section and team section"
            />
            <TeamSection />
        </main>
    );
};