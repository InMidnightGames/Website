import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { IconContext } from "@phosphor-icons/react";
import "./index.css";
import { siteConfig } from "./constants/config.tsx";
import router from "./routes/Router.tsx";

// Colour theme from config: index.css swaps the palette on <html data-theme>.
document.documentElement.dataset.theme = siteConfig.theme;

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* One icon family, one default weight, sized to the surrounding text. */}
        <IconContext.Provider value={{ size: "1.15em", weight: "bold" }}>
            <RouterProvider router={router} />
        </IconContext.Provider>
    </StrictMode>,
);
