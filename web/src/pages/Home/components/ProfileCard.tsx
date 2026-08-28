import type {TeamMember} from "../../../constants/TeamData.ts";

interface ProfileCardProps {
    member: TeamMember,
    nameColor: string,
    roleColor: string,
}
export default function ProfileCard({ member, nameColor, roleColor }: ProfileCardProps) {

    return (
        <div className="group rounded-lg p-4 text-center justify-center content-center flex flex-col items-center mb-5">
            <img src={member.pic} alt={"Picture of " + member.name}  className="size-40"/>
            <h3 className={nameColor+ " font-bold text-2xl"}>{member.name}</h3>
            <h6 className={roleColor + " font-light italic text-sm lg:text-md"}>{member.title}</h6>
            <p className={"text-md md:text-md mt-2"}>{member.highlight}</p>
        </div>
    );
}