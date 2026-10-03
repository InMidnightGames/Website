/* Prints the torn-paper clip-paths used by the `torn*` utilities in
   src/index.css. Seeded, so re-running gives the same shapes; change SEED
   for a different tear, then paste the output into index.css.

       node scripts/ragged-edges.mjs */

const SEED = 7;
let s = SEED;
const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
const j = (amp) => (rnd() * amp).toFixed(1);

/** Rectangle with every edge slightly torn. */
function rect(steps, amp) {
    const pts = [];
    for (let i = 0; i <= steps; i++) pts.push(`${((i / steps) * 100).toFixed(1)}% ${j(amp)}px`);
    for (let i = 1; i <= 3; i++) pts.push(`calc(100% - ${j(amp)}px) ${((i / 4) * 100).toFixed(0)}%`);
    for (let i = steps; i >= 0; i--) pts.push(`${((i / steps) * 100).toFixed(1)}% calc(100% - ${j(amp)}px)`);
    for (let i = 3; i >= 1; i--) pts.push(`${j(amp)}px ${((i / 4) * 100).toFixed(0)}%`);
    return `polygon(${pts.join(", ")})`;
}

/** Straight top and sides, torn bottom edge. */
function bottomEdge(steps, amp) {
    const pts = ["0 0", "100% 0"];
    for (let i = steps; i >= 0; i--) pts.push(`${((i / steps) * 100).toFixed(1)}% calc(100% - ${j(amp)}px)`);
    return `polygon(${pts.join(", ")})`;
}

/** Torn top and bottom edges, straight sides. */
function topBottom(steps, amp) {
    const pts = [];
    for (let i = 0; i <= steps; i++) pts.push(`${((i / steps) * 100).toFixed(1)}% ${j(amp)}px`);
    for (let i = steps; i >= 0; i--) pts.push(`${((i / steps) * 100).toFixed(1)}% calc(100% - ${j(amp)}px)`);
    return `polygon(${pts.join(", ")})`;
}

console.log("torn:", rect(9, 3.5));
console.log("torn-frame:", rect(14, 7));
console.log("torn-bottom:", bottomEdge(40, 26));
console.log("torn-band:", topBottom(40, 18));
