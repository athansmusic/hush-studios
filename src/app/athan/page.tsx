import { CARDS } from "@/data/cards";
import { ContactCard, cardMetadata } from "@/components/ContactCard";

export const metadata = cardMetadata(CARDS.athan);

export default function AthanCard() {
  return <ContactCard card={CARDS.athan} />;
}
