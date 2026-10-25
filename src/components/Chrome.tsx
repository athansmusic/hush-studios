"use client";

import { usePathname } from "next/navigation";

/** Pages that stand alone, with no header, footer or player (contact cards). */
const BARE = ["/athan", "/jamie"];

/** Renders the site's chrome everywhere except the bare pages. */
export function Chrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (BARE.some((p) => path === p || path.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
