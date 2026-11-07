import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { getResourcesContent } from "@/content";

const resources = getResourcesContent();

export const metadata: Metadata = {
  title: resources.seo.title,
  description: resources.seo.description,
};

export default function ResourcesPage() {
  return (
    <Container className="pb-12 pt-32 sm:pb-16 sm:pt-40">
      <h1 className="font-medium">{resources.title}</h1>
      <ul className="mt-8 space-y-4">
        {resources.links.map((link) => (
          <li key={link.id} className="rounded border border-neutral-200 p-4">
            <a href={link.href} className="font-medium underline" rel="noopener noreferrer">
              {link.title}
            </a>
            {link.description ? (
              <p className="mt-2 text-base text-neutral-600">{link.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </Container>
  );
}
