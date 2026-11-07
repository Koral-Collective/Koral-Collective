"use client";

import { useEffect, useState } from "react";

type Trail = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  description: string;
  highlights: string[];
  leader: string;
  duration: string;
  price: string;
  x: number;
  y: number;
  symbol: string;
};

const trails: Trail[] = [
  {
    id: "ratha-beedi",
    number: "01",
    name: "Ratha Beedi Trail",
    shortName: "Ratha Beedi",
    description:
      "From sacred chariot route to vibrant bazaar to living record of a town in motion, Ratha Beedi—the historic Car Street encircling Krishna Matha—is Udupi’s most storied thoroughfare of faith, commerce, and everyday life.",
    highlights: [
      "Krishna Temple complex",
      "Ritual life of the temple square",
      "Evolving streetscape of Ratha Beedi",
      "Generations of shops and eateries",
      "Historic buildings and facades",
    ],
    leader: "Sharvani",
    duration: "Approx. 90 mins",
    price: "Contact for pricing",
    x: 31,
    y: 43,
    symbol: "✦",
  },
  {
    id: "kallianpur",
    number: "02",
    name: "Kallianpur Trail",
    shortName: "Kallianpur",
    description:
      "From ancient coastal settlement to Portuguese outpost to modern town, Kallianpur carries layers of maritime, religious, architectural, and everyday history within a remarkably compact landscape.",
    highlights: [
      "Historic settlement landscape",
      "Portuguese-era traces",
      "Coastal heritage",
      "Religious and architectural landmarks",
      "Stories of everyday Kallianpur",
    ],
    leader: "the koral collective",
    duration: "Approx. 90 mins",
    price: "Contact for pricing",
    x: 25,
    y: 34,
    symbol: "◇",
  },
  {
    id: "kallianpur-historical",
    number: "03",
    name: "Kallianpur Historical Trail",
    shortName: "Kallianpur Historical",
    description:
      "A deeper journey through Kallianpur’s long historical arc, tracing its transformation from an ancient settlement through successive cultural and political influences.",
    highlights: [
      "Ancient settlement history",
      "Archaeological traces",
      "Colonial encounters",
      "Historic structures",
      "Layers of cultural memory",
    ],
    leader: "the koral collective",
    duration: "Approx. 2 hrs",
    price: "Contact for pricing",
    x: 21,
    y: 39,
    symbol: "○",
  },
  {
    id: "barkur",
    number: "04",
    name: "Barkur Trail",
    shortName: "Barkur",
    description:
      "Historically known as Barakanur, Barkur is an ancient settlement on the banks of the River Seetha that served as the grand capital of the Alupa dynasty for over 400 years.",
    highlights: [
      "Ancient Alupa capital",
      "River Seetha landscape",
      "Historic merchant quarters",
      "Temple architecture",
      "Layers of maritime trade",
    ],
    leader: "the koral collective",
    duration: "Approx. 2 hrs",
    price: "Contact for pricing",
    x: 39,
    y: 47,
    symbol: "△",
  },
  {
    id: "basrur",
    number: "05",
    name: "Basrur Trail",
    shortName: "Basrur",
    description:
      "Historically known as Vasupura or Barcelore in Portuguese records, Basrur is a historic riverside village on the Varahi River that once reigned as one of the Kanara coast’s vital maritime trade hubs.",
    highlights: [
      "Varahi River landscape",
      "Historic trading quarters",
      "Maritime trade history",
      "Kathale Basadi complex",
      "Ancient shrines and structures",
    ],
    leader: "the koral collective",
    duration: "Approx. 2 hrs",
    price: "Contact for pricing",
    x: 49,
    y: 59,
    symbol: "□",
  },
  {
    id: "moodbidri",
    number: "06",
    name: "Moodbidri Trail",
    shortName: "Moodbidri",
    description:
      "Deriving its name from the eastern bamboo groves that once covered the region, Moodbidri is an ancient heritage town widely revered as the Jain Kashi of the South.",
    highlights: [
      "Saavira Kambada Basadi",
      "Historic Jain shrines",
      "Chowta-era heritage",
      "Ancient townscape",
      "Bamboo-grove landscape",
    ],
    leader: "the koral collective",
    duration: "Approx. 2 hrs",
    price: "Contact for pricing",
    x: 67,
    y: 68,
    symbol: "✧",
  },
];

export default function OfferingsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);

  const activeTrail = trails[activeIndex];

  useEffect(() => {
    document.title = "Our Offerings | the koral collective";
  }, []);

  const selectTrail = (index: number) => {
    setActiveIndex(index);
    setIsMobileListOpen(false);
  };

  const previousTrail = () => {
    setActiveIndex((current) =>
      current === 0 ? trails.length - 1 : current - 1,
    );
  };

  const nextTrail = () => {
    setActiveIndex((current) =>
      current === trails.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <main className="min-h-screen bg-[#f3e8d2] text-[#2e211b]">
      {/* -------------------------------------------------
          INTRO
      -------------------------------------------------- */}
      <section className="px-6 pb-12 pt-32 sm:pt-40 md:px-10 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-[#7c352f]">
            Our offerings
          </p>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              Curated walking trails
              <br />
              <span className="italic">across Tulunadu.</span>
            </h1>

            <p className="max-w-sm text-base leading-6 text-[#6d5547] md:pb-2">
              Walk through places where history, architecture, faith, food,
              trade and everyday life continue to shape the landscape.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          MAP + ACTIVE TRAIL
      -------------------------------------------------- */}
      <section className="border-y border-[#2e211b]/15">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[1.15fr_0.85fr]">
          {/* MAP */}
          <div className="relative min-h-[560px] overflow-hidden border-[#2e211b]/15 bg-[#e7d4b4] lg:border-r">
            {/* subtle map texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(46,33,27,.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(46,33,27,.08) 1px, transparent 1px)
                `,
                backgroundSize: "70px 70px",
              }}
            />

            {/* decorative geographic shapes */}
            <div className="absolute -left-20 top-20 h-72 w-72 rounded-full border border-[#6e7650]/20" />
            <div className="absolute left-20 top-32 h-80 w-80 rounded-[45%] border border-[#6e7650]/15" />
            <div className="absolute right-[-100px] bottom-[-100px] h-[400px] w-[400px] rounded-full border border-[#7c352f]/10" />

            {/* river-like paths */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 75"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 4 10 C 18 20, 12 30, 27 38 S 39 54, 55 55 S 77 46, 95 67"
                fill="none"
                stroke="#71805b"
                strokeWidth="0.7"
                strokeDasharray="2 2"
                opacity="0.45"
              />

              <path
                d="M 0 54 C 15 48, 25 61, 40 57 S 68 42, 100 49"
                fill="none"
                stroke="#8b6a4e"
                strokeWidth="0.45"
                opacity="0.35"
              />

              <path
                d="M 20 5 C 32 17, 41 19, 45 31 S 59 45, 70 72"
                fill="none"
                stroke="#7c352f"
                strokeWidth="0.35"
                strokeDasharray="1.5 2"
                opacity="0.3"
              />
            </svg>

            {/* map heading */}
            <div className="absolute left-6 top-6 md:left-10 md:top-10">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-[#7c352f]">
                Tulunadu
              </p>
              <p className="mt-1 font-serif text-2xl md:text-3xl">
                Walking trails
              </p>
            </div>

            {/* north indicator */}
            <div className="absolute right-6 top-6 flex flex-col items-center text-[9px] font-semibold tracking-[0.2em] text-[#2e211b]/50 md:right-10 md:top-10">
              <span className="text-sm">↑</span>
              <span>N</span>
            </div>

            {/* connection route */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 75"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {trails.slice(0, -1).map((trail, index) => {
                const next = trails[index + 1];

                return (
                  <line
                    key={`${trail.id}-route`}
                    x1={trail.x}
                    y1={(trail.y / 75) * 75}
                    x2={next.x}
                    y2={(next.y / 75) * 75}
                    stroke="#7c352f"
                    strokeWidth="0.28"
                    strokeDasharray="1 1.8"
                    opacity="0.3"
                  />
                );
              })}
            </svg>

            {/* markers */}
            {trails.map((trail, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={trail.id}
                  type="button"
                  onClick={() => selectTrail(index)}
                  aria-label={`View ${trail.name}`}
                  aria-pressed={active}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                  style={{
                    left: `${trail.x}%`,
                    top: `${trail.y}%`,
                  }}
                >
                  <span
                    className={[
                      "relative flex items-center justify-center rounded-full border transition-all duration-300",
                      active
                        ? "h-14 w-14 border-[#7c352f] bg-[#7c352f] text-[#f3e8d2] shadow-[0_8px_30px_rgba(124,53,47,.28)]"
                        : "h-10 w-10 border-[#2e211b]/40 bg-[#f3e8d2] text-[#7c352f] group-hover:h-12 group-hover:w-12 group-hover:border-[#7c352f]",
                    ].join(" ")}
                  >
                    <span className="font-serif text-lg">
                      {trail.symbol}
                    </span>

                    {active && (
                      <span className="absolute inset-[-7px] rounded-full border border-[#7c352f]/30 animate-pulse" />
                    )}
                  </span>

                  <span
                    className={[
                      "absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-[0.12em] transition-all",
                      active
                        ? "text-[#7c352f]"
                        : "text-[#2e211b]/60 group-hover:text-[#7c352f]",
                    ].join(" ")}
                  >
                    {trail.shortName}
                  </span>
                </button>
              );
            })}

            {/* map legend */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 text-[10px] tracking-[0.14em] text-[#2e211b]/50 md:bottom-10 md:left-10">
              <span className="h-2 w-2 rounded-full bg-[#7c352f]" />
              <span>Trail locations</span>
            </div>
          </div>

          {/* ACTIVE TRAIL */}
          <div className="flex min-h-[560px] flex-col bg-[#f3e8d2]">
            <div className="flex items-center justify-between border-b border-[#2e211b]/15 px-6 py-5 md:px-10">
                <span className="text-[10px] font-semibold tracking-[0.22em] text-[#7c352f]">
                Trail {activeTrail.number}
              </span>

              <span className="text-xs text-[#6d5547]">
                {activeIndex + 1} / {trails.length}
              </span>
            </div>

            <div className="flex flex-1 flex-col px-6 py-8 md:px-10 md:py-12">
              {/* pictogram */}
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#2e211b]/20 text-3xl text-[#7c352f]">
                {activeTrail.symbol}
              </div>

              <h2 className="max-w-xl font-serif text-4xl leading-[0.98] tracking-[-0.02em] md:text-6xl">
                {activeTrail.name}
              </h2>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs tracking-[0.12em] text-[#6d5547]">
                <span>{activeTrail.duration}</span>
                <span className="text-[#2e211b]/30">•</span>
                <span>{activeTrail.price}</span>
              </div>

              <p className="mt-8 max-w-xl text-base leading-7 text-[#59443a]">
                {activeTrail.description}
              </p>

              <div className="mt-8">
                <p className="mb-4 text-[10px] font-semibold tracking-[0.2em] text-[#7c352f]">
                  Highlights along the trail
                </p>

                <ul className="grid gap-2 sm:grid-cols-2">
                  {activeTrail.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 border-t border-[#2e211b]/10 pt-2 text-base leading-6 text-[#59443a]"
                    >
                      <span className="text-[#7c352f]">✦</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto border-t border-[#2e211b]/15 pt-6">
                <p className="text-[10px] tracking-[0.18em] text-[#6d5547]">
                  Walk led by
                </p>

                <p className="mt-2 font-serif text-xl">
                  {activeTrail.leader}
                </p>
              </div>
            </div>

            {/* controls */}
            <div className="border-t border-[#2e211b]/15 px-6 py-5 md:px-10">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={previousTrail}
                  className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#2e211b] transition-colors hover:text-[#7c352f]"
                >
                  <span className="text-lg">←</span>
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {trails.map((trail, index) => (
                    <button
                      key={trail.id}
                      type="button"
                      onClick={() => selectTrail(index)}
                      aria-label={`Go to ${trail.name}`}
                      aria-pressed={index === activeIndex}
                      className={[
                        "h-2 rounded-full transition-all duration-300",
                        index === activeIndex
                          ? "w-7 bg-[#7c352f]"
                          : "w-2 bg-[#2e211b]/25 hover:bg-[#2e211b]/50",
                      ].join(" ")}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextTrail}
                  className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#2e211b] transition-colors hover:text-[#7c352f]"
                >
                  Next
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          TRAIL INDEX
      -------------------------------------------------- */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold tracking-[0.24em] text-[#7c352f]">
                Explore the trails
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                Choose your walk.
              </h2>
            </div>

            <p className="max-w-md text-base leading-6 text-[#6d5547]">
              Select a trail from the index to move the map and featured
              experience together.
            </p>
          </div>

          <div className="hidden border-t border-[#2e211b]/20 md:block">
            {trails.map((trail, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={trail.id}
                  type="button"
                  onClick={() => selectTrail(index)}
                  className={[
                    "group grid w-full grid-cols-[80px_1fr_40px] items-center border-b border-[#2e211b]/15 py-6 text-left transition-all",
                    active
                      ? "px-4 bg-[#ead9bb]"
                      : "hover:bg-[#ead9bb]/60",
                  ].join(" ")}
                >
                  <span className="font-serif text-xl text-[#7c352f]/60">
                    {trail.number}
                  </span>

                  <span>
                    <span className="block font-serif text-2xl">
                      {trail.name}
                    </span>

                    <span className="mt-1 block text-xs tracking-[0.13em] text-[#6d5547]">
                      {trail.duration}
                    </span>
                  </span>

                  <span
                    className={[
                      "text-2xl transition-transform duration-300",
                      active
                        ? "translate-x-1 text-[#7c352f]"
                        : "text-[#2e211b]/50 group-hover:translate-x-1 group-hover:text-[#7c352f]",
                    ].join(" ")}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* mobile index */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileListOpen((value) => !value)}
              className="flex w-full items-center justify-between border-y border-[#2e211b]/20 py-5 text-left"
            >
              <span>
                  <span className="block text-[10px] tracking-[0.2em] text-[#7c352f]">
                  Selected trail
                </span>

                <span className="mt-1 block font-serif text-2xl">
                  {activeTrail.name}
                </span>
              </span>

              <span className="text-xl">
                {isMobileListOpen ? "−" : "+"}
              </span>
            </button>

            {isMobileListOpen && (
              <div className="border-b border-[#2e211b]/20">
                {trails.map((trail, index) => (
                  <button
                    key={trail.id}
                    type="button"
                    onClick={() => selectTrail(index)}
                    className={[
                      "flex w-full items-center justify-between border-t border-[#2e211b]/10 py-4 text-left",
                      index === activeIndex ? "text-[#7c352f]" : "",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-serif text-lg text-[#7c352f]/60">
                        {trail.number}
                      </span>

                      <span className="font-serif text-lg">
                        {trail.name}
                      </span>
                    </span>

                    <span>→</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          CLOSING CTA
      -------------------------------------------------- */}
      <section className="bg-[#2e211b] px-6 py-20 text-[#f3e8d2] md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-[#d7a35d]">
            Walk with us
          </p>

          <div className="mt-5 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
              Come curious.
              <br />
              Leave with a story.
            </h2>

            <a
              href="https://wa.me/919535196043"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-4 border border-[#f3e8d2]/30 px-6 py-4 text-xs font-semibold tracking-[0.16em] transition-colors hover:bg-[#f3e8d2] hover:text-[#2e211b]"
            >
              Chat on WhatsApp
              <span className="text-lg">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
