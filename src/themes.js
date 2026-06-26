// Six ticket themes. Each one drives the card gradient, accent color,
// the decorative pattern drawn behind it, and the barcode/stamp tint.

export const THEMES = [
  {
    id: "midnight-glass",
    name: "Midnight Glass",
    gradient: "linear-gradient(145deg, #0d1117 0%, #161b2e 45%, #1b2240 100%)",
    accent: "#8b8cf8",
    accent2: "#a855f7",
    pattern: "sparks",
    swatch: "linear-gradient(135deg, #1b2240, #6366f1, #a855f7)",
  },
  {
    id: "velvet-confetti",
    name: "Velvet Confetti",
    gradient: "linear-gradient(150deg, #2b0b3f 0%, #5a1a63 55%, #7a2470 100%)",
    accent: "#f6c453",
    accent2: "#ff8fb1",
    pattern: "confetti",
    swatch: "linear-gradient(135deg, #2b0b3f, #7a2470, #f6c453)",
  },
  {
    id: "citrus-pop",
    name: "Citrus Pop",
    gradient: "linear-gradient(150deg, #ff7a59 0%, #ff9d6c 50%, #ffd166 100%)",
    accent: "#d62839",
    accent2: "#7a1f2b",
    pattern: "rays",
    swatch: "linear-gradient(135deg, #ff7a59, #ffb066, #ffd166)",
    dark: false,
  },
  {
    id: "galaxy-candles",
    name: "Galaxy Candles",
    gradient: "linear-gradient(150deg, #160b2e 0%, #341b5e 50%, #5b2e9e 100%)",
    accent: "#ffd76b",
    accent2: "#7ee8fa",
    pattern: "stars",
    swatch: "linear-gradient(135deg, #160b2e, #5b2e9e, #ffd76b)",
  },
  {
    id: "mint-parade",
    name: "Mint Parade",
    gradient: "linear-gradient(150deg, #0f3d3e 0%, #178a72 55%, #59d9a6 100%)",
    accent: "#fff3b0",
    accent2: "#ffffff",
    pattern: "balloons",
    swatch: "linear-gradient(135deg, #0f3d3e, #178a72, #59d9a6)",
  },
  {
    id: "rose-bloom",
    name: "Rosé Bloom",
    gradient: "linear-gradient(150deg, #4a1942 0%, #9c4068 55%, #f6b8c4 100%)",
    accent: "#ffe7ee",
    accent2: "#ffd6a5",
    pattern: "petals",
    swatch: "linear-gradient(135deg, #4a1942, #9c4068, #f6b8c4)",
  },
];

export const FONTS = [
  { id: "playfair", label: "Playfair", family: "'Playfair Display', serif" },
  { id: "caveat", label: "Caveat", family: "'Caveat', cursive" },
  { id: "quicksand", label: "Quicksand", family: "'Quicksand', sans-serif" },
];

export const SAMPLE_MESSAGES = [
  "Another year of you being effortlessly brilliant. Here's to more laughs, more wins, and more cake. Happy birthday!",
  "May your day be as bright as your ideas and as warm as your laugh. Happy birthday, and here's to everything ahead of you.",
  "You bring the best energy into every room — today it's your turn to be celebrated. Happy birthday!",
  "Wishing you a year that matches your ambition: bold, exciting, and full of good surprises. Happy birthday!",
  "Cheers to you — for every late night, every win, and every reason to celebrate today. Happy birthday!",
  "Here's to the person who makes ordinary days feel special. May this one be extra good to you. Happy birthday!",
];

export function getTheme(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}
