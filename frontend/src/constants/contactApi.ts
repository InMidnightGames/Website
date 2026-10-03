import { siteConfig } from "./config.tsx";

export class ContactApiError extends Error {
    status: number;

    constructor(status: number) {
        super(`Contact API responded with ${status}`);
        this.status = status;
    }
}

interface PostOptions {
    body?: unknown;
    params?: Record<string, string>;
    headers?: Record<string, string>;
}

/** POST to the EmailService contacts API, e.g. contactApiPost("/unsubscribe", ...). */
export async function contactApiPost(path: string, { body, params, headers }: PostOptions = {}) {
    const query = params ? `?${new URLSearchParams(params)}` : "";

    const response = await fetch(`${siteConfig.contactApiUrl}/contact${path}${query}`, {
        method: "POST",
        headers: {
            ...(body === undefined ? {} : { "Content-Type": "application/json" }),
            ...headers,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
        throw new ContactApiError(response.status);
    }
}
