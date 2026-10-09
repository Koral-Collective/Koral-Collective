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
            className="mx-auto w-full max-w-[20rem] self-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3e8d2] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-brand-primary)] lg:justify-self-end"
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

function EventDetails() {
  return (
    <section aria-labelledby="event-details-heading">
      <h3
        id="event-details-heading"
        className="font-sans text-2xl font-bold text-[#f3e8d2] sm:text-3xl"
      >
        Event details
      </h3>
      <div className="mt-6 space-y-5">
        <div>
          <p className="font-sans text-lg font-semibold text-[#f3e8d2] sm:text-xl">
            Oct 11th 2026
          </p>
          <p className="mt-2 font-sans text-base leading-relaxed text-[#d8c09e] sm:text-lg">
            8:30 am - 2:30 pm
          </p>
        </div>
        <p className="font-sans text-base leading-relaxed text-[#d8c09e] sm:text-lg">
          Walk lead: Shravya Hegde, architect and photographer
        </p>
        <div>
          <p className="font-sans text-lg font-semibold text-[#f3e8d2] sm:text-xl">
            Rs 5000 per person
          </p>
          <p className="mt-2 font-sans text-base leading-relaxed text-[#d8c09e] sm:text-lg">
            (inclusive of transportation and food)
          </p>
        </div>
      </div>
    </section>
  );
}
