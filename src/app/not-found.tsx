import Link from "next/link";
import { Wave } from "@/components/Wave";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-32 text-center">
      <Wave bars={32} className="h-16 w-64 text-bone/30" />
      <h1 className="display mt-10 text-6xl sm:text-7xl">Nothing here but silence.</h1>
      <Link href="/" className="link-u mt-8 text-bone/80">Back to the studio</Link>
    </div>
  );
}
