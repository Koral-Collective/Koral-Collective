import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { TeamAccordion } from "@/components/team/TeamAccordion";
import { getTeamContent } from "@/content";

const team = getTeamContent();

export const metadata: Metadata = {
  title: team.seo.title,
  description: team.seo.description,
};

export default function TeamPage() {
  return (
    <Container size="default" className="pb-16 pt-32 sm:pb-24 sm:pt-40">
      <header className="max-w-4xl border-b border-[var(--color-border-strong)] pb-12 sm:pb-16">
        <h1 className="mt-4 text-5xl font-serif font-medium leading-none text-[var(--color-text-primary)] sm:text-7xl">
          {team.title}
        </h1>
        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
          <p><strong>The koral collective</strong>{team.intro[0].slice("The koral collective".length)}</p>
          <p>{team.intro[1]}</p>
          <p>
            We take our name from the <em>koral kattuna parbha</em>, the festival that marks the first paddy harvest of the season, which brings and binds families, faiths, and communities. The <em>koral</em> or paddy is not only nourishment but also inextricably linked to the region’s traditions, rites, festivals, and songs—it is grain and gospel. The paddy stalk in our logo stands for what Tuluvas have always held close: sustenance, prosperity, and reverence for nature.
          </p>
        </div>
      </header>
      <TeamAccordion groups={team.groups} />
    </Container>
  );
}
