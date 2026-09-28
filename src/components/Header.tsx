import Link from "next/link";

const NAV = [
  { label: "Shows", href: "/#shows" },
  { label: "Live", href: "/shows/frights-by-fire" },
  { label: "Studio", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-night/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2" aria-label="Hush Studios, home">
          <span className="display text-3xl leading-none">Hush</span>
          <span className="label hidden sm:inline group-hover:text-bone transition-colors">Studios</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-4 sm:gap-8 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-ash hover:text-bone transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
