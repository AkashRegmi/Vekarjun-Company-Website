import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { company, navLinks } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-[var(--color-line)]"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(9,12,20,0.85)" : "transparent",
      }}
    >
      <nav
        className="mx-auto max-w-7xl px-6 lg:px-10 h-18 flex items-center justify-between"
        style={{ height: "72px" }}
      >
        <a href="/#home" className="flex flex-col shrink-0 leading-none">
          <span className="font-display text-xl font-semibold tracking-tight text-[var(--color-paper)]">
            {company.name}
          </span>

          <span className="mt-1 text-[9px] font-medium tracking-[0.18em] text-[var(--color-paper)]/70">
            {company.subtitle}
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={`/${link.href}`}
                className="text-sm text-[var(--color-mist)] hover:text-[var(--color-paper)] transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] text-white text-sm font-medium px-5 py-2.5 hover:bg-[var(--color-blue-soft)] transition-colors duration-200"
        >
          Let's Talk <span aria-hidden="true">→</span>
        </a>

        <button
          className="lg:hidden text-[var(--color-paper)] p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-[var(--color-ink)] border-t border-[var(--color-line)] px-6 py-8">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={`/${link.href}`}
                  onClick={() => setOpen(false)}
                  className="text-lg text-[var(--color-paper)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 w-full rounded-full bg-[var(--color-blue)] text-white text-sm font-medium px-5 py-3"
          >
            Let's Talk <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </header>
  );
}
