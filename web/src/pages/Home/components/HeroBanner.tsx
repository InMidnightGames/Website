import herobanner from "../../../assets/media/herobanner.png"
import herobanner680 from "../../../assets/media/herobanner-680.png"
import Logo from "../../../assets/media/img_logo.png"
import useScreenWidth from "../hooks/ScreenWidth.tsx";

export default function HeroBanner() {
    const screenSize = useScreenWidth();

    return (
        <section
            id="hero"
            className="h-50  xl:h-165 md:h-160 md:bg-cover scroll-mt-16 md:bg-bottom lg:bg-center xl:bg-fixed  flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${screenSize > 680? herobanner: herobanner680})` }}
        >
            {/*<p className="text-6xl text-center font-caslon font-bold text-[#EB4335] ">Studio Logo!</p>*/}
            <img src={Logo} alt="Studio Logo" className=" size-50 md:size-100"/>
        </section>
    );
}