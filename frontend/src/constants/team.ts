/* The team shown on the home page, in display order. Portraits live in
   public/media/team (square, 400px). Set `status: "HIDDEN"` to take someone
   off the site without deleting them. */

type MemberType = "LEAD" | "MEMBER" | "ADVISOR";

type Department = "DESIGNER" | "TECH" | "OPERATIONS" | "ART" | "AUDIO" | "NARRATIVE" | "MARKETING";

type Status = "ACTIVE" | "INACTIVE" | "HIDDEN";

export type TeamMember = {
    name: string;
    title: string;
    highlight: string;
    member_type: MemberType;
    department: Department;
    status: Status;
    /** Square crop, for the picker grid. */
    pic: string;
    /** Full round portrait, for the selected-member frame. */
    portrait: string;
};

const pic = (name: string) => `/media/team/${name}.webp`;
const portrait = (name: string) => `/media/team/round/${name}.webp`;

const TeamData: TeamMember[] = [
    {
        name: "Tanner Liou",
        title: "Founder, Chief Creative Officer",
        highlight:
            "World-class, multi-genre, multi-rank 1 competitive player, esports coach, partnered content creator, AAA consultant, and lead combat designer.",
        member_type: "LEAD",
        department: "DESIGNER",
        status: "ACTIVE",
        pic: pic("tanner"),
        portrait: portrait("tanner"),
    },
    {
        name: "Excell Pepple",
        title: "Chief Technology Officer",
        highlight:
            "Software engineer and technical game designer specialized in server architecture and cloud infrastructure at Amazon Web Services & Amazon Games for New World: Aeternum.",
        member_type: "LEAD",
        department: "TECH",
        status: "ACTIVE",
        pic: pic("excell"),
        portrait: portrait("excell"),
    },
    {
        name: "Ayla Derrick",
        title: "Chief Operating Officer",
        highlight: "Founder and creative director at Cave Bear Games and Cave Bear Collective.",
        member_type: "LEAD",
        department: "OPERATIONS",
        status: "ACTIVE",
        pic: pic("ayla"),
        portrait: portrait("ayla"),
    },
    {
        name: "Sofia Ayad",
        title: "Marketing Director",
        highlight:
            "Marketing, communications, and events director at Insomniac Events, Something in Action, Connect, and Cave Bear Games.",
        member_type: "LEAD",
        department: "MARKETING",
        status: "ACTIVE",
        pic: pic("sofia"),
        portrait: portrait("sofia"),
    },
    {
        name: "Tradd Thompson",
        title: "Combat Designer",
        highlight: "Lead combat designer at Intrepid Studios, Cryptic Studios, and Singularity Studios.",
        member_type: "MEMBER",
        department: "DESIGNER",
        status: "ACTIVE",
        pic: pic("tradd"),
        portrait: portrait("tradd"),
    },
    {
        name: "Nix Du",
        title: "Level Designer",
        highlight: "Game designer at Amazon Games on New World, The Lord of the Rings MMO, Dreamlit Games, and Tencent.",
        member_type: "MEMBER",
        department: "DESIGNER",
        status: "ACTIVE",
        pic: pic("nix"),
        portrait: portrait("nix"),
    },
    {
        name: "Clayton Stamper",
        title: "Senior Gameplay Engineer",
        highlight: "Gameplay engineer at Intrepid Studios and Enduring Games.",
        member_type: "MEMBER",
        department: "TECH",
        status: "ACTIVE",
        pic: pic("clayton"),
        portrait: portrait("clayton"),
    },
    {
        name: "Gillian Ehman",
        title: "UI Engineer",
        highlight: "Software engineer for Studio Monsoon and Beamdog.",
        member_type: "MEMBER",
        department: "TECH",
        status: "ACTIVE",
        pic: pic("gillian"),
        portrait: portrait("gillian"),
    },
    {
        name: "Kyle Tubman",
        title: "Server Engineer",
        highlight: "Senior software engineer at Mount Sinai and WestonDEV.",
        member_type: "MEMBER",
        department: "TECH",
        status: "ACTIVE",
        pic: pic("kyle"),
        portrait: portrait("kyle"),
    },
    {
        name: "Arnav Malhotra",
        title: "Junior Systems Engineer",
        highlight: "Software engineer at Ubisoft, LandShark, Spiral Mind, Jalan Journey, and Microtube Technologies.",
        member_type: "MEMBER",
        department: "TECH",
        status: "ACTIVE",
        pic: pic("arnav"),
        portrait: portrait("arnav"),
    },
    {
        name: "Aidan Bell",
        title: "2D Artist",
        highlight: "2D concept artist at Cave Bear Games.",
        member_type: "MEMBER",
        department: "ART",
        status: "ACTIVE",
        pic: pic("aidan"),
        portrait: portrait("aidan"),
    },
    {
        name: "Josh Tyer",
        title: "3D Environment Artist",
        highlight: "3D environment artist at Cave Bear Games.",
        member_type: "MEMBER",
        department: "ART",
        status: "ACTIVE",
        pic: pic("josh"),
        portrait: portrait("josh"),
    },
    {
        name: "Alexis Huang",
        title: "3D Modeler",
        highlight:
            "3D character artist and modeler at Integem, neuro42, ishugo, Titan Flag Studios, and Goyangi Games.",
        member_type: "MEMBER",
        department: "ART",
        status: "ACTIVE",
        pic: pic("alexis"),
        portrait: portrait("alexis"),
    },
    {
        name: "Vlad Medovnikov",
        title: "Lead Animator",
        highlight: "Lead animator at Saber Interactive, Sperasoft, Wargaming, Mundfish, Tinybuild, and Agora Studio.",
        member_type: "LEAD",
        department: "ART",
        status: "ACTIVE",
        pic: pic("vlad"),
        portrait: portrait("vlad"),
    },
    {
        name: "Aaron Gao",
        title: "Audio Director",
        highlight:
            "Music composer at Tencent, NewStyle Media Group, Mayhem Mirror, 24H Studios, Youku, and pursuing M.M. in Film Scoring at USC.",
        member_type: "LEAD",
        department: "AUDIO",
        status: "ACTIVE",
        pic: pic("aaron"),
        portrait: portrait("aaron"),
    },
    {
        name: "Ori Zur",
        title: "Composer",
        highlight:
            "Award-winning composer, software engineer, and multi-instrumentalist at Tencent, NetEase, and Microids.",
        member_type: "MEMBER",
        department: "AUDIO",
        status: "ACTIVE",
        pic: pic("ori"),
        portrait: portrait("ori"),
    },
    {
        name: "Hamin Jung",
        title: "Sound Designer",
        highlight: "Sound designer and audio engineer for Miracle Sound Design & Music and Republic of Korea Air Force.",
        member_type: "MEMBER",
        department: "AUDIO",
        status: "ACTIVE",
        pic: pic("hamin"),
        portrait: portrait("hamin"),
    },
    {
        name: "Alexandre Vallesi",
        title: "Narrative Designer",
        highlight: "Writer, narrative designer, and program coordinator at Cave Bear Games and Game Design Skills.",
        member_type: "MEMBER",
        department: "NARRATIVE",
        status: "ACTIVE",
        pic: pic("vall"),
        portrait: portrait("vall"),
    },
];

/** Everyone shown in the team section: active, not an advisor. */
export const visibleTeam = TeamData.filter((m) => m.status === "ACTIVE" && m.member_type !== "ADVISOR");

export default TeamData;
