/* Converts the full-size source art into web-sized WebP files in public/media.

   The source PNGs are huge (the roster is 13500px wide and ~10MB), so they
   live outside the repo. Point ASSETS_DIR at the art folder and run:

       ASSETS_DIR="D:/Personal/Work/IMG/Website Assets/Website Assets" npm run assets

   Team portraits are read from ASSETS_DIR/Team_pictures when that folder
   exists, otherwise from TEAM_DIR. The current portraits are circle crops, so
   by default each is cut to the square inside its circle (the site shows
   square portraits); set TEAM_CIRCLE_CROP=false for portraits that are
   already square. Missing sources are skipped with a warning, so you can
   re-run it after replacing a single file.

   public/media/logo-wide.webp (the nav logo) came from the original site and
   is not generated here. */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = process.env.ASSETS_DIR;
const OUT_DIR = path.resolve(import.meta.dirname, "../public/media");

if (!ASSETS_DIR) {
    console.error("Set ASSETS_DIR to the folder holding the source art.");
    process.exit(1);
}

/** [source (relative to ASSETS_DIR), output name, max width, quality] */
const ART = [
    ["inmidnightbannerFullSize.png", "hero-banner.webp", 2400, 78],
    ["inmidnightbannerFullSize.png", "hero-banner-sm.webp", 1100, 76],
    ["inmidnightbannerWithGradient.png", "careers-banner.webp", 2400, 76],
    ["IMG_logoV9_tpwhite.png", "logo.webp", 900, 88],
    ["Hero_roster.png", "roster.webp", 2600, 82],
    ["Key_art.png", "key-art.webp", 1400, 82],
    ["IMG_logoV9_circle.png", "logo-emblem.webp", 192, 90],
];

/** Pillar silhouettes, trimmed to their outline so
    they can be laid out at the same size. [source name, output name]. */
const PILLARS = [
    ["Whisper", "pillar-remote"],
    ["Slayer", "pillar-gameplay"],
    ["Sunchaser", "pillar-skill"],
];

const TEAM_DIR = fs.existsSync(path.join(ASSETS_DIR, "Team_pictures"))
    ? path.join(ASSETS_DIR, "Team_pictures")
    : process.env.TEAM_DIR;

fs.mkdirSync(OUT_DIR, { recursive: true });

const CIRCLE_CROP = process.env.TEAM_CIRCLE_CROP !== "false";

async function convert(src, out, width, quality, { innerSquare = false, trim = false } = {}) {
    if (!fs.existsSync(src)) {
        console.warn(`skip  ${path.basename(src)} (not found)`);
        return;
    }

    let image = sharp(src);

    if (trim) {
        image = sharp(await image.trim().toBuffer());
    }

    if (innerSquare) {
        // The largest square inside a centered circle is diameter / sqrt(2).
        const { width: w, height: h } = await image.metadata();
        const side = Math.floor(Math.min(w, h) / Math.SQRT2);
        image = sharp(await image.extract({ left: Math.floor((w - side) / 2), top: Math.floor((h - side) / 2), width: side, height: side }).toBuffer());
    }

    const info = await image
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, alphaQuality: 90, effort: 6 })
        .toFile(out);

    console.log(`wrote ${path.relative(OUT_DIR, out)} ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`);
}

for (const [src, out, width, quality] of ART) {
    await convert(path.join(ASSETS_DIR, src), path.join(OUT_DIR, out), width, quality);
}

for (const [src, out] of PILLARS) {
    await convert(path.join(ASSETS_DIR, `Timeless/Lineup_${src}.png`), path.join(OUT_DIR, `${out}.webp`), 900, 84, { trim: true });
}

if (TEAM_DIR) {
    fs.mkdirSync(path.join(OUT_DIR, "team", "round"), { recursive: true });

    for (const file of fs.readdirSync(TEAM_DIR).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))) {
        const name = path.parse(file).name.toLowerCase();
        // Square crop for the picker grid; the whole portrait for the round frame.
        await convert(path.join(TEAM_DIR, file), path.join(OUT_DIR, "team", `${name}.webp`), 400, 82, { innerSquare: CIRCLE_CROP });
        await convert(path.join(TEAM_DIR, file), path.join(OUT_DIR, "team", "round", `${name}.webp`), 480, 84);
    }
}
