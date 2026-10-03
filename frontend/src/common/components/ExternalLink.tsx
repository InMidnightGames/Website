import type { AnchorHTMLAttributes } from "react";

/** <a> that opens off-site links in a new tab safely. */
export default function ExternalLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </a>
    );
}
