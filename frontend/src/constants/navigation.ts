import { features } from "./config.tsx";

export type NavItem = {
    label: string;
    to: string;
    /** Links into a home-page section (hash link) rather than a page. */
    section?: boolean;
};

const home = features.sections.home;
const pages = features.pages;

/** Main navigation, in order. Items whose page or section is switched off drop out. */
export const navItems: NavItem[] = (
    [
        [{ label: "Studio", to: "/#studio", section: true }, home.studio],
        [{ label: "Project", to: "/#project", section: true }, home.project],
        [{ label: "Team", to: "/#team", section: true }, home.team],
        [{ label: "Careers", to: "/careers" }, pages.careers],
        [{ label: "Dev Blog", to: "/devblog" }, pages.devblog],
        [{ label: "Newsletter", to: "/#newsletter", section: true }, home.newsletter],
    ] as [NavItem, boolean][]
)
    .filter(([, enabled]) => enabled)
    .map(([item]) => item);

/** Small print links in the footer. */
export const legalItems: NavItem[] = (
    [
        [{ label: "Legal", to: "/legal" }, pages.legal],
        [{ label: "Unsubscribe", to: "/unsubscribe" }, pages.unsubscribe],
    ] as [NavItem, boolean][]
)
    .filter(([, enabled]) => enabled)
    .map(([item]) => item);
