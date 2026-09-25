/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** Base URL of the EmailService contacts API, without the /contact path. */
    readonly VITE_CONTACT_API_URL?: string;
}
