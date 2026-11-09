export type EventInput = {
  title: string;
  trail: string;
  guide: string;
  eventDate: Date;
  startTime: string;
  endTime: string;
  indianPrice: number;
  foreignPrice: number;
  description: string | null;
  isPublished: boolean;
};

type ValidationResult = { value: EventInput; error?: never } | { value?: never; error: string };

export function validateEventInput(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "Provide an event object." };
  }

  const event = input as Record<string, unknown>;
  const title = typeof event.title === "string" ? event.title.trim() : "";
  const trail = typeof event.trail === "string" ? event.trail.trim() : "";
  const guide = typeof event.guide === "string" ? event.guide.trim() : "";
  const eventDate = typeof event.eventDate === "string" ? new Date(event.eventDate) : new Date(NaN);
  const startTime = typeof event.startTime === "string" ? event.startTime.trim() : "";
  const endTime = typeof event.endTime === "string" ? event.endTime.trim() : "";
  const indianPrice = event.indianPrice;
  const foreignPrice = event.foreignPrice;
  const description = event.description === null || event.description === undefined
    ? null
    : typeof event.description === "string" ? event.description.trim() || null : undefined;

  if (!title || title.length > 120) return { error: "Title is required and must be 120 characters or fewer." };
  if (!trail || trail.length > 120) return { error: "Trail is required and must be 120 characters or fewer." };
  if (!guide || guide.length > 120) return { error: "Guide is required and must be 120 characters or fewer." };
  if (Number.isNaN(eventDate.getTime())) return { error: "Enter a valid event date and time." };
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(startTime) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(endTime)) {
    return { error: "Start and end times must use 24-hour HH:MM format." };
  }
  if (!Number.isInteger(indianPrice) || (indianPrice as number) < 0) return { error: "Indian price must be a non-negative whole number." };
  if (!Number.isInteger(foreignPrice) || (foreignPrice as number) < 0) return { error: "Foreign price must be a non-negative whole number." };
  if (description === undefined || (description && description.length > 2000)) {
    return { error: "Description must be 2,000 characters or fewer." };
  }
  if (typeof event.isPublished !== "boolean") return { error: "Choose whether this event is published." };

  return {
    value: {
      title,
      trail,
      guide,
      eventDate,
      startTime,
      endTime,
      indianPrice: indianPrice as number,
      foreignPrice: foreignPrice as number,
      description,
      isPublished: event.isPublished,
    },
  };
}
