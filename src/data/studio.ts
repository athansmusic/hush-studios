/** Tolerates a bare host ("hush-studios.vercel.app") or a trailing slash in the env value. */
function siteUrl(raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
  if (!raw) return "https://hushstudios.co";
  return (/^https?:\/\//.test(raw) ? raw : `https://${raw}`).replace(/\/+$/, "");
}

export const STUDIO = {
  name: "Hush Studios",
  url: siteUrl(),
  // Temporary until a hushstudios.co inbox exists.
  email: "crew@theredactedunit.com",
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
  status: string;
  art?: string;
  /** The one colour pulled from the show's own art, used for its accents across the site. */
  accent: string;
  listen: LinkOut[];
  follow: LinkOut[];
  site?: string;
  /** Podcast RSS feed; its episodes are listed and playable on the show page. */
  feed?: string;
  /** Extra links for the side panel, each under its own heading. */
  links?: { heading: string; label: string; href: string }[];
  /** Kept in the data but left off the site. */
  hidden?: boolean;
  /** Unreleased: carries a "Coming soon" tag wherever it appears. */
  comingSoon?: boolean;
};

const ALL_SHOWS: Show[] = [
  {
    slug: "redacted",
    feed: "https://feeds.acast.com/public/shows/68dfd04b043c361f82e093c0",
    title: "REDACTED",
    kind: "Audio drama",
    genre: "Horror comedy",
    logline: "A failing actor takes his dead twin's job and finds himself inside a secret agency for the paranormal.",
    about: [
      "Struggling actor Jacob Kane assumes the identity of his deceased twin, Jordan, expecting a quiet accounting job. Instead he lands in The REDACTED Unit: an underfunded government agency that discreetly handles bizarre, dangerous cases called Aberrations.",
      "A nostalgic monster-of-the-week format with sharp humour and 2000s procedural flair, with the mystery of Jordan's death running underneath every case.",
    ],
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
    links: [{ heading: "Advertise", label: "Media kit & sponsorship", href: "https://theredactedunit.com/partner" }],
  },
  {
    slug: "corrupted",
    title: "CORRUPTED",
    kind: "Audio drama",
    genre: "Horror anthology",
    logline: "A horror anthology series set in the REDACTED universe.",
    about: [
      "CORRUPTED is an in-universe horror anthology series exploring a new aberration or case each month, set in either the modern day or somewhere in history. Some stories introduce entirely original threats; others expand on aberrations from the main show. And sometimes, the horror stems from familiar legends and stories.",
    ],
    status: "Coming soon",
    comingSoon: true, // delete once it is out
    art: "/shows/corrupted.jpg",
    accent: "#e0303f",
    listen: [],
    follow: [],
    site: "https://theredactedunit.com/corrupted",
  },
  {
    slug: "the-seven-planes",
    feed: "https://feeds.acast.com/public/shows/68e2c02b5f95c3d4193a1538",
    title: "The Seven Planes",
    kind: "Analog horror",
    genre: "Analog horror",
    logline: "Recovered tapes chronicling the history of a strange world, and its even stranger inhabitants.",
    about: [
      "A collection of analog horror tapes chronicling the history of a strange world filled with even stranger inhabitants.",
    ],
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
    slug: "the-cellar-letters",
    feed: "https://feeds.acast.com/public/shows/633d459331f65200114bfe1f",
    title: "The Cellar Letters",
    kind: "Audio drama",
    genre: "Horror",
    logline: "Who wrote the letters? And why are they all stored in the cellar? Join Nate, his dog, and his friend Steve as they search for answers.",
    about: [
      "After a series of traumatic events, including losing his job, Nate and his dog Bella move across the country to the East Coast. Nate documents the whole process as he seeks to try something new and have a fresh start.",
      "The new house appears perfect: huge, loads of room, a yard for Bella to run in… and the rent is unbelievably low. But there’s something not quite right. The house feels… off. Knocking noises in the nighttime, and a locked room in the basement, filled with letters about strange occurrences and ghostly figures.",
    ],
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
    slug: "the-grotto",
    feed: "https://feeds.acast.com/public/shows/656324aea21bff0011ecae4f",
    title: "The Grotto",
    kind: "Audio drama",
    genre: "Horror musical",
    logline: "The Grotto is a liminal horror podcast with original music and a full cast that explores the thin line between grief, pain, mourning, and loss.",
    about: [
      "Struck by the recent loss of his long-term girlfriend, Matt turns to spelunking for solace. As Matt battles grief, he questions if the caves are playing tricks or if something else lurks within.",
    ],
    status: "Series Finale TBD",
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
    slug: "frights-by-fire",
    title: "Frights by Fire",
    kind: "Live",
    genre: "Live storytelling",
    logline: "Short scary stories from the community, read aloud on stream around a virtual fire.",
    about: [
      "A weekly community-driven event. Listeners send in short scary stories around a theme, and they are read aloud live on stream.",
      "Bring a story, or just pull up a seat by the fire.",
    ],
    status: "Live every Thursday",
    hidden: true, // off the site for now
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

export const SHOWS = ALL_SHOWS.filter((s) => !s.hidden);

export const getShow = (slug: string) => SHOWS.find((s) => s.slug === slug);

export type Person = { name: string; role: string; image?: string };

export const PEOPLE: Person[] = [
  { name: "Jamie Petronis", role: "Co-creator and Head of Content", image: "/people/jamie-petronis.png" },
  { name: "Athan", role: "Co-creator and Head of Studio", image: "/people/athan.png" },
  { name: "Derek Moreland", role: "Head of Production", image: "/people/derek-moreland.png" },
  { name: "Natalie Light", role: "Creative Director", image: "/people/natalie-light.png" },
  { name: "Landon Whisnant", role: "Lead Sound Designer", image: "/people/landon-whisnant.png" },
];

/** Additional Works: projects Hush contributed to but did not originate (production consulting, collaborations, etc). */
export type Work = {
  slug: string;
  title: string;
  genre?: string;
  logline?: string;
  /** Hush's credit on the project. */
  role: string;
  art?: string;
  accent: string;
  about?: string[];
  listen?: LinkOut[];
  follow?: LinkOut[];
  site?: string;
  /** Unreleased: the card and page say "Coming soon". */
  comingSoon?: boolean;
};

export const WORKS: Work[] = [
  {
    slug: "see-you-in-fahlstaff",
    title: "See You in Fahlstaff",
    genre: "Horror Anthology*",
    role: "Production Consultants",
    about: [
      "Something is changing in the city of Fahlstaff. While it’s always attracted the bizarre, the strange, the frightening, the monstrous... lately, something feels…different. Was that house there before? Are the trees listening? Is there something hiding in your blindspot?",
    ],
    art: "/works/see-you-in-fahlstaff.jpg",
    accent: "#b01010",
    site: "https://www.seeyouinfahlstaff.com/",
    comingSoon: true, // delete once it is out
  },
];

export const getWork = (slug: string) => WORKS.find((w) => w.slug === slug);

/** A row in a home-page index: shows and works share the same format. */
export type IndexItem = {
  key: string;
  href: string;
  title: string;
  art?: string;
  accent: string;
  genre?: string;
  /** The small line under the genre: a show's status, a work's credit. */
  detail?: string;
  comingSoon?: boolean;
};

export const showItem = (s: Show): IndexItem => ({
  key: s.slug, href: `/shows/${s.slug}`, title: s.title, art: s.art, accent: s.accent, genre: s.genre,
  detail: s.comingSoon ? undefined : s.status, comingSoon: s.comingSoon,
});

export const workItem = (w: Work): IndexItem => ({
  key: w.slug, href: `/works/${w.slug}`, title: w.title, art: w.art, accent: w.accent, genre: w.genre,
  detail: w.role, comingSoon: w.comingSoon,
});
