import {Link} from "react-router";
import {socials, type SocialLinks} from"../../constants/SocialLinks.tsx"

const SocialCard = ()=>{

    return (
        <div className="flex flex-row  pb-5 pt-2  justify-center space-x-5">
            {socials.map((social: SocialLinks,i: number)=>{
                return <a key={i} href={social.url} target="_blank"
                          className="w-10"
                ><img src={social.image} alt={social.name + " Logo"} /></a>
            })}
        </div>
    );
}

export default function Footer() {

    return (
        <footer id="footer" className="footer bg-black text-white flex flex-col justify-center  bottom-0 inset-x-0">
            <h2 className="font-caslon font-bold text-[#EB4335] text-center pt-10 text-2xl">CONTACT US</h2>
            <SocialCard/>
            <nav aria-label="Footer" className="font-caslon flex justify-center gap-6 pb-4 text-sm">
                <Link to="/legal" className="text-[#FBFFF1] hover:text-[#EB4335] transition-all duration-300">Legal</Link>
                <Link to="/unsubscribe" className="text-[#FBFFF1] hover:text-[#EB4335] transition-all duration-300">Unsubscribe</Link>
            </nav>
            <p className="font-caslon font-light text-[#FBFFF1] text-center pb-10 text-sm">@2026 by InMidnightGames</p>
        </footer>
    );
}