import herobanner from "../../../assets/media/herobanner.png"
import herobanner680 from "../../../assets/media/herobanner-680.png"
import Logo from "../../../assets/media/img_logo.png"
import useScreenWidth from "../hooks/ScreenWidth.tsx";

export default function HeroBanner() {
    const screenSize = useScreenWidth();

    return (
        <section
            id="hero"
            className="relative h-50 xl:h-screen md:portrait:h-100  md:h-160 bg-cover scroll-mt-16 md:bg-bottom lg:bg-center xl:bg-fixed"
            style={{
                backgroundImage: `url(${screenSize > 768 ? herobanner : herobanner680})`
            }}
        >
            <img
                src={Logo}
                alt="Studio Logo"
                className="absolute left-1/2 bottom-0 size-50 md:size-125 -translate-x-1/2 translate-y-1/2 md:translate-y-65 z-10"
            />
        </section>
    );
}