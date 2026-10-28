"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getNavItems } from "@/content";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navItems = getNavItems();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-colors duration-300",
        isHome && !scrolled && !mobileMenuOpen ? "bg-transparent" : "bg-[var(--color-bg-base)] shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
      )}
    >
      <Container size="full">
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300",
            scrolled ? "min-h-16 py-1" : "min-h-24 sm:min-h-32 py-2"
          )}
        >
          {/* Official Logo */}
          <Link
            href="/"
            className="flex min-w-0 flex-shrink flex-col items-start rounded-sm px-1 py-0.5 transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2"
            aria-label="Koral Collective — home"
          >
            <Image
              src="/images/branding/koral-collective-logo-transparent.png"
              alt="The Koral Collective"
              width={200}
              height={200}
              className={cn(
                "w-auto object-contain object-left-top transition-all duration-300",
                scrolled ? "h-12 sm:h-14" : "h-20 sm:h-[6.5rem]"
              )}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="ml-auto mr-8 hidden lg:mr-16 lg:block">
            <ul className="flex items-center gap-10 text-xl font-sans font-semibold">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const isWhatsApp = item.label === "Book via WhatsApp";
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center border-b border-transparent py-1 tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#022e01] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e3]",
                        isWhatsApp
                          ? "border-[#022e01] text-[#022e01] hover:border-[#022e01]"
                          : isActive
                            ? "border-[#022e01] text-[#022e01]"
                            : "text-[#022e01] hover:border-[#022e01]/60"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-md p-3 text-[#022e01] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#022e01] md:hidden",
              "hover:bg-[#022e01]/10"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
          >
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav id="mobile-menu" aria-label="Mobile main navigation" className="border-t border-[#022e01]/20 py-3 md:hidden">
            <ul className="flex flex-col space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block rounded-md px-4 py-3 text-lg font-sans font-semibold text-[#022e01] transition-colors",
                        isActive
                          ? "bg-[#022e01]/10"
                          : "hover:bg-[#022e01]/10"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
