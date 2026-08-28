import type {TeamMember} from "../../../constants/TeamData.ts";
import TeamData from "../../../constants/TeamData.ts";
import ProfileCard from "./ProfileCard.tsx";
interface ProfileListProps {
    cols: number,
    filter: (member:TeamMember) => boolean,
    nameColor: string,
    roleColor: string,
}

export default function ProfileList({ cols, filter, nameColor, roleColor }: ProfileListProps) {
    const filteredContent = TeamData.filter(filter);

    const colStyles: Record<number, string> = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
    };

    const colStyle = colStyles[cols] ?? "grid-cols-1";

    const remainder = filteredContent.length % cols;

    return (
        <div
            className={`grid  ${colStyle} gap-5 w-50 md:w-200 min-h-screen flex justify-center items-center`}
        >
            {filteredContent.map((member, index) => {
                const isLastRow = index >= filteredContent.length - remainder;

                let position = "";

                if (isLastRow && remainder > 0) {
                    if (remainder === 1) {
                        // Center the single remaining item
                        position = "col-start-2";
                    }
                }

                return (
                    <div key={member.name} className={position}>
                        <ProfileCard member={member} nameColor={nameColor} roleColor={roleColor} />
                    </div>
                );
            })}
        </div>
    );
}