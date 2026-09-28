/** Tolerates a bare host ("hush-studios.vercel.app") or a trailing slash in the env value. */
function siteUrl(raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
  if (!raw) return "https://hushstudios.co";
  return (/^https?:\/\//.test(raw) ? raw : `https://${raw}`).replace(/\/+$/, "");
}

export const STUDIO = {
  name: "Hush Studios",
  url: siteUrl(),
  // TODO: swap in the real studio inbox before launch.
  email: "hello@hushstudios.co",
  youtube: "https://www.youtube.com/@hushstudiosofficial",
};

export type LinkOut = { label: string; href: string };

export type Show = {
  slug: string;
  title: string;
  kind: "Audio drama" | "Analog horror" | "Live";
  genre: string;
  logline: string;
  about: string[];
  creators: string;
  status: string;
  art?: string;
  /** The one colour pulled from the show's own art, used for its accents across the site. */
  accent: string;
  listen: LinkOut[];
  follow: LinkOut[];
  site?: string;
};

export const SHOWS: Show[] = [
  {
    slug: "redacted",
    title: "REDACTED",
    kind: "Audio drama",
    genre: "Horror comedy",
    logline: "A failing actor takes his dead twin's job and finds himself inside a secret agency for the paranormal.",
    about: [
      "Struggling actor Jacob Kane assumes the identity of his deceased twin, Jordan, expecting a quiet accounting job. Instead he lands in The REDACTED Unit: an underfunded government agency that discreetly handles bizarre, dangerous cases called Aberrations.",
      "A nostalgic monster-of-the-week format with sharp humour and 2000s procedural flair, with the mystery of Jordan's death running underneath every case.",
    ],
    creators: "Athan & Jamie Petronis",
    status: "New episodes Fridays",
    art: "/shows/redacted.jpg",
    accent: "#fff200",
    listen: [
      { label: "Spotify", href: "https://open.spotify.com/show/21ELGMQm084YVNCRqjqGJz" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/redacted/id1848745811" },
    ],
    follow: [
      { label: "Instagram", href: "https://www.instagram.com/theredactedunit/" },
      { label: "X", href: "https://x.com/TheRedactedUnit" },
      { label: "Bluesky", href: "https://bsky.app/profile/theredactedunit.com" },
      { label: "TikTok", href: "https://www.tiktok.com/@theredactedunit" },
    ],
    site: "https://www.theredactedunit.com/",
  },
  {
    slug: "the-grotto",
    title: "The Grotto",
    kind: "Audio drama",
    genre: "Liminal horror",
    logline: "After a personal tragedy, Matt turns to caving, and the dark underground turns back toward him.",
    about: [
      "A liminal horror audio drama with a full cast and original music, exploring grief, pain, mourning and loss.",
      "Following a personal tragedy, Matt takes up caving. What he finds below is not only rock.",
    ],
    creators: "Athan",
    status: "Complete season available",
    art: "/shows/the-grotto.jpg",
    accent: "#d0231f",
    listen: [
      { label: "Spotify", href: "https://open.spotify.com/show/6QpNulausPsTkrPV52sCzG" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/the-grotto/id1718495010" },
    ],
    follow: [
      { label: "Instagram", href: "https://www.instagram.com/thegrottoofficial/" },
      { label: "X", href: "https://twitter.com/GrottoPod" },
      { label: "Bluesky", href: "https://bsky.app/profile/thegrottopod.com" },
      { label: "TikTok", href: "https://www.tiktok.com/@grottopod" },
    ],
    site: "https://thegrottopod.com/",
  },
  {
    slug: "the-cellar-letters",
    title: "The Cellar Letters",
    kind: "Audio drama",
    genre: "Horror",
    logline: "Nate and his dog Bella find a locked basement in an old Maine house, and the letters waiting inside it.",
    about: [
      "A horror audio drama following Nate, and his dog Bella, as they move into a mysterious old house in Maine.",
      "Behind a locked basement door is a stack of letters. Reading them was the first mistake.",
    ],
    creators: "Jamie Petronis",
    status: "Available now",
    art: "/shows/the-cellar-letters.jpg",
    accent: "#e4e25a",
    listen: [
      { label: "Spotify", href: "https://open.spotify.com/show/3M5ECukc8C3OhibXHBqLuh" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/id1542891074" },
    ],
    follow: [
      { label: "Instagram", href: "https://www.instagram.com/thecellarletters/" },
      { label: "X", href: "https://x.com/CellarLetters/" },
      { label: "Bluesky", href: "https://bsky.app/profile/thecellarletters.bsky.social" },
    ],
    site: "https://www.thecellarletters.com/",
  },
  {
    slug: "the-seven-planes",
    title: "The Seven Planes",
    kind: "Analog horror",
    genre: "Analog horror",
    logline: "Recovered tapes chronicling the history of a strange world, and its even stranger inhabitants.",
    about: [
      "A collection of analog horror tapes chronicling the history of a strange world filled with even stranger inhabitants.",
    ],
    creators: "Landon Whisnant",
    status: "Available now",
    art: "/shows/the-seven-planes.jpg",
    accent: "#f2a516",
    listen: [
      { label: "Spotify", href: "https://open.spotify.com/show/1KbvIbGaohctCN8NVwRT32" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com/gb/podcast/the-seven-planes/id1848749565" },
    ],
    follow: [],
  },
  {
    slug: "frights-by-fire",
    title: "Frights by Fire",
    kind: "Live",
    genre: "Live storytelling",
    logline: "Short scary stories from the community, read aloud on stream around a virtual fire.",
    about: [
      "A weekly community-driven event. Listeners send in short scary stories around a theme, and they are read aloud live on stream.",
      "Bring a story, or just pull up a seat by the fire.",
    ],
    creators: "Athan & Jamie",
    status: "Live every Thursday",
    accent: "#ff7a2f",
    listen: [],
    follow: [
      { label: "Instagram", href: "https://www.instagram.com/frightsbyfire/" },
      { label: "X", href: "https://x.com/frightsbyfire/" },
      { label: "Bluesky", href: "https://bsky.app/profile/frightsbyfire.bsky.social" },
      { label: "TikTok", href: "https://www.tiktok.com/@frightsbyfire" },
    ],
  },
];

export const getShow = (slug: string) => SHOWS.find((s) => s.slug === slug);

export type Person = { name: string; role: string; image?: string };

export const PEOPLE: Person[] = [
  { name: "Athan", role: "Co-founder", image: "/people/athan.png" },
  { name: "Jamie Petronis", role: "Co-founder", image: "/people/jamie-petronis.png" },
  { name: "Derek Moreland", role: "Head of Production" },
  { name: "Natalie Light", role: "Creative Director" },
  { name: "Landon Whisnant", role: "Lead Sound Designer" },
];

/** Additional Works: projects Hush contributed to but did not originate (production consulting, collaborations, etc). */
export type Work = { title: string; role: string; href?: string; art?: string };

// TODO: fill in from Athan's list.
export const WORKS: Work[] = [];
