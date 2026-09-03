import type {TeamMember} from "../../../constants/TeamData.ts";
import TeamData from "../../../constants/TeamData.ts";
import ProfileCard from "./ProfileCard.tsx";
interface ProfileListProps {
    cols: number,
    filter: (member:TeamMember) => boolean,
    nameColor: string,
    roleColor: string,
}

export default function ProfileList({
                                        cols,
                                        filter,
                                        nameColor,
                                        roleColor
                                    }: ProfileListProps) {
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
            className={`
                grid
                ${colStyle}
                w-full
                max-w-5xl
                gap-x-8
                gap-y-10
                px-4
                mb-25
            `}
        >
            {filteredContent.map((member, index) => {
                const isLastRow =
                    remainder > 0 &&
                    index >= filteredContent.length - remainder;

                let position = "";

                if (isLastRow && remainder === 1 && cols > 1) {
                    position = "col-start-2";
                }

                return (
                    <div
                        key={member.name}
                        className={position}
                    >
                        <ProfileCard
                            member={member}
                            nameColor={nameColor}
                            roleColor={roleColor}
                        />
                    </div>
                );
            })}
        </div>
    );
}