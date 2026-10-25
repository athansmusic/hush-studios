import { CARD } from "../card";

/** The contact card as a vCard, for "Save contact" on phones. */
export function GET() {
  const display = CARD.fullName || "Athan";
  const links = [...CARD.social, ...CARD.music];
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${display}`,
    CARD.fullName ? `N:${CARD.fullName.split(" ").slice(-1)[0]};${CARD.fullName.split(" ").slice(0, -1).join(" ")};;;` : `N:;${display};;;`,
    "NICKNAME:Athan",
    `ORG:${CARD.org}`,
    `TITLE:${CARD.role}`,
    `EMAIL;TYPE=WORK:${CARD.email}`,
    `URL:${CARD.site}`,
    ...links.map((l) => `X-SOCIALPROFILE;TYPE=${l.label.toLowerCase().replace(/\s+/g, "")}:${l.href}`),
    ...(CARD.booking ? [`URL;TYPE=booking:${CARD.booking}`] : []),
    "END:VCARD",
    "",
  ].join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="athan.vcf"',
    },
  });
}
