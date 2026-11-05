import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { getAboutContent } from "@/content";

const about = getAboutContent();

export const metadata: Metadata = {
  title: about.seo.title,
  description: about.seo.description,
};

export default function AboutPage() {
  return (
    <div className="offerings-parchment">
      <Container className="page-top-spacing pb-16 sm:pb-24">
        <h1 className="type-h1 font-serif font-medium text-[var(--color-text-primary)]">{about.title}</h1>
        <p className="mt-4 max-w-2xl type-body text-[var(--color-text-muted)]">{about.intro}</p>
      </Container>
    </div>
  );
}
