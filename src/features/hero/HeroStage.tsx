"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroStage() {
  return (
    <div className="relative flex w-full flex-col justify-center overflow-hidden bg-[var(--color-bg-base)] md:pt-0">

      {/* Mobile artwork preserves its full vertical composition. */}
      <div className="relative z-0 w-full leading-none md:hidden">
        <Image
          src="/images/tulunadu-mobile-hero.png"
          alt=""
          width={928}
          height={1695}
          className="block h-auto w-full"
          priority
          aria-hidden="true"
        />
      </div>

      {/* Desktop banner is a pre-cropped derivative of the original artwork.
          It preserves the full width and lower landscape without CSS cropping. */}
      <div className="relative z-0 hidden w-full leading-none md:block">
        <Image
          src="/images/tulunadu-desktop-hero-banner.png"
          alt=""
          sizes="100vw"
          width={1996}
          height={754}
          className="block h-auto w-full"
          priority
          aria-hidden="true"
        />
      </div>

      {/* Primary hero content */}
      <div className="absolute inset-x-0 top-[29%] z-10 flex items-start px-4 md:top-[clamp(9rem,18vw,13rem)] md:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-7xl md:py-0">
          <div className="max-w-2xl space-y-4 md:space-y-5 lg:max-w-[52rem] lg:space-y-6">
            <div>
              <h1 className="max-w-[43rem] font-serif font-semibold text-[#160d08] [text-shadow:0_1px_0_rgba(247,237,219,0.8)] lg:max-w-[52rem]">
                Walk the textures of Tulunadu threaded through time
              </h1>
              <p className="mt-2 max-w-2xl font-sans text-base font-medium leading-[1.3] text-[#28150d] md:mt-4 md:max-w-[38rem] md:leading-relaxed lg:mt-5">
                For those who travel in unhurried grace, the koral collective invites you to experience a Tulunadu rarely seen, through immersive walking tours led by historians, archaeologists, and architects.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              <Link
                href="/team"
                className="inline-flex items-center border border-[#5A3828] px-3 py-2 font-sans text-sm font-medium tracking-wide text-[#5A3828] transition-colors hover:bg-[#5A3828] hover:text-[#f7f1e3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A3828] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:px-6 md:py-2.5"
              >
                About us
              </Link>
              <Link
                href="/offerings"
                className="inline-flex items-center bg-[#5A3828] px-3 py-2 font-sans text-sm font-medium tracking-wide text-[#f7f1e3] transition-colors hover:bg-[#f7f1e3] hover:text-[#5A3828] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A3828] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:px-6 md:py-2.5"
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
