/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** Base URL of the EmailService contacts API, without the /contact path. */
    readonly VITE_CONTACT_API_URL?: string;
    /** Base URL of the site backend's public API, e.g. http://localhost:8000/api. */
    readonly VITE_API_URL?: string;
    /** "true" renders the bundled demo content instead of calling the API. */
    readonly VITE_USE_MOCK?: string;
}
