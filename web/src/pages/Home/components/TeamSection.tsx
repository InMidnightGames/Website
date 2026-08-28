import ProfileList from "./ProfileList.tsx";

export default function TeamSection(){
    let headerColor:string = "text-[#070B21]";
    let subHeaderColor:string = "";
    const NameColor:string = "text-[#902923]";
    const RoleColor:string = "text-[#3C3744]";

    return (
        <section className="w-screen font-caslon flex flex-col justify-center items-center mt-10">
            <h3 className={"mt-0 font-bold text-4xl  " + headerColor}>OUR TEAM</h3>
            <p className={"mt-0 italic text-md italic mb-10 " + subHeaderColor}>Take a step into the end</p>
            <ProfileList
                cols={3}
                filter={(member) => member.member_type !== "ADVISOR"}
                nameColor={NameColor}
                roleColor={RoleColor}
            />
        </section>
    );
}