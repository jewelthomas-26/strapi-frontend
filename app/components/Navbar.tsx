import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Career" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#0E1116]/[0.06] bg-[#F5F3EE]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-bold tracking-tight text-[#0E1116]"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[#C8FF4D] transition group-hover:scale-125" />
          MyBlog
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-[#0E1116]/60 transition hover:text-[#0E1116]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#0E1116] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}