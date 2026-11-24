import { cn } from "@/lib/cn";

type CarouselArrowsProps = {
  activeIndex: number;
  count: number;
  onSelect: (index: number) => void;
  itemLabel: string;
  className?: string;
};

/** Circular previous/next controls with wrap-around selection. */
export function CarouselArrows({
  activeIndex,
  count,
  onSelect,
  itemLabel,
  className,
}: CarouselArrowsProps) {
  const go = (direction: -1 | 1) => {
    onSelect((activeIndex + direction + count) % count);
  };

  return (
    <div className={cn("flex shrink-0 items-center gap-3", className)}>
      {(["previous", "next"] as const).map((direction) => (
        <button
          key={direction}
          type="button"
          onClick={() => go(direction === "previous" ? -1 : 1)}
          aria-label={`${direction === "previous" ? "Previous" : "Next"} ${itemLabel}`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] text-[var(--color-brand-primary)] transition-colors hover:bg-[var(--color-brand-primary)] hover:text-[var(--color-text-inverse)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 sm:h-9 sm:w-9"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {direction === "previous" ? (
              <path d="M19 12H5m6-6-6 6 6 6" />
            ) : (
              <path d="M5 12h14m-6-6 6 6-6 6" />
            )}
          </svg>
        </button>
      ))}
    </div>
  );
}
