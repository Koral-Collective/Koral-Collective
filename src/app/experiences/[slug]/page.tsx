import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import {
  getAllExperienceSlugs,
  getExperienceBySlug,
  getOfferingById,
  getSiteConfig,
} from "@/content";
import {
  buildExperienceEnquiryMessage,
  buildWhatsAppUrl,
} from "@/features/contact/lib/buildWhatsAppUrl";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllExperienceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    return { title: "Experience not found" };
  }

  return {
    title: experience.seo.title,
    description: experience.seo.description,
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const parentOffering = getOfferingById(experience.offeringId);
  const siteConfig = getSiteConfig();

  // WhatsApp CTA
  const enquiryMessage =
    experience.contactMessage ??
    buildExperienceEnquiryMessage(experience.title);
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsapp.phoneE164,
    enquiryMessage
  );

  return (
    <article>
      {/* ── Hero Strip ──────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden bg-[var(--color-brand-primary)]">
        {/* Atmospheric placeholder background – will be replaced with real imagery */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1b2b25] via-[#2d3a30] to-[#4a5e50] opacity-90"
          aria-hidden="true"
        />
        {/* Subtle texture layer */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-36">
          {/* Back navigation — visible inside the hero */}
          {parentOffering && (
            <Link
              href={`/offerings/${parentOffering.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors mb-8 tracking-wide"
            >
              <span aria-hidden="true">←</span>
              <span>Back to {parentOffering.title}</span>
            </Link>
          )}

          {/* Offering context label */}
          {parentOffering && (
            <p className="text-[11px] font-semibold tracking-[0.25em] text-white/50 mb-4">
              {parentOffering.title}
            </p>
          )}

          {/* Experience title */}
          <h1 className="font-serif text-4xl font-medium text-white leading-tight sm:text-5xl lg:text-6xl">
            {experience.title}
          </h1>

          {/* Teaser */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80">
            {experience.teaser}
          </p>

          {/* Quick-detail pills */}
          {(experience.duration || experience.format) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {experience.duration && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                  <svg
                    className="h-3.5 w-3.5 opacity-70"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm.5 3.5a.5.5 0 0 0-1 0V8a.5.5 0 0 0 .146.354l2 2a.5.5 0 0 0 .708-.708L8.5 7.793V5.5z" />
                  </svg>
                  {experience.duration}
                </span>
              )}
              {experience.format && (
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                  {experience.format}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <Container size="wide" className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16 xl:gap-20">

          {/* Left column: Description + Highlights */}
          <div className="space-y-10">

            {/* Description */}
            <section aria-labelledby="experience-description-heading">
              <h2
                id="experience-description-heading"
                className="mb-4 text-xs font-semibold tracking-widest text-[var(--color-text-muted)]"
              >
                About this experience
              </h2>
              <p className="text-base leading-relaxed text-[var(--color-text-primary)]">
                {experience.description}
              </p>
            </section>

            {/* Highlights */}
            {experience.highlights.length > 0 && (
              <section aria-labelledby="experience-highlights-heading">
                <h2
                  id="experience-highlights-heading"
                  className="mb-4 text-xs font-semibold tracking-widest text-[var(--color-text-muted)]"
                >
                  What&apos;s included
                </h2>
                <ul className="space-y-3">
                  {experience.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base text-[var(--color-text-primary)]"
                    >
                      <span
                        className="mt-1.5 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Back to offering — bottom of content column */}
            {parentOffering && (
              <div className="pt-4 border-t border-[var(--color-border-subtle)]">
                <Link
                  href={`/offerings/${parentOffering.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <span aria-hidden="true">←</span>
                  <span>Back to {parentOffering.title}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Right column: Enquiry CTA card */}
          <aside aria-label="Enquire about this experience">
            <div className="sticky top-24 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-7 shadow-sm space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-widest text-[var(--color-text-muted)]">
                  Interested?
                </p>
                <h3 className="font-serif text-xl font-medium text-[var(--color-text-primary)] leading-snug">
                  Enquire about {experience.title}
                </h3>
                <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
                  Reach out directly to learn more, check availability, or arrange your experience. We respond personally to every enquiry.
                </p>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-[var(--radius-md)] bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-sm hover:brightness-105 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
                aria-label={`Enquire about ${experience.title} on WhatsApp`}
              >
                {/* WhatsApp icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 flex-shrink-0 fill-current"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Enquire on WhatsApp
              </a>

              {/* Email fallback */}
              <div className="text-center">
                <p className="text-xs text-[var(--color-text-subtle)]">
                  Or email us at{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=Enquiry: ${encodeURIComponent(experience.title)}`}
                    className="font-medium text-[var(--color-text-muted)] underline hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>

              {/* No booking/payment notice */}
              <p className="text-[11px] text-[var(--color-text-subtle)] leading-relaxed border-t border-[var(--color-border-subtle)] pt-4">
                No online booking or payment required. We handle all arrangements directly through personal contact.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
