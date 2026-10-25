import { CARDS } from "@/data/cards";
import { ContactCard, cardMetadata } from "@/components/ContactCard";

export const metadata = cardMetadata(CARDS.jamie);

export default function JamieCard() {
  return <ContactCard card={CARDS.jamie} />;
}
