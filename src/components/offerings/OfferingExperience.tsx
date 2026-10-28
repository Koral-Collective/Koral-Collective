"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Section } from "@/components/ui/Section";
import { OfferingControls } from "@/components/ui/OfferingControls";
import { getAllExperiences } from "@/content";

type Trail = {
  name: string;
  duration: string;
  durationHours: 2 | 6;
  price: string;
  description: string;
  highlights: string[];
  note?: string;
  leader?: string;
  leaderHref?: string;
  pictogram: string;
  position: { left: string; top: string };
};

const trails: Trail[] = [
  {
    name: "Kallianpur",
    duration: "2 hours",
    durationHours: 2,
    price: "₹1600 or $25/per person",
    description: "From Neolithic settlement to Portuguese outpost to medieval shrine complex, Kallianpur weaves together five millennia of unbroken history, living faith, and royal inscription.",
    highlights: [
      "An early-historic stone deity of Hariti, a relic of long-lost Buddhist heritage",
      "Alupa-period temple pillars and shrine foundations",
      "A hero stone and a sati shrine",
      "Vasco da Gama and the Portuguese connection",
      "The Church of Nossa Senhora de Milagres",
    ],
    pictogram: "https://ik.imagekit.io/abr6j2ge8/map-icons/Kallianpur_with%20name.png?updatedAt=1791037663161",
    position: { left: "34%", top: "45%" },
  },
  {
    name: "Ratha Beedi",
    duration: "2 hours",
    durationHours: 2,
    price: "₹1600 or $25/per person",
    description: "From sacred chariot route to vibrant bazaar to living record of a town in motion, Ratha Beedi—the historic Car Street encircling Krishna Matha—is Udupi’s most storied thoroughfare of faith, commerce, and everyday life.",
    highlights: [
      "The Krishna Temple complex (Krishna Matha)",
      "The ritual life of the temple square",
      "The evolving streetscape of Ratha Beedi",
      "Generations of shops, eateries, and everyday practice",
      "The buildings and facades that hold the temple town’s memory",
    ],
    pictogram: "https://ik.imagekit.io/abr6j2ge8/map-icons/Rathabeedi_with%20name.png?updatedAt=1791037663165",
    position: { left: "34%", top: "56%" },
  },
  {
    name: "Barkur",
    duration: "6 hours",
    durationHours: 6,
    price: "₹5000 or $75/per person",
    description: "From Alupa dynasty capital to ancient global trading port to a jewel in the Vijayanagara empire, Barakanur—today's Barkur—is a heritage town of royal legacy, lost empires, and timeless stone architecture on the banks of the Seetha River.",
    highlights: [
      "Capital city for 400 years during the Alupa reign",
      "Global trade centre with connections to Rome and Greece",
      "The Ten Traditional Quarters",
      "The Legend of 365 Stone Temples",
      "The Jain Temple Complex (Kathale Basadi)",
    ],
    note: "*Transport by chartered bus is provided between stops. Walking is required at each location.",
    pictogram: "https://ik.imagekit.io/abr6j2ge8/map-icons/Barkur_with%20name.png?updatedAt=1791037663439",
    position: { left: "35%", top: "32%" },
  },
  {
    name: "Basrur",
    duration: "6 hours",
    durationHours: 6,
    price: "₹5000 or $75/per person",
    description: "From Vijayanagara trading port to colonial battleground to tranquil village on the banks of the Varahi River, Barcelore—known today as Basrur—is a historic hamlet of global trade, royal ambition, and enduring past.",
    highlights: [
      "Maritime trade hub connecting Arabia, China, Europe and coveted by the Portuguese, Dutch, and British",
      "Target of Chhatrapati Shivaji's historic first naval expedition",
      "The historic merchant quarters (Keris)",
      "The Shree Mahatobar Mahalingeshwara Temple",
    ],
    note: "*Transport by chartered bus is provided between stops. Walking is required at each location.",
    pictogram: "https://ik.imagekit.io/abr6j2ge8/map-icons/Basrur_with%20name.png?updatedAt=1791037662829",
    position: { left: "30%", top: "15%" },
  },
  {
    name: "Shirva",
    duration: "6 hours",
    durationHours: 6,
    price: "₹5000 or $75/per person",
    description: "From prehistoric megalith to medieval palace to land of the living folk epic, Shirva—the agrarian hinterland of Tulunadu—is a rarefied world of ancient ritual, enduring stone, and unbroken tradition.",
    highlights: [
      "The megalithic dolmen at Palli",
      "The Nadibettu Palace",
      "The picturesque landscape of Nandalike",
      "The setting of the Siri Paddana (folk epic)",
    ],
    note: "*Transport by chartered bus is provided between stops. Walking is required at each location.",
    pictogram: "https://ik.imagekit.io/abr6j2ge8/map-icons/Shirva_with%20name.png?updatedAt=1791037662884",
    position: { left: "45%", top: "68%" },
  },
  {
    name: "Moodbidri",
    duration: "6 hours",
    durationHours: 6,
    price: "₹5000 or $75/per person",
    description: "From age-old bamboo groves to the epicentre of Jainism to living heritage town, Moodbidri—the Jain Kashi of the South—is a site of sacred stone, royal patronage, and monolithic magnificence.",
    highlights: [
      "Royal legacy of the Alupas, the Vijayanagara empire, and the Chowta dynasty",
      "The 18 historic Jain shrines",
      "The Thousand Pillar Temple (The Saavira Kambada Basadi)",
      "Home to ancient literary traditions such as the Dhavala palm-leaf manuscripts",
    ],
    note: "*Transport by chartered bus is provided between stops. Walking is required at each location.",
    pictogram: "https://ik.imagekit.io/abr6j2ge8/map-icons/Moodbidri_with%20name.png?updatedAt=1791037662938",
    position: { left: "78%", top: "85%" },
  },
  {
    name: "Karkala",
    duration: "6 hours",
    durationHours: 6,
    price: "₹5000 or $75/per person",
    description: "From black granite capital to Jain pilgrimage centre to living monument of medieval stonecraft, Karikallu—today's Karkala—is a landmark of Jain culture, philosophy, and immutable artisan traditions.",
    highlights: [
      "Capital of the Bhairarasa Palegars",
      "The 42-foot monolithic statue of Lord Gommateshwara (Bahubali)",
      "The Four-Faced Temple (The Chaturmukha Basadi)",
      "The Shree Venkatramana Temple",
      "The bazaars dotted with shops run by GSB traders",
    ],
    note: "*Transport by chartered bus is provided between stops. Walking is required at each location.",
    pictogram: "https://ik.imagekit.io/abr6j2ge8/map-icons/Karkala_with%20name%20.png?updatedAt=1791037663011",
    position: { left: "75%", top: "60%" },
  },
];

export function OfferingExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTrail = trails[activeIndex];
  const activeTrailImage = getAllExperiences().find(
    (experience) => experience.title === activeTrail.name,
  )?.image;
  const selectTrail = (index: number) => setActiveIndex((index + trails.length) % trails.length);

  useEffect(() => {
    const requestedTrail = new URLSearchParams(window.location.search).get("trail");
    const requestedTrailIndex = trails.findIndex(
      (trail) => trail.name.toLowerCase().replaceAll(" ", "-") === requestedTrail,
    );

    if (requestedTrailIndex >= 0) {
      setActiveIndex(requestedTrailIndex);
    }
  }, []);

  return (
    <div className="offerings-parchment">
      <Section
        id="offerings"
        as="section"
        aria-labelledby="offerings-heading"
        className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-base)] pt-24 sm:pt-32 lg:pt-36"
      >
        <div className="space-y-10">
          <div className="max-w-2xl">
            <h1 id="offerings-heading" className="text-4xl font-serif font-medium leading-none text-[var(--color-text-primary)] sm:text-6xl">Offerings</h1>
          </div>

          {/* Duration legend */}
          <div className="flex flex-wrap gap-6 font-sans text-base font-medium sm:text-lg">
            <span className="inline-flex items-center gap-2.5">
              <span className="inline-block h-3.5 w-3.5 rounded-full bg-[var(--color-duration-short)]" aria-hidden="true" />
              <span className="text-[var(--color-text-muted)]">2-hour walk</span>
            </span>
            <span className="inline-flex items-center gap-2.5">
              <span className="inline-block h-3.5 w-3.5 rounded-full bg-[var(--color-duration-long)]" aria-hidden="true" />
              <span className="text-[var(--color-text-muted)]">6-hour excursion (transport included)</span>
            </span>
          </div>

          <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(24rem,0.85fr)] xl:gap-12">
            {/* MAP */}
            <div className="relative w-full overflow-hidden border border-[var(--color-border-strong)] bg-[#d7bd8c]">
              <Image
                src="/images/illustrations/tulunadu-offering-map.png"
                alt="Illustrated map showing the seven the koral collective walking trail locations across Tulunadu"
                width={1536}
                height={1024}
                className="block h-auto w-full"
                priority
              />
              <div className="absolute inset-0" aria-label="Walking trail locations">
                {trails.map((trail, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={trail.name}
                      type="button"
                      onClick={() => selectTrail(index)}
                      aria-label={`Select ${trail.name} trail`}
                      aria-pressed={isActive}
                      className={`absolute z-10 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-[1.15] focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#742c2a] focus-visible:ring-offset-2 ${isActive ? "scale-[1.15] drop-shadow-md z-20" : "opacity-90 hover:opacity-100"
                        }`}
                      style={trail.position}
                    >
                      <div className="relative flex items-center justify-center">
                        <Image
                          src={trail.pictogram}
                          alt=""
                          width={180}
                          height={180}
                          className="h-11 w-11 object-contain sm:h-12 sm:w-12 md:h-14 md:w-14"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DETAIL PANEL */}
            <article className="border-t border-[var(--color-border-strong)] pt-5" aria-live="polite">
              <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden bg-[#d9c9b2]">
                <Image
                  src={activeTrailImage?.src ?? activeTrail.pictogram}
                  alt={activeTrailImage?.alt ?? ""}
                  fill
                  sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 40vw, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-4xl font-serif font-medium leading-none text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                    {activeTrail.name} trail
                  </h2>
                  <div className="mt-3 flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${activeTrail.durationHours === 2
                        ? "bg-[var(--color-duration-short)]/30 text-[#5c571e]"
                        : "bg-[var(--color-duration-long)]/20 text-[#365029]"
                        }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${activeTrail.durationHours === 2 ? "bg-[var(--color-duration-short)]" : "bg-[var(--color-duration-long)]"
                          }`}
                        aria-hidden="true"
                      />
                      {activeTrail.duration}
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">{activeTrail.price}</span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">{activeTrail.description}</p>

              <p className="mt-6 text-sm font-semibold text-[var(--color-text-primary)]">Highlights along the trail:</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
                {activeTrail.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {activeTrail.note ? (
                <p className="mt-6 text-xs italic leading-relaxed text-[var(--color-text-subtle)]">{activeTrail.note}</p>
              ) : null}

              {activeTrail.leader ? (
                <p className="mt-6 text-sm text-[var(--color-text-muted)]">
                  Walk led by{" "}
                  <a
                    href={activeTrail.leaderHref}
                    className="font-bold text-[var(--color-brand-primary)] underline underline-offset-4"
                  >
                    {activeTrail.leader}
                  </a>
                  , Architect and Teacher
                </p>
              ) : null}

              <OfferingControls activeIndex={activeIndex} count={trails.length} onSelect={selectTrail} />
            </article>
          </div>

        </div>
      </Section>
    </div>
  );
}
