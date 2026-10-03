import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export interface TiltCardProps {
    children: ReactNode;
    /** Sizing for the card (width / max-width / aspect ratio). */
    className?: string;
    /** Classes for the torn panel the content sits on (background, padding, resting rotation). */
    panelClassName?: string;
    /** Classes for the offset plate behind the panel (colour, offset, rotation). */
    plateClassName?: string;
    /** How far it leans, in degrees. */
    strength?: number;
}

/**
 * A torn paper panel on an offset crimson plate that leans toward the mouse
 * pointer, like a card picked up off the table. Used for the key art and the
 * studio pillars. Touch input and reduced-motion visitors get a still card.
 */
export default function TiltCard({
    children,
    className = "",
    panelClassName = "",
    plateClassName = "translate-x-5 translate-y-5 -rotate-2",
    strength = 9,
}: TiltCardProps) {
    const reduce = useReducedMotion();
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const spring = { stiffness: 150, damping: 18 };
    const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-strength, strength]), spring);
    const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [strength * 0.8, -strength * 0.8]), spring);

    function onMove(event: PointerEvent<HTMLDivElement>) {
        if (reduce || event.pointerType !== "mouse") {
            return;
        }

        const box = event.currentTarget.getBoundingClientRect();
        px.set((event.clientX - box.left) / box.width - 0.5);
        py.set((event.clientY - box.top) / box.height - 0.5);
    }

    function onLeave() {
        px.set(0);
        py.set(0);
    }

    return (
        <div onPointerMove={onMove} onPointerLeave={onLeave} className={`relative [perspective:1000px] ${className}`}>
            <div aria-hidden="true" className={`torn-frame absolute inset-0 bg-ember ${plateClassName}`} />
            <motion.div style={{ rotateX, rotateY }} className={`torn-frame relative size-full will-change-transform ${panelClassName}`}>
                {children}
            </motion.div>
        </div>
    );
}
