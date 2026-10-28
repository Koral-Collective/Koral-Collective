"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";

type FaqItem = {
  question: string;
  answer: string[];
};

const faqs: FaqItem[] = [
  {
    question: "Who are these trails designed for?",
    answer: [`Anyone curious about the history, culture, and cuisine of Tulunadu`],
  },
  {
    question: "How much walking is involved?",
    answer: [`Each trail involves between 1.5 and 2.5 kilometres of walking at a comfortable pace. You should be in reasonable health and able to manage moderate walking without difficulty.`],
  },
  {
    question: "What weather should I expect?",
    answer: [
      `Coastal Karnataka is tropical, warm, and humid year-round.`,
      `December to February is the ideal window: lower temperatures, manageable humidity, and clear skies.`,
      `March to May brings intense heat.`,
      `June to September is monsoon season, with heavy daily rain, but the landscape turns a remarkable green.`,
      `October and November are transitional, cooling gradually as the rains recede.`,
      `Whatever the season, these are essential: water bottle, comfortable water-resistant footwear, sunglasses, cap, sunscreen, and an umbrella.`,
    ],
  },
  {
    question: "What should I wear?",
    answer: [
      `You will visit religious sites, private homes, and historic town centres where you must remove your footwear before entering. Dress modestly and respectfully.`,
      `Loose cotton or linen clothing is practical in the coastal humidity and appropriate for the spaces you'll be entering.`,
    ],
  },
  {
    question: "Is food included?",
    answer: [
      `Yes. Food is an integral part of every trail, a reflection of the culinary diversity of these districts. The trail features both meat and vegetarian offerings suited to its cultural context.`,
      `Please note that all our trails and experiences are alcohol and smoke-free.`,
    ],
  },
  {
    question: "Is transport provided?",
    answer: [
      `For the city walks, you are requested to make your own way to the meeting points: the starting locations are centrally situated and easily accessible by auto, local bus, scooter, bike, or car.`,
      `For half-day excursions lasting 6 hours or more, transport is included.`,
    ],
  },
  {
    question: "How do I confirm my booking?",
    answer: [
      `Bookings are confirmed only upon full payment. Reach out via WhatsApp to get started.`,
      `Groups of 7 or more are encouraged to contact us directly for tailored arrangements.`,
      `Follow our Instagram page for the latest trail dates.`,
    ],
  },
  {
    question: "Do you charge different rates for domestic and international travellers?",
    answer: [
      `Yes. Our pricing is tiered accordingly: domestic travellers are charged in INR and international travellers in USD.`,
      `Please refer to the individual trail pages for specific rates.`,
    ],
  },
  {
    question: "What is your cancellations and refunds policy?",
    answer: [
      `A minimum of 4 guests is required to run any trail. If numbers fall below 4, the trail cannot proceed. Only in such an event will your payment be refunded.`,
      `We are unable to offer refunds to guests who cancel or do not show up after booking. Food and transport are arranged specifically for each booking and logistically cannot be unwound.`,
    ],
  },
  {
    question: "Are the trails pet-friendly?",
    answer: [`No. Animals cannot be accommodated on any of the trails or excursions.`],
  },
];

export function Faqs() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <Section
      id="faqs"
      as="section"
      aria-labelledby="faqs-heading"
      className="min-h-screen bg-[var(--color-bg-surface)] pt-28 sm:pt-36 lg:pt-44"
    >
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <h1
            id="faqs-heading"
            className="mt-3 text-3xl font-serif font-medium text-[var(--color-text-primary)] sm:text-4xl"
          >
            Frequently asked questions
          </h1>
        </div>
        <div className="divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-5">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 text-left font-serif text-xl text-[var(--color-text-primary)]"
                aria-expanded={openQuestion === faq.question}
                onClick={() => setOpenQuestion(openQuestion === faq.question ? null : faq.question)}
              >
                {faq.question}
                <span className={`font-sans text-2xl font-light text-[var(--color-brand-primary)] transition-transform duration-300 ${openQuestion === faq.question ? "rotate-45" : ""}`} aria-hidden="true">
                  +
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${openQuestion === faq.question ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="min-h-0 overflow-hidden">
                  <div className="max-w-2xl pt-3 pr-8 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base space-y-3">
                    {faq.answer.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
