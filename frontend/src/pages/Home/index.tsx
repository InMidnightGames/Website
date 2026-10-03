import { features } from "../../constants/config.tsx";
import useDocumentTitle from "../../common/Hooks/useDocumentTitle.ts";
import HeroSection from "./components/HeroSection.tsx";
import JoinUsSection from "./components/JoinUsSection.tsx";
import NewsletterSection from "./components/NewsletterSection.tsx";
import ProjectSection from "./components/ProjectSection.tsx";
import StudioSection from "./components/StudioSection.tsx";
import TeamSection from "./components/TeamSection.tsx";
import UpdatesSection from "./components/UpdatesSection.tsx";

export default function HomePage() {
    const show = features.sections.home;

    useDocumentTitle();

    return (
        <>
            {show.hero && <HeroSection />}
            {show.newsletter && <NewsletterSection />}
            {show.studio && <StudioSection />}
            {show.joinUs && <JoinUsSection />}
            {show.team && <TeamSection />}
            {show.project && <ProjectSection />}
            {show.updates && <UpdatesSection />}
        </>
    );
}
