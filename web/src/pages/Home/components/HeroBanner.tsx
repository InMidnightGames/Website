import herobanner from "../../../assets/media/herobanner.png"

export default function HeroBanner() {

    return (
        <section
            id="hero"
            className="h-50 sm:bg-fixed xl:h-165 md:h-160 md:bg-cover scroll-mt-16 md:bg-bottom lg:bg-center xl:bg-fixed  flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${herobanner})` }}
        >
            <p className="text-6xl text-center font-caslon font-bold text-[#EB4335] ">Studio Logo!</p>
        </section>
    );
}