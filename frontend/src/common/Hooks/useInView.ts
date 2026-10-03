import { useEffect, useRef, useState } from "react";

/** True while the element is on screen. `once` keeps it true after the first sighting. */
export default function useInView<T extends Element>(rootMargin: string = "0px 0px -10% 0px", once: boolean = true) {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element || (once && inView)) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);

                if (once && entry.isIntersecting) {
                    observer.disconnect();
                }
            },
            { rootMargin },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [inView, once, rootMargin]);

    return { ref, inView };
}
