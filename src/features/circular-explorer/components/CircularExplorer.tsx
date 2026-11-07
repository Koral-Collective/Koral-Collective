"use client";

import { useCallback, useState } from "react";
import Link from "next/link";

import type { Experience, Offering } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { ExplorerStage } from "./ExplorerStage";

type CircularExplorerProps = {
  offering: Offering;
  experiences: Experience[];
};

export function CircularExplorer({
  offering,
  experiences,
}: CircularExplorerProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const safeActiveIndex =
    experiences.length === 0
      ? 0
      : Math.min(activeCardIndex, experiences.length - 1);

  const handleSelectIndex = useCallback(
    (index: number) => {
      if (experiences.length === 0) return;

      const nextIndex = Math.max(
        0,
        Math.min(index, experiences.length - 1),
      );

      setActiveCardIndex(nextIndex);
    },
    [experiences.length],
  );

  return (
    <main className="bg-[var(--color-bg-base)]">
      <Container size="wide" className="pb-10 pt-32 sm:pb-14 sm:pt-40 lg:pb-16">
        {/* Intro */}
        <header className="border-b border-[var(--color-border-subtle)] pb-8 sm:pb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-brand-primary)]"
            >
              ← Back to Home
            </Link>

            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">
              Our offerings
            </span>
          </div>

          <h1 className="mt-8 max-w-4xl font-serif text-4xl font-medium leading-[0.95] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
            {offering.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
            {offering.description}
          </p>
        </header>

        {/* Explorer */}
        <ExplorerStage
          experiences={experiences}
          activeCardIndex={safeActiveIndex}
          onSelectIndex={handleSelectIndex}
        />
      </Container>
    </main>
  );
}
