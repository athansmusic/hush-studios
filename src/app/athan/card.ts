import { siApplemusic, siBluesky, siCalendly, siInstagram, siSpotify, siTiktok, siTwitch, siX, type SimpleIcon } from "simple-icons";
import { STUDIO } from "@/data/studio";

export type CardLink = { label: string; handle: string; href: string; icon: SimpleIcon };

/** Athan's contact card: the /athan page and the saved contact (athan.vcf) both read from here. */
export const CARD = {
  name: "ATHAN",
  /** Shown smaller under the name; left off while empty. */
  fullName: "Johnathan Magno",
  role: "Co-creator and Head of Studio",
  org: STUDIO.name,
  image: "/people/athan.png",
  email: "athan@theredactedunit.com",
  site: STUDIO.url,
  /** A free Calendly link (calendly.com/<name>/<event>); the button appears once it is filled in. */
  booking: "https://calendly.com/athan-theredactedunit/30min",
  social: [
    { label: "Twitch", handle: "AthansMusic", href: "https://www.twitch.tv/athansmusic", icon: siTwitch },
    { label: "X", handle: "@AthansMusic", href: "https://x.com/AthansMusic", icon: siX },
    { label: "TikTok", handle: "@athansmusic", href: "https://www.tiktok.com/@athansmusic", icon: siTiktok },
    { label: "Instagram", handle: "@athansmusic", href: "https://www.instagram.com/athansmusic/", icon: siInstagram },
    { label: "Bluesky", handle: "@athansmusic.bsky.social", href: "https://bsky.app/profile/athansmusic.bsky.social", icon: siBluesky },
  ] satisfies CardLink[],
  music: [
    { label: "Spotify", handle: "Athan", href: "https://open.spotify.com/artist/3XCFEDx0MwDcKKTGsfGCzd", icon: siSpotify },
    { label: "Apple Music", handle: "Athan", href: "https://music.apple.com/us/artist/athan/1511495649", icon: siApplemusic },
  ] satisfies CardLink[],
  calendlyIcon: siCalendly,
};
