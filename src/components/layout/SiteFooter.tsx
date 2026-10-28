import Link from "next/link";

import { getSiteConfig } from "@/content";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  const siteConfig = getSiteConfig();
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.phoneE164}`;

  return (
    <footer className="border-t border-white bg-black py-14 text-sm text-white">
      <Container size="wide">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.7fr_1fr]">
          <div className="space-y-4">
            <p className="font-serif text-3xl font-medium text-white">
              {siteConfig.name}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-white">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-white">
              Quick links
            </p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-white transition-colors hover:text-white">Home</Link></li>
              <li><Link href="/offerings" className="text-white transition-colors hover:text-white">Offerings</Link></li>
              <li><Link href="/team" className="text-white transition-colors hover:text-white">Team</Link></li>
              <li><Link href="/faqs" className="text-white transition-colors hover:text-white">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-white">
              Connect
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-white transition-colors hover:text-white"
            >
              WhatsApp
            </a>
            {siteConfig.contact.phone && (
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="mt-3 block text-sm text-white transition-colors hover:text-white"
              >
                {siteConfig.contact.phone}
              </a>
            )}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-3 block text-sm text-white transition-colors hover:text-white"
            >
              Email
            </a>
            {siteConfig.contact.instagram && (
              <a
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm text-white transition-colors hover:text-white"
              >
                Instagram
              </a>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white pt-6 text-xs text-white sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Experiential digital presence</p>
        </div>
      </Container>
    </footer>
  );
}
