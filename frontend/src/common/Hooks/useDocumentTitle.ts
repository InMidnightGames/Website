import { useEffect } from "react";
import { siteConfig } from "../../constants/config.tsx";

/** Sets the tab title as "<title> | In Midnight Games", or the studio line on home. */
export default function useDocumentTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | Indie Game Studio`;
    }, [title]);
}
