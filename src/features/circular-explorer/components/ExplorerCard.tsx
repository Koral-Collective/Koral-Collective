"use client";

import Link from "next/link";

import type { Experience } from "@/content/types";

type ExplorerCardProps = {
  experience: Experience;
  activeIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
};

export function ExplorerCard({
  experience,
  activeIndex,
  total,
  onPrevious,
  onNext,
  onSelectIndex,
}: ExplorerCardProps) {
  return (
    <article className="flex min-h-[480px] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]">
      {/* Image placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#d9c9b2]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_35%),linear-gradient(135deg,#dfd0ba,#cdb99d)]" />

        <div className="absolute inset-0 opacity-30">
          <svg
            viewBox="0 0 400 250"
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M0 190C65 140 90 165 145 125C210 78 260 130 320 80C350 55 380 60 400 35V250H0Z"
              fill="#8f765c"
            />

            <path
              d="M0 215C65 180 105 195 165 165C225 135 270 170 330 130C360 112 380 116 400 100"
              fill="none"
              stroke="#f3e8d2"
              strokeWidth="3"
              strokeDasharray="7 8"
            />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#6b3428]">
              Trail image
            </p>

            <p className="mt-2 font-serif text-2xl text-[#34241e]">
              Coming soon
            </p>
          </div>
        </div>

        <span className="absolute right-4 top-4 rounded-sm bg-[#f3e8d2]/90 px-2.5 py-1 text-[10px] font-semibold text-[#6b3428]">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div>
          <h2 className="font-serif text-3xl leading-tight text-[var(--color-text-primary)]">
            {experience.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-text-muted)]">
            {experience.duration ? (
              <>
                <span>{experience.duration}</span>
                <span aria-hidden="true">|</span>
              </>
            ) : null}

            {experience.format ? (
              <span>{experience.format}</span>
            ) : null}
          </div>

          <p className="mt-6 text-base leading-relaxed text-[var(--color-text-muted)]">
            {experience.description}
          </p>

          {experience.highlights.length > 0 ? (
            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">
                Along the trail
              </p>

              <ul className="mt-3 space-y-2">
                {experience.highlights.slice(0, 4).map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2 text-base leading-relaxed text-[var(--color-text-muted)]"
                  >
                    <span
                      className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand-primary)]"
                      aria-hidden="true"
                    />

                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-7">
          <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border-subtle)] pt-5">
            <Link
              href={`/experiences/${experience.slug}`}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-primary)] underline underline-offset-4"
            >
              Explore trail →
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrevious}
                aria-label="Previous trail"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-brand-primary)] transition-colors hover:bg-[var(--color-brand-primary)] hover:text-[var(--color-text-inverse)]"
              >
                ←
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {Array.from({ length: total }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onSelectIndex(index)}
                    aria-label={`Go to trail ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className="flex h-5 w-5 items-center justify-center"
                  >
                    <span
                      className={`block rounded-full transition-all ${index === activeIndex
                          ? "h-2 w-2 bg-[var(--color-brand-primary)]"
                          : "h-1.5 w-1.5 bg-[var(--color-border-strong)]"
                        }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={onNext}
                aria-label="Next trail"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-brand-primary)] transition-colors hover:bg-[var(--color-brand-primary)] hover:text-[var(--color-text-inverse)]"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
