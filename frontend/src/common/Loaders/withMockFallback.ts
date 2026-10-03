import { siteConfig } from "../../constants/config.tsx";

/**
 * Runs `load` against the API, unless mock mode is on. In dev, a failed API
 * call (backend not running) falls back to the demo data with a console
 * warning instead of an error screen. In production errors surface normally.
 */
export default async function withMockFallback<T>(load: () => Promise<T>, mock: () => T): Promise<T> {
    if (siteConfig.api.useMock) {
        return mock();
    }

    try {
        return await load();
    } catch (err) {
        if (!siteConfig.api.fallbackToMock) {
            throw err;
        }

        console.warn("[img] API unavailable, using demo data.", err);

        return mock();
    }
}
