"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { getAllExperiences } from "@/content";
import { OfferingControls } from "@/components/ui/OfferingControls";

const showcaseOrder = [
  "kallianpur",
  "barkur",
  "basrur",
  "ratha-beedi",
  "shirva",
  "moodbidri",
  "karkala",
];

export function OfferingShowcase() {
  const experiences = getAllExperiences().filter((experience) =>
    showcaseOrder.includes(experience.slug),
  ).sort(
    (first, second) =>
      showcaseOrder.indexOf(first.slug) - showcaseOrder.indexOf(second.slug),
  );
  const railRef = useRef<HTMLDivElement>(null);
  const programmaticScrollRef = useRef(false);
  const scrollSettleTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const finishProgrammaticScroll = () => {
      programmaticScrollRef.current = false;
      if (scrollSettleTimerRef.current !== null) {
        window.clearTimeout(scrollSettleTimerRef.current);
        scrollSettleTimerRef.current = null;
      }
    };

    rail.addEventListener("scrollend", finishProgrammaticScroll);
    return () => rail.removeEventListener("scrollend", finishProgrammaticScroll);
  }, []);

  const cancelProgrammaticScroll = () => {
    programmaticScrollRef.current = false;
    if (scrollSettleTimerRef.current !== null) {
      window.clearTimeout(scrollSettleTimerRef.current);
      scrollSettleTimerRef.current = null;
    }
  };

  const handleScroll = () => {
    const rail = railRef.current;
    if (!rail) return;

    if (programmaticScrollRef.current) {
      if (scrollSettleTimerRef.current !== null) {
        window.clearTimeout(scrollSettleTimerRef.current);
      }
      scrollSettleTimerRef.current = window.setTimeout(() => {
        programmaticScrollRef.current = false;
        scrollSettleTimerRef.current = null;
      }, 1000);
      return;
    }

    const center = rail.scrollLeft + rail.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(rail.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const childCenter = element.offsetLeft + element.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    const rail = railRef.current;
    const card = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !card) return;

    setActiveIndex(index);
    const left = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2;
    const maxLeft = rail.scrollWidth - rail.clientWidth;
    const targetLeft = Math.max(0, Math.min(maxLeft, left));

    if (Math.abs(targetLeft - rail.scrollLeft) < 1) {
      cancelProgrammaticScroll();
      return;
    }

    programmaticScrollRef.current = true;
    if (scrollSettleTimerRef.current !== null) {
      window.clearTimeout(scrollSettleTimerRef.current);
    }
    scrollSettleTimerRef.current = window.setTimeout(() => {
      programmaticScrollRef.current = false;
      scrollSettleTimerRef.current = null;
    }, 1000);
    rail.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (activeIndex + direction + experiences.length) % experiences.length;
    setActiveIndex(nextIndex);
    scrollToCard(nextIndex);
  };

  return (
    <section
      aria-labelledby="offering-showcase-heading"
      className="offerings-parchment overflow-hidden border-b border-[var(--color-border-subtle)] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
          <div>
            <h2
              id="offering-showcase-heading"
              className="max-w-xl font-serif text-4xl font-medium leading-none text-[var(--color-text-primary)] sm:text-5xl"
            >
              Our offerings
            </h2>
          </div>
        </div>

        <div
          ref={railRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          onTouchStart={cancelProgrammaticScroll}
          onWheel={cancelProgrammaticScroll}
          tabIndex={0}
          className="flex snap-x snap-mandatory items-end gap-4 overflow-x-auto overscroll-x-contain pb-8 pt-6 scrollbar-none sm:gap-6"
          aria-label="the koral collective offerings"
        >
          {experiences.map((experience, index) => (
            <Link
              key={experience.id}
              href={`/offerings?trail=${experience.slug}`}
              aria-label={`Explore ${experience.title} offering`}
              className={`group relative w-[72vw] max-w-[22rem] shrink-0 snap-center outline-none transition-transform duration-500 ease-out focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-4 sm:w-[18rem] lg:w-[20rem] ${
                index % 2 === 0 ? "-translate-y-3" : "translate-y-5"
              } ${activeIndex === index ? "scale-[1.02]" : "scale-95 opacity-75 hover:scale-[0.98] hover:opacity-100"}`}
            >
              <div className="aspect-[4/5] bg-[#4B3025] p-2 shadow-[8px_8px_0_rgba(90,56,40,0.12)] outline outline-2 outline-[#4B3025]">
                <div className="relative h-full w-full overflow-hidden">
                  {experience.image ? (
                    <Image
                      src={experience.image.src}
                      alt={experience.image.alt}
                      fill
                      sizes="(min-width: 1024px) 20rem, 72vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2e211b]/70 via-[#2e211b]/15 to-transparent p-5 pt-16">
                    <h3 className="font-serif text-3xl leading-none text-[#f3e8d2]">
                      {experience.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <OfferingControls activeIndex={activeIndex} count={experiences.length} onSelect={scrollToCard} />
      </div>
    </section>
  );
}
