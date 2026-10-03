const fullDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** "2026-08-31T00:00:00Z" -> "August 31, 2026" */
export function formatDate(date: string | null): string {
    return date ? fullDate.format(new Date(date)) : "";
}

/** "2026-08-31T00:00:00Z" -> "Aug 31, 2026" */
export function formatShortDate(date: string | null): string {
    return date ? shortDate.format(new Date(date)) : "";
}

/** 7 -> "07", for counters like "07 / 18". */
export function pad2(n: number): string {
    return String(n).padStart(2, "0");
}
