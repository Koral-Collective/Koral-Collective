type OfferingControlsProps = {
  activeIndex: number;
  count: number;
  onSelect: (index: number) => void;
};

export function OfferingControls({ activeIndex, count, onSelect }: OfferingControlsProps) {
  const selectRelative = (direction: -1 | 1) => {
    onSelect((activeIndex + direction + count) % count);
  };

  return (
    <div className="mt-8 flex items-center justify-between gap-4 pt-5">
      <button
        type="button"
        onClick={() => selectRelative(-1)}
        aria-label="Previous trail"
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
          <path d="M19 12H5m6-6-6 6 6 6" />
        </svg>
      </button>
      <div className="flex items-center gap-2" aria-label="Choose a trail">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Show trail ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-2.5 rounded-full border border-[var(--color-brand-primary)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 ${
              index === activeIndex
                ? "w-8 bg-[var(--color-brand-primary)]"
                : "w-2.5 bg-transparent opacity-45 hover:opacity-100"
            }`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => selectRelative(1)}
        aria-label="Next trail"
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
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
