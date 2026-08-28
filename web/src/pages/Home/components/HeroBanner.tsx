import herobanner from "../../../assets/media/herobanner.png"

export default function HeroBanner() {

    return (
        <section
            className=" h-150 bg-cover bg-center bg-fixed flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${herobanner})` }}
        >
            <p className="text-4xl text-center font-caslon font-bold text-[#EB4335]">Studio Logo</p>
        </section>
    );
}