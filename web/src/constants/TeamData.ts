import profile from "../assets/media/Team_pictures/Profile.png"
import tanner from "../assets/media/Team_pictures/tanner.png"
import aaron from "../assets/media/Team_pictures/aaron.png"
import aidan from "../assets/media/Team_pictures/aidan.png"
import alexis from "../assets/media/Team_pictures/alexis.png"
import arnav from "../assets/media/Team_pictures/arnav.png"
import ayla from "../assets/media/Team_pictures/ayla.png"
import clayton from "../assets/media/Team_pictures/clayton.png"
import excell from "../assets/media/Team_pictures/excell.png"
import gillian from "../assets/media/Team_pictures/gillian.png"
import hamin from "../assets/media/Team_pictures/hamin.png"
import josh from "../assets/media/Team_pictures/josh.png"
import kyle from "../assets/media/Team_pictures/kyle.png"
import nix from "../assets/media/Team_pictures/nix.png"
import ori from "../assets/media/Team_pictures/ori.png"
import vlad from "../assets/media/Team_pictures/vlad.png"
import tradd from "../assets/media/Team_pictures/tradd.png"
import vall from "../assets/media/Team_pictures/vall.png"
import sofia from "../assets/media/Team_pictures/sofia.png"



type MemberType = "LEAD" | "MEMBER" | "ADVISOR";

type Department =
    | "DESIGNER"
    | "TECH"
    | "OPERATIONS"
    | "ART"
    | "AUDIO"
    | "Narrative"
    | "Marketing";

type Status = "ACTIVE" | "INACTIVE" | "HIDDEN";



export type TeamMember = {
    name: string;
    title: string;
    highlight: string;
    member_type: MemberType;
    department: Department;
    status: Status;
    pic: string;
};

const createMember = (
        member: Omit<TeamMember, "pic">,
        pic: string = profile
    ): TeamMember => ({
        ...member,
        pic,
    });



const TeamData: TeamMember[] = [
    createMember({
        name: "Tanner Liou",
        title: "Founder, Chief Creative Officer",
        highlight:
            "World-class, multi-genre, multi-rank 1 professional player, esports coach, partnered content creator, AAA consultant, and lead combat designer.",
        member_type: "LEAD",
        department: "DESIGNER",
        status: "ACTIVE",
    }, tanner),

    createMember({
        name: "Excell Pepple",
        title: "Chief Technology Officer",
        highlight:
            "Software engineer and technical game designer specializing in server architecture, amd cloud infrastructure at Amazon Games for New World: Aeternum.",
        member_type: "LEAD",
        department: "TECH",
        status: "ACTIVE",
    }, excell),

    createMember({
        name: "Ayla Derrick",
        title: "Chief Operating Officer",
        highlight:
            "Founder and creative director at Cave Bear Games and Cave Bear Collective.",
        member_type: "LEAD",
        department: "OPERATIONS",
        status: "ACTIVE",
    }, ayla),

    createMember({
        name:"Sofia Ayad",
        title: "Marketing Director",
        highlight: "Marketing, communications, and events director at Insomniac Events, Something in Action, Connect, and Cave Bear Games.",
        department: "Marketing",
        member_type: "LEAD",
        status:"ACTIVE"
    }, sofia),

    createMember({
        name: "Tradd Thompson",
        title: "Combat Designer",
        highlight:
            "Lead combat designer at Intrepid Studios, Cryptic Studios, and Singularity Studios.",
        member_type: "MEMBER",
        department: "DESIGNER",
        status: "ACTIVE",
    }, tradd),

    createMember({
        name: "Nix Du",
        title: "Level Designer",
        highlight:
            "Game designer at Amazon Games on New World, The Lord of the Rings MMO, Dreamlit Games, and Tencent.",
        member_type: "MEMBER",
        department: "DESIGNER",
        status: "ACTIVE",
    }, nix),

    createMember({
        name: "Clayton Stamper",
        title: "Senior Gameplay Engineer",
        highlight:
            "Gameplay engineer at Intrepid Studios and Enduring Games.",
        member_type: "MEMBER",
        department: "TECH",
        status: "ACTIVE",
    }, clayton),

    createMember({
        name: "Gillian Ehman",
        title: "UI Engineer",
        highlight:
            "Software engineer for Studio Monsoon and Beamdog.",
        member_type: "MEMBER",
        department: "TECH",
        status: "ACTIVE",
    }, gillian),

    createMember({
        name: "Kyle Tubman",
        title: "Server Engineer",
        highlight:
            "Senior software engineer at Mount Sinai and WestonDEV.",
        member_type: "MEMBER",
        department: "TECH",
        status: "ACTIVE",
    }, kyle),

    createMember({
        name: "Arnav Malhotra",
        title: "Junior Systems Engineer",
        highlight:
            "Software engineer at Ubisoft, LandShark, Spiral Mind, Jalan Journey, and Microtube Technologies.",
        member_type: "MEMBER",
        department: "TECH",
        status: "ACTIVE",
    }, arnav),

    createMember({
        name: "Aidan Bell",
        title: "2D Artist",
        highlight:
            "2D concept artist at Cave Bear Games.",
        member_type: "MEMBER",
        department: "ART",
        status: "ACTIVE",
    }, aidan),

    createMember({
        name: "Josh Tyer",
        title: "3D Environment Artist",
        highlight:
            "3D environment artist at Cave Bear Games.",
        member_type: "MEMBER",
        department: "ART",
        status: "ACTIVE",
    }, josh),

    createMember({
        name: "Alexis Huang",
        title: "3D Modeler",
        highlight:
            "3D character artist and modeler at Integem, neuro42, ishugo, Titan Flag Studios, and Goyangi Games.",
        member_type: "MEMBER",
        department: "ART",
        status: "ACTIVE",
    }, alexis),

    createMember({
        name: "Vlad Medovnikov",
        title: "Lead Animator",
        highlight:
            "Lead animator at Saber Interactive, Sperasoft, Wargaming, Mundfish, Tinybuild, and Agora Studio.",
        member_type: "LEAD",
        department: "ART",
        status: "ACTIVE",
    }, vlad),

    createMember({
        name: "Aaron Gao",
        title: "Audio Director",
        highlight:
            "Music composer at Tencent, NewStyle Media Group, Mayhem Mirror, 24H Studios, Youku, and pursuing M.M. in Film Scoring at USC.",
        member_type: "LEAD",
        department: "AUDIO",
        status: "ACTIVE",
    }, aaron),

    createMember({
        name: "Ori Zur",
        title: "Composer",
        highlight:
            "Award-winning composer, software engineer, and multi-instrumentalist at Tencent, NetEase, and Microids.",
        member_type: "MEMBER",
        department: "AUDIO",
        status: "ACTIVE",
    }, ori),

    createMember({
        name: "Hamin Jung",
        title: "Sound Designer",
        highlight:
            "Sound designer and audio engineer for Miracle Sound Design & Music and Republic of Korea Air Force.",
        member_type: "MEMBER",
        department: "AUDIO",
        status: "ACTIVE",
    }, hamin),

    createMember({
        name: "Alexandre Vallesi",
        title:"Narrative Designer",
        highlight: "Writer, narrative designer, and program coordinator at Cave Bear Games and Game Design Skills.",
        member_type: "MEMBER",
        department: "Narrative",
        status: "ACTIVE",
    }, vall),


];
export default TeamData;
