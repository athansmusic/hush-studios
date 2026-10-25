import { siApplemusic, siBluesky, siInstagram, siSpotify, siTiktok, siTwitch, siX } from "simple-icons";
import { STUDIO } from "@/data/studio";

/** An icon is a 24x24 path (simple-icons) or "linkedin", which simple-icons no longer carries. */
export type CardIcon = { path: string; hex: string } | "linkedin";
export type CardLink = { label: string; handle: string; href: string; icon: CardIcon; color: string };
export type CardShow = { label: string; sub: string; href: string; art: string };

/** One person's contact card (/athan, /jamie): the page, its share image and its saved contact. */
export type Card = {
  slug: string;
  /** Large, at the top. */
  name: string;
  /** Smaller, under the name; also the saved contact's name. */
  fullName: string;
  firstName: string;
  lastName: string;
  role: string;
  org: string;
  image: string;
  email: string;
  site: string;
  /** Meta and share text. */
  title: string;
  description: string;
  twitter?: string;
  username?: string;
  /** A free Calendly link; the button is left off without one. */
  booking?: string;
  social: CardLink[];
  video?: { id: string; title: string };
  shows: CardShow[];
  /** What the Hush Studios button says under its name. */
  studioNote: string;
  linkedin?: CardLink;
  music?: CardLink[];
};

const brand = (i: { path: string; hex: string }) => ({ icon: i, color: `#${i.hex}` });

const REDACTED: CardShow = { label: "REDACTED", sub: "Horror comedy audio drama", href: "https://tru.show/", art: "/shows/redacted.jpg" };

const athanLinkedIn: CardLink = { label: "LinkedIn", handle: "johnathanmagno", href: "https://www.linkedin.com/in/johnathanmagno/", icon: "linkedin", color: "#0a66c2" };

export const CARDS = {
  athan: {
    slug: "athan",
    name: "ATHAN",
    fullName: "Johnathan Magno",
    firstName: "Johnathan",
    lastName: "Magno",
    role: "Co-creator and Head of Studio",
    org: STUDIO.name,
    image: "/people/athan.png",
    email: "athan@theredactedunit.com",
    site: STUDIO.url,
    title: "Athan (Johnathan Magno)",
    description: "Athan from Hush Studios: REDACTED, voice actor, musician, streamer.",
    twitter: "@AthansMusic",
    username: "athansmusic",
    booking: "https://calendly.com/athan-theredactedunit/30min",
    social: [
      { label: "Instagram", handle: "@athansmusic", href: "https://www.instagram.com/athansmusic/", ...brand(siInstagram) },
      { label: "TikTok", handle: "@athansmusic", href: "https://www.tiktok.com/@athansmusic", ...brand(siTiktok) },
      { label: "X", handle: "@AthansMusic", href: "https://x.com/AthansMusic", ...brand(siX) },
      { label: "Twitch", handle: "AthansMusic", href: "https://www.twitch.tv/athansmusic", ...brand(siTwitch) },
      { label: "Bluesky", handle: "@athansmusic.bsky.social", href: "https://bsky.app/profile/athansmusic.bsky.social", ...brand(siBluesky) },
      athanLinkedIn,
    ],
    video: { id: "xkpg_foIbxQ", title: "Eli Reyes - I Saw the TV Glow" },
    shows: [
      REDACTED,
      { label: "REDACTED stats", sub: "Audience numbers and sponsorship", href: "https://tru.show/partner", art: "/shows/redacted.jpg" },
      { label: "The Grotto", sub: "Liminal horror podcast", href: "https://www.thegrottopod.com/", art: "/shows/the-grotto.jpg" },
    ],
    studioNote: "REDACTED, The Grotto and more",
    linkedin: athanLinkedIn,
    music: [
      { label: "Spotify", handle: "Athan", href: "https://open.spotify.com/artist/3XCFEDx0MwDcKKTGsfGCzd", ...brand(siSpotify) },
      { label: "Apple Music", handle: "Athan", href: "https://music.apple.com/us/artist/athan/1511495649", ...brand(siApplemusic) },
    ],
  },
  jamie: {
    slug: "jamie",
    name: "JAMIE",
    fullName: "Jamie Petronis",
    firstName: "Jamie",
    lastName: "Petronis",
    role: "Co-creator and Head of Content",
    org: STUDIO.name,
    image: "/people/jamie-petronis.png",
    email: "jamie@theredactedunit.com",
    site: STUDIO.url,
    title: "Jamie Petronis",
    description: "Jamie Petronis from Hush Studios: co-creator and head writer of REDACTED, voice actor, writer.",
    username: "jamiepetronis",
    social: [
      { label: "Instagram", handle: "@jlpetronis", href: "https://www.instagram.com/jlpetronis/", ...brand(siInstagram) },
      { label: "Twitch", handle: "jamiepetronis", href: "https://www.twitch.tv/jamiepetronis", ...brand(siTwitch) },
      { label: "Bluesky", handle: "@jamiepetronis.bsky.social", href: "https://bsky.app/profile/jamiepetronis.bsky.social", ...brand(siBluesky) },
    ],
    shows: [REDACTED],
    studioNote: "The studio behind REDACTED",
  },
} satisfies Record<string, Card>;

/** The pages with no site header, footer or player. */
export const CARD_PATHS = Object.values(CARDS).map((c) => `/${c.slug}`);
