import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0E1116] text-white/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="inline-block h-2 w-2 rounded-full bg-[#C8FF4D]" />
            MyBlog
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6">
            Discover articles, tutorials, and insights about web development,
            design, and technology.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
            Quick Links
          </h3>

          <ul className="space-y-2.5 text-sm">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-[#C8FF4D]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
            Contact
          </h3>

          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="mailto:hello@myblog.com"
                className="transition hover:text-[#C8FF4D]"
              >
                hello@myblog.com
              </a>
            </li>
            <li>
              <a
                href="tel:+15551234567"
                className="transition hover:text-[#C8FF4D]"
              >
                +1 (555) 123-4567
              </a>
            </li>
            <li>New York, USA</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.08] py-5 text-center text-xs text-white/30">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
}