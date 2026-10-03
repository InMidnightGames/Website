import type { ElementType, ReactNode } from "react";
import useInView from "../Hooks/useInView.ts";

export interface RevealProps {
    children: ReactNode;
    as?: ElementType;
    /** Stagger siblings, in ms. */
    delay?: number;
    className?: string;
    id?: string;
}

/** Fades + lifts its children in the first time they scroll into view. */
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", id }: RevealProps) {
    const { ref, inView } = useInView<HTMLElement>();

    return (
        <Tag
            ref={ref}
            id={id}
            className={`reveal ${inView ? "is-visible" : ""} ${className}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </Tag>
    );
}
