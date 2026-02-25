"use client";

import { useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-8 py-5">
        <a href="#" className="text-sm font-semibold tracking-tight text-white">
          Aditya Hariharan
        </a>

        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white transition hover:text-white/70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="sm:hidden flex flex-col gap-1.5 cursor-pointer"
        >
          <span
            className={`block h-px w-5 bg-white transition-all duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-white transition-all duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 border-t border-white/10" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-8 py-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-white transition hover:text-white/70"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
