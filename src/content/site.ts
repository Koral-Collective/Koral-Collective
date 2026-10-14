import type { NavItem, SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "the koral collective",
  tagline: "Experience Tulunadu one walk at a time",
  contact: {
    whatsapp: {
      phoneE164: "919535196043",
      defaultMessage: "Hello Koral Collective, I would like to enquire.",
    },
    email: "thekoralcollective@gmail.com",
    phone: "+91 9535196043",
    instagram: "https://www.instagram.com/thekoralcollective?stkn=ZHJuY3p4N2FxcTJu",
  },
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our offerings", href: "/offerings" },
  { label: "About us", href: "/team" },
  {
    label: "Book via WhatsApp",
    href: "https://wa.me/919535196043",
  },
];
