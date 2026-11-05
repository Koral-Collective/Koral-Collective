"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroStage() {
  return (
    /*
     * Slim editorial banner.
     * Mobile  : min-height 68vw (sufficient for content on small screens)
     * Desktop : fixed 300px height
     * The hero image is positioned as an object-cover background so it
     * never distorts — only crops.
     */
    <div
      className="relative w-full overflow-hidden bg-[#c8b98f] md:h-[300px]"
      style={{ minHeight: "68vw" }}
    >
      {/* ── Mobile background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/tulunadu-mobile-hero.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
          aria-hidden="true"
        />
      </div>

      {/* ── Desktop background (300 px tall, full-width cover) ─────────── */}
      <div className="absolute inset-0 hidden md:block" style={{ minHeight: 300 }}>
        <Image
          src="/images/tulunadu-desktop-hero.png"
          alt=""
          fill
          className="object-cover object-[center_30%]"
          priority
          aria-hidden="true"
        />
      </div>

      {/* ── Gradient scrim for legibility ─────────────────────────────── */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#160d08]/55 via-[#160d08]/20 to-transparent"
        aria-hidden="true"
      />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex h-full flex-col justify-center px-4 py-10 sm:px-8 md:py-0 lg:px-16 xl:px-24"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-xl space-y-4 lg:max-w-2xl">
            <h1 className="type-h1 font-serif font-semibold leading-[1.08] text-[#f7eddb] [text-shadow:0_1px_3px_rgba(22,13,8,0.5)] md:text-[2.75rem] lg:text-[3rem]">
              Walk the textures of Tulunadu threaded through time
            </h1>
            <p className="type-body font-sans font-medium leading-relaxed text-[#f0e0c4] [text-shadow:0_1px_2px_rgba(22,13,8,0.4)] md:max-w-[34rem]">
              For those who travel in unhurried grace, the koral collective invites you to experience a Tulunadu rarely seen, through immersive walking tours led by historians, archaeologists, and architects.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 md:gap-3">
              <Link
                href="/team"
                className="inline-flex items-center border border-[#f0e0c4] px-4 py-2 font-sans text-sm font-medium tracking-wide text-[#f0e0c4] transition-colors hover:bg-[#f0e0c4] hover:text-[#5A3828] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0e0c4] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:px-6 md:py-2.5"
              >
                About us
              </Link>
              <Link
                href="/offerings"
                className="inline-flex items-center bg-[#5A3828] px-4 py-2 font-sans text-sm font-medium tracking-wide text-[#f7eddb] transition-colors hover:bg-[#f7eddb] hover:text-[#5A3828] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0e0c4] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:px-6 md:py-2.5"
              >
                Our offerings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

