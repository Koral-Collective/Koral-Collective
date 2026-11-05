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
      <Container className="py-12">
        <h1 className="text-3xl font-medium">{about.title}</h1>
        <p className="mt-4 max-w-2xl text-neutral-600">{about.intro}</p>
      </Container>
    </div>
  );
}
