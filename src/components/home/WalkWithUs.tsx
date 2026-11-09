import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/content";
import { getPublishedEvents } from "@/lib/events";

import { FootstepTrail } from "./FootstepTrail";

export async function WalkWithUs() {
  const siteConfig = getSiteConfig();
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.phoneE164}`;
  const events = await getPublishedEvents();

  return (
    <Section
      as="section"
      aria-labelledby="walk-with-us-heading"
      className="border-b border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] py-14 text-[var(--color-text-inverse)] sm:py-18 lg:py-24"
    >
      <FootstepTrail>
        <div className="relative z-10">
          <h2
            id="walk-with-us-heading"
            className="text-5xl font-serif font-medium leading-none text-[#f3e8d2] sm:text-6xl lg:text-7xl"
          >
            Walk with us
          </h2>

          <div className="mt-12 grid gap-12 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-16 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <EventDetails events={events} />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto w-full max-w-[20rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3e8d2] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-brand-primary)] lg:sticky lg:top-24 lg:justify-self-end"
              aria-label="Connect with the koral collective on WhatsApp"
            >
              <div className="aspect-square w-full bg-[#f3e8d2] p-3">
                <Image
                  src="/images/branding/whatsapp-qr.png"
                  alt="Scan to connect with the koral collective on WhatsApp"
                  width={520}
                  height={520}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
             <p className="mt-5 text-center font-sans text-base font-normal leading-snug text-[#f3e8d2] sm:text-lg">
              <span className="underline underline-offset-4">Contact us</span>
              <span aria-hidden="true">↗</span>
            </p>
            </a>
          </div>
        </div>
      </FootstepTrail>
    </Section>
  );
}

type PublishedEvent = Awaited<ReturnType<typeof getPublishedEvents>>[number];

function formatEventDate(value: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    weekday: "long",
    timeZone: "Asia/Kolkata",
  }).formatToParts(value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  const suffix = day % 100 >= 11 && day % 100 <= 13
    ? "th"
    : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[day] ?? "th";
  const month = parts.find((part) => part.type === "month")?.value;
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  return `${month} ${day}${suffix}, ${weekday}`;
}

function formatEventTime(value: string) {
  const [hourText, minute] = value.split(":");
  const hour = Number(hourText);
  return `${hour % 12 || 12}:${minute} ${hour >= 12 ? "pm" : "am"}`;
}

function EventDetails({ events }: { events: PublishedEvent[] }) {
  return (
    <section aria-labelledby="event-details-heading">
      <h3
        id="event-details-heading"
        className="font-sans text-2xl font-bold text-[#f3e8d2] sm:text-3xl"
      >
        Event details
      </h3>
      {events.length === 0 ? (
        <p className="mt-6 text-base leading-relaxed text-[#f3e8d2]">New event dates will be announced soon.</p>
      ) : null}
      <ul className="mt-6 space-y-8">
        {events.map((event) => (
          <li key={event.id}>
            <p className="font-sans text-lg font-semibold text-[#f3e8d2] sm:text-xl">
              {formatEventDate(event.eventDate)}
            </p>
            <p className="mt-2 font-sans text-base leading-relaxed text-[#f3e8d2] sm:text-lg">
              {event.title} · {event.trail}, led by {event.guide}
            </p>
            <p className="mt-1 font-sans text-base leading-relaxed text-[#d8c09e] sm:text-lg">
              {formatEventTime(event.startTime)} - {formatEventTime(event.endTime)}
            </p>
            <p className="mt-1 font-sans text-base font-semibold leading-relaxed text-[#f3e8d2] sm:text-lg">
              ₹{event.indianPrice.toLocaleString("en-IN")} per person (Indian nationals), ₹{event.foreignPrice.toLocaleString("en-IN")} per person (Foreign nationals)
            </p>
            {event.description ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#d8c09e]">{event.description}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
