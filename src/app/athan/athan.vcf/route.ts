import { CARDS } from "@/data/cards";
import { vcardResponse } from "@/components/ContactCard";

export function GET() {
  return vcardResponse(CARDS.athan);
}
