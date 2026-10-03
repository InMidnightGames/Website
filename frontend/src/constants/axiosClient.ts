import axios from "axios";
import { siteConfig } from "./config.tsx";

/** The site backend's public API (dev blog). */
export const api = axios.create({
    baseURL: siteConfig.api.baseUrl,
    timeout: 10000,
});
