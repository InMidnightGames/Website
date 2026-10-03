import type { ReactNode } from "react";

/* Loading / empty / error placeholders shared by every data-driven section. */

export function SkeletonCard({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse ${className}`} aria-hidden="true">
            <div className="aspect-video bg-raised" />
            <div className="mt-5 h-3 w-1/4 bg-raised" />
            <div className="mt-3 h-6 w-3/4 bg-raised" />
        </div>
    );
}

export function SkeletonGrid({ count = 3, className = "" }: { count?: number; className?: string }) {
    return (
        <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${className}`} aria-busy="true" aria-label="Loading">
            {Array.from({ length: count }, (_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
    return (
        <div className="border border-dashed border-line-strong px-6 py-12 text-center">
            <p className="display text-base text-ink">{title}</p>
            {children && <div className="mx-auto mt-3 max-w-md text-muted">{children}</div>}
        </div>
    );
}

export function ErrorState({ message = "This couldn't load right now. Please try again later." }: { message?: string }) {
    return (
        <p role="alert" className="border border-dashed border-line-strong px-6 py-12 text-center text-muted">
            {message}
        </p>
    );
}
