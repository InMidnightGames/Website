import ProfileList from "./ProfileList.tsx";
import useScreenWidth from "../hooks/ScreenWidth.tsx";
import BackgroundImage from "../../../assets/media/team-section-cloud.webp";

export default function TeamSection(){
    let headerColor:string = "text-white";
    let subHeaderColor:string = "";
    const NameColor:string = "text-[#902923]";
    const RoleColor:string = "text-[#1397a6]";
    const width = useScreenWidth();
    const cols =
        width < 640 ? 1 :
            width < 1024 ? 2 :
                3;
    return (
        <section
            id="team"
            className="
        w-full
        scroll-mt-30
        font-caslon
        flex
        flex-col
        justify-center
        items-center
        mt-10
        bg-cover
        bg-top
    "
            style={{
                backgroundImage: `url(${BackgroundImage})`
            }}
        >
            <h3 className={"font-bold text-4xl " + headerColor}>
                OUR TEAM
            </h3>

            <p className={"italic text-md mb-10 " + subHeaderColor}>
                Take a step into the end
            </p>

            <ProfileList
                cols={cols}
                filter={(member) => member.member_type !== "ADVISOR"}
                nameColor={NameColor}
                roleColor={RoleColor}
            />
        </section>
    );
}