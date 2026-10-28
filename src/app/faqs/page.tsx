import type { Metadata } from "next";

import { Faqs } from "@/components/home/Faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about the koral collective walking trails in Tulunadu.",
};

export default function FaqsPage() {
  return <Faqs />;
}
