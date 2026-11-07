"use client";

import { useMemo } from "react";
import Image from "next/image";

import type { Experience } from "@/content/types";
import { cn } from "@/lib/cn";
import { ExplorerCard } from "./ExplorerCard";

type ExplorerStageProps = {
  experiences: Experience[];
  activeCardIndex: number;
  onSelectIndex: (index: number) => void;
};

export function ExplorerStage({
  experiences,
  activeCardIndex,
  onSelectIndex,
}: ExplorerStageProps) {
  const activeExperience = experiences[activeCardIndex] ?? experiences[0];

  const mapConnections = useMemo(() => {
    if (experiences.length < 2) return "";

    return experiences
      .map((experience, index) => {
        const next = experiences[(index + 1) % experiences.length];

        if (!experience.map || !next.map) return "";

        return `${experience.map.x},${experience.map.y} ${next.map.x},${next.map.y}`;
      })
      .filter(Boolean)
      .join(" ");
  }, [experiences]);

  if (!activeExperience) {
    return (
      <section className="py-20 text-center">
        <p className="text-base text-[var(--color-text-muted)]">
          Experiences coming soon.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="trail-explorer-heading"
      className="mt-10 sm:mt-14"
    >
      <div className="sr-only">
        <h2 id="trail-explorer-heading">Explore our walking trails</h2>
      </div>

      {/* Main map + detail */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:items-stretch">
        {/* MAP */}
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[#e8dfc8]">
          <div className="relative aspect-[4/3] min-h-[480px] overflow-hidden sm:min-h-[560px]">
            {/* Illustrated paper background */}
            <div className="absolute inset-0 bg-[#e8dfc8]" />

            {/* Decorative landscape layers */}
            <svg
              viewBox="0 0 100 75"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {/* sea */}
              <path
                d="M0 0H18C15 10 19 18 14 28C10 37 17 48 11 57C8 64 12 70 15 75H0Z"
                fill="#a9b8ad"
                opacity="0.72"
              />

              {/* northern hills */}
              <path
                d="M15 21C25 11 33 17 41 12C51 6 61 14 72 10C82 7 91 12 100 7V0H15Z"
                fill="#c8c5a7"
                opacity="0.7"
              />

              {/* western ghats */}
              <path
                d="M68 0C75 11 72 18 82 25C88 30 84 39 94 47C97 50 99 55 100 58V0Z"
                fill="#b4b395"
                opacity="0.78"
              />

              <path
                d="M72 4L76 14L80 8L84 19L89 10L94 24L100 12V0H72Z"
                fill="#99977c"
                opacity="0.45"
              />

              {/* rivers */}
              <path
                d="M58 -2C54 10 59 17 54 27C50 36 54 42 48 51C44 58 45 67 40 78"
                fill="none"
                stroke="#839e9b"
                strokeWidth="0.65"
                opacity="0.7"
              />

              <path
                d="M73 5C68 17 72 24 67 34C64 41 66 50 60 59C56 65 58 70 55 77"
                fill="none"
                stroke="#91a7a0"
                strokeWidth="0.4"
                opacity="0.6"
              />

              {/* route */}
              {mapConnections ? (
                <polyline
                  points={mapConnections}
                  fill="none"
                  stroke="#a66a4d"
                  strokeWidth="0.45"
                  strokeDasharray="1.5 1.5"
                  opacity="0.45"
                />
              ) : null}

              {/* subtle terrain */}
              <path
                d="M15 65C28 58 38 63 47 59C56 55 64 61 74 56C83 51 92 57 100 53V75H15Z"
                fill="#c7b98e"
                opacity="0.24"
              />
            </svg>

            {/* Map title */}
            <div className="absolute left-6 top-6 z-20 sm:left-8 sm:top-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b3428]">
                Tulunadu
              </p>

              <p className="mt-1 font-serif text-xl text-[#34241e] sm:text-2xl">
                Walking trails
              </p>
            </div>

            {/* Compass */}
            <div
              className="absolute bottom-6 left-6 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-[#806b51]/40 bg-[#e8dfc8]/80 backdrop-blur-sm"
              aria-hidden="true"
            >
              <div className="relative h-10 w-10">
                <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[8px] font-semibold text-[#5b4538]">
                  N
                </span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] text-[#5b4538]">
                  S
                </span>

                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[8px] text-[#5b4538]">
                  W
                </span>

                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] text-[#5b4538]">
                  E
                </span>

                <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#6b3428]" />
                <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[#6b3428]" />
              </div>
            </div>

            {/* Location markers */}
            {experiences.map((experience, index) => {
              if (!experience.map) return null;

              const isActive = index === activeCardIndex;

              return (
                <button
                  key={experience.id}
                  type="button"
                  onMouseEnter={() => onSelectIndex(index)}
                  onFocus={() => onSelectIndex(index)}
                  onClick={() => onSelectIndex(index)}
                  aria-label={`Explore ${experience.title}`}
                  aria-pressed={isActive}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2 outline-none"
                  style={{
                    left: `${experience.map.x}%`,
                    top: `${experience.map.y}%`,
                  }}
                >
                  <span
                    className={cn(
                      "relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-12 sm:w-12",
                      isActive
                        ? "scale-125 border-[#f3e8d2] bg-[#6b3028] shadow-[0_0_0_6px_rgba(107,48,40,0.16),0_8px_18px_rgba(53,34,27,0.2)]"
                        : "border-[#6b3028]/80 bg-[#6b3028] shadow-[0_4px_12px_rgba(53,34,27,0.15)] hover:scale-110",
                    )}
                  >
                    {experience.map.icon ? (
                      <Image
                        src={experience.map.icon}
                        alt=""
                        width={42}
                        height={42}
                        className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                      />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-[#f3e8d2]" />
                    )}

                    <span
                      className={cn(
                        "absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-sm px-2.5 py-1 font-serif text-xs transition-all",
                        isActive
                          ? "bg-[#f3e8d2] text-[#34241e] shadow-sm"
                          : "bg-[#34241e]/90 text-[#f3e8d2] opacity-0 group-hover:opacity-100",
                      )}
                    >
                      {experience.map.label ?? experience.title}
                    </span>
                  </span>
                </button>
              );
            })}

            {/* Active location label */}
            <div className="absolute bottom-6 right-6 z-20 max-w-[12rem] rounded-sm border border-[#806b51]/30 bg-[#f3e8d2]/90 px-4 py-3 shadow-sm backdrop-blur-sm">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8a553e]">
                Selected trail
              </p>

              <p className="mt-1 font-serif text-lg text-[#34241e]">
                {activeExperience.title}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT DETAIL CARD */}
        <ExplorerCard
          experience={activeExperience}
          activeIndex={activeCardIndex}
          total={experiences.length}
          onPrevious={() =>
            onSelectIndex(
              activeCardIndex <= 0
                ? experiences.length - 1
                : activeCardIndex - 1,
            )
          }
          onNext={() =>
            onSelectIndex(
              activeCardIndex >= experiences.length - 1
                ? 0
                : activeCardIndex + 1,
            )
          }
          onSelectIndex={onSelectIndex}
        />
      </div>

      {/* TRAIL INDEX */}
      <div className="mt-10 border-y border-[var(--color-border-subtle)]">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-1 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-primary)]">
              Explore
            </p>

            <h2 className="mt-1 font-serif text-2xl text-[var(--color-text-primary)]">
              The trails
            </h2>
          </div>

          <span className="text-xs text-[var(--color-text-muted)]">
            {String(experiences.length).padStart(2, "0")} trails
          </span>
        </div>

        <div className="grid md:grid-cols-2">
          {experiences.map((experience, index) => {
            const isActive = index === activeCardIndex;

            return (
              <button
                key={experience.id}
                type="button"
                onMouseEnter={() => onSelectIndex(index)}
                onFocus={() => onSelectIndex(index)}
                onClick={() => onSelectIndex(index)}
                className={cn(
                  "group grid min-h-[76px] grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-[var(--color-border-subtle)] px-2 py-4 text-left transition-colors md:px-4",
                  index % 2 === 0
                    ? "md:border-r"
                    : "",
                  isActive
                    ? "bg-[var(--color-bg-subtle)]"
                    : "hover:bg-[var(--color-bg-subtle)]",
                )}
              >
                <span
                  className={cn(
                    "text-xs font-medium",
                    isActive
                      ? "text-[var(--color-brand-primary)]"
                      : "text-[var(--color-text-subtle)]",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>
                  <span
                    className={cn(
                      "block font-serif text-lg transition-colors",
                      isActive
                        ? "text-[var(--color-brand-primary)]"
                        : "text-[var(--color-text-primary)]",
                    )}
                  >
                    {experience.title}
                  </span>

                  {experience.duration ? (
                    <span className="mt-1 block text-xs text-[var(--color-text-muted)]">
                      {experience.duration}
                    </span>
                  ) : null}
                </span>

                <span
                  className={cn(
                    "text-xl transition-transform",
                    isActive
                      ? "translate-x-1 text-[var(--color-brand-primary)]"
                      : "text-[var(--color-text-subtle)] group-hover:translate-x-1",
                  )}
                >
                  →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
