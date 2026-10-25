import { siApplemusic, siBluesky, siInstagram, siSpotify, siTiktok, siTwitch, siX } from "simple-icons";
import { STUDIO } from "@/data/studio";

/** An icon is a 24x24 path (simple-icons) or "linkedin", which simple-icons no longer carries. */
export type CardIcon = { path: string; hex: string } | "linkedin";
export type CardLink = { label: string; handle: string; href: string; icon: CardIcon; color: string };

const brand = (i: { path: string; hex: string }) => ({ icon: i, color: `#${i.hex}` });

/** Athan's contact card: the /athan page and the saved contact (athan.vcf) both read from here. */
export const CARD = {
  name: "ATHAN",
  /** Shown smaller under the name. */
  fullName: "Johnathan Magno",
  role: "Co-creator and Head of Studio",
  org: STUDIO.name,
  image: "/people/athan.png",
  email: "athan@theredactedunit.com",
  site: STUDIO.url,
  /** A free Calendly link; the button is left off while empty. */
  booking: "https://calendly.com/athan-theredactedunit/30min",
  social: [
    { label: "Instagram", handle: "@athansmusic", href: "https://www.instagram.com/athansmusic/", ...brand(siInstagram) },
    { label: "TikTok", handle: "@athansmusic", href: "https://www.tiktok.com/@athansmusic", ...brand(siTiktok) },
    { label: "X", handle: "@AthansMusic", href: "https://x.com/AthansMusic", ...brand(siX) },
    { label: "Twitch", handle: "AthansMusic", href: "https://www.twitch.tv/athansmusic", ...brand(siTwitch) },
    { label: "Bluesky", handle: "@athansmusic.bsky.social", href: "https://bsky.app/profile/athansmusic.bsky.social", ...brand(siBluesky) },
    { label: "LinkedIn", handle: "johnathanmagno", href: "https://www.linkedin.com/in/johnathanmagno/", icon: "linkedin", color: "#0a66c2" },
  ] satisfies CardLink[],
  /** A YouTube video shown on the card (the id from its watch URL). */
  video: { id: "xkpg_foIbxQ", title: "Eli Reyes - I Saw the TV Glow" },
  shows: [
    { label: "REDACTED", sub: "Horror comedy audio drama", href: "https://tru.show/", art: "/shows/redacted.jpg" },
    { label: "REDACTED partners", sub: "Show stats and sponsorship", href: "https://tru.show/partner", art: "/shows/redacted.jpg" },
    { label: "The Grotto", sub: "Liminal horror podcast", href: "https://www.thegrottopod.com/", art: "/shows/the-grotto.jpg" },
  ],
  music: [
    { label: "Spotify", handle: "Athan", href: "https://open.spotify.com/artist/3XCFEDx0MwDcKKTGsfGCzd", ...brand(siSpotify) },
    { label: "Apple Music", handle: "Athan", href: "https://music.apple.com/us/artist/athan/1511495649", ...brand(siApplemusic) },
  ] satisfies CardLink[],
};
