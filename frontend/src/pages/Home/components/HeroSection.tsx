import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { pagesConfig, siteConfig } from "../../../constants/config.tsx";
import ExternalLink from "../../../common/components/ExternalLink.tsx";

/**
 * Full-bleed castle art, torn along the bottom. The logo and mission sit on
 * the left, the calls to action in a row on the right. As the page scrolls
 * the art sinks slower than the page (parallax) and the logo drifts up and
 * fades, so leaving the hero feels like walking away from the castle.
 */
export default function HeroSection() {
    const { hero } = pagesConfig.home;
    const { community, support } = siteConfig.cta;
    const ref = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const artY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
    const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

    return (
        <section
            ref={ref}
            id="hero"
            className="torn-bottom relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-night text-moon"
        >
            <motion.picture style={{ y: artY }} className="absolute inset-0 -z-20 block">
                <source media="(max-width: 767px)" srcSet={hero.imageSmall} />
                <img
                    src={hero.image}
                    alt={hero.alt}
                    fetchPriority="high"
                    className="size-full animate-fade-in object-cover object-[62%_50%] lg:object-[0%_50%]"
                />
            </motion.picture>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/90 via-night/40 to-transparent" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/75 via-transparent to-night/30" />

            <div className="shell flex flex-1 flex-col pt-24 pb-32 lg:pb-20">
                <motion.div
                    style={{ y: copyY, opacity: copyOpacity }}
                    className="my-auto flex max-w-md flex-col items-center text-center lg:max-w-[28.75rem]"
                >
                    <h1 className="sr-only">{siteConfig.name}</h1>
                    <img
                        src={siteConfig.logo}
                        alt=""
                        width={900}
                        height={900}
                        className="-my-[7%] w-[min(23.75rem,74vw)] animate-fade-up drop-shadow-[0_10px_30px_rgb(0_0_0/0.55)]"
                    />
                    <p className="mt-3 animate-fade-up text-xl leading-snug text-moon/90 [animation-delay:150ms] md:text-2xl">
                        {hero.mission}
                    </p>
                </motion.div>

                <div className="mt-10 flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:350ms] lg:mt-0 lg:justify-end">
                    <ExternalLink href={community.url} className="btn btn-primary">
                        {community.icon}
                        {community.label}
                    </ExternalLink>
                    {support && (
                        <ExternalLink href={support.url} className="btn btn-moon">
                            {support.icon}
                            {support.label}
                        </ExternalLink>
                    )}
                </div>
            </div>
        </section>
    );
}
