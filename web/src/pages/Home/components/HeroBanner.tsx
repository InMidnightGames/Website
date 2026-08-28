import herobanner from "../../../assets/media/herobanner.png"

export default function HeroBanner() {

    return (
        <section
            id="hero"
            className="h-165 md:h-150 bg-cover scroll-mt-16 bg-center bg-fixed flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${herobanner})` }}
        >
            <p className="text-6xl text-center font-caslon font-bold text-[#EB4335]">Studio Logo</p>
        </section>
    );
}