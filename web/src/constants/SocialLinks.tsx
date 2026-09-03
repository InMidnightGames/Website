import twitterLogo from "../assets/media/SocialMediaLogos/twitter.png";
import tikTokLogo from "../assets/media/SocialMediaLogos/tik-tok.png";
import instagramLogo from "../assets/media/SocialMediaLogos/instagram.png";
import facebookLogo from "../assets/media/SocialMediaLogos/facebook.png";
import youtubeLogo from "../assets/media/SocialMediaLogos/youtube.png";
import patreonLogo from "../assets/media/SocialMediaLogos/patreon.png";

export type SocialLinks = {
    name: string;
    url: string;
    image: string;
};

export const socials: SocialLinks[] = [
    {
        name: "X",
        url: "https://x.com/inmidnightgames",
        image: twitterLogo,
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@inmidnightgames",
        image: tikTokLogo,
    },
    {
        name: "Instagram",
        url: "http://instagram.com/inmidnight.games",
        image: instagramLogo,
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/people/InMidnight-Games/61592747566097/",
        image: facebookLogo,
    },
    {
        name: "YouTube",
        url: "https://www.youtube.com/channel/UCR53qgxOvSYWjJnDx8RncaA",
        image: youtubeLogo,
    },
    {
        name: "Patreon",
        url: "https://www.patreon.com/cw/InMidnightGames",
        image: patreonLogo,
    },
];