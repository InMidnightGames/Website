import HeroBanner from "./components/HeroBanner.tsx";
import StudioSection from "./components/StudioSection.tsx";
import ProjectSection from "./components/ProjectSection.tsx";
import TeamSection from "./components/TeamSection.tsx";


export default function Home() {
    return (
        <main className="scroll-smooth ">
            <HeroBanner/>
            <StudioSection/>
            <ProjectSection/>
            <TeamSection />
        </main>
    );
};