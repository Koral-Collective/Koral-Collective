import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { getSiteConfig } from "@/content";

import { FootstepTrail } from "./FootstepTrail";

export function WalkWithUs() {
  const siteConfig = getSiteConfig();
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.phoneE164}`;

  return (
    <Section
      as="section"
      aria-labelledby="walk-with-us-heading"
      className="border-b border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] py-14 text-[var(--color-text-inverse)] sm:py-18 lg:py-24"
    >
      <FootstepTrail>
        <div className="relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <h2
              id="walk-with-us-heading"
              className="text-5xl font-serif font-medium leading-none text-[#f3e8d2] sm:text-6xl lg:text-7xl"
            >
              Walk with us
            </h2>

            <div className="mt-12 sm:mt-14">
              <EventDetails />
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto w-full max-w-[20rem] self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3e8d2] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-brand-primary)] lg:sticky lg:top-24 lg:justify-self-end"
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
            <p className="mt-5 text-center font-sans text-base leading-snug text-[#f3e8d2] sm:text-lg">
              Reach out for bookings and queries
            </p>
          </a>
        </div>
      </FootstepTrail>
    </Section>
  );
}

type WalkEvent = {
  date: string;
  trail: string;
  lead: string;
  time: string;
  price?: string;
  soldOut?: boolean;
};

const WALK_EVENTS: WalkEvent[] = [
  {
    date: "Oct 18th, Sunday",
    trail: "Ratha Beedi trail",
    lead: "architect Sharvani",
    time: "4:30 - 6:30 pm",
    price: "Rs 1600 per person",
  },
  {
    date: "Oct 19th, Monday",
    trail: "Ratha Beedi trail",
    lead: "architect Sharvani",
    time: "7:00 - 9:00 am",
    soldOut: true,
  },
  {
    date: "Oct 25th, Sunday",
    trail: "Basrur trail",
    lead: "architect and photographer Shravya",
    time: "8:30 am - 2:30 pm",
    price: "Rs 5000 per person",
  },
  {
    date: "Oct 30th, Friday",
    trail: "Kallianpur trail",
    lead: "archeologist T Murugeshi and historian Shreyas",
    time: "7:00 - 9:00 am",
    price: "Rs 1600 per person",
  },
  {
    date: "Oct 30th, Friday",
    trail: "Barkur trail",
    lead: "architect and photographer Shravya",
    time: "8:30 am - 2:30 pm",
    soldOut: true,
  },
];

function EventDetails() {
  return (
    <section aria-labelledby="event-details-heading">
      <h3
        id="event-details-heading"
        className="font-sans text-2xl font-bold text-[#f3e8d2] sm:text-3xl"
      >
        Event details
      </h3>
      <ul className="mt-6 space-y-8">
        {WALK_EVENTS.map((event) => (
          <li
            key={`${event.date}-${event.trail}`}
            className={event.soldOut ? "opacity-80" : undefined}
          >
            <p className="font-sans text-lg font-semibold text-[#f3e8d2] sm:text-xl">
              {event.date}
            </p>
            <p className="mt-2 font-sans text-base leading-relaxed text-[#f3e8d2] sm:text-lg">
              {event.trail}, led by {event.lead}
            </p>
            <p className="mt-1 font-sans text-base leading-relaxed text-[#d8c09e] sm:text-lg">
              {event.time}
            </p>
            {event.soldOut ? (
              <p className="mt-2 inline-block border border-[#d8c09e] px-2 py-0.5 font-sans text-sm font-semibold uppercase tracking-wide text-[#d8c09e]">
                Sold out
              </p>
            ) : (
              <p className="mt-1 font-sans text-base font-semibold leading-relaxed text-[#f3e8d2] sm:text-lg">
                {event.price}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
