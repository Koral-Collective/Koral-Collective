import { asc, eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { events } from "@/lib/db/schema";

export async function getPublishedEvents() {
  return getDb()
    .select({
      id: events.id,
      title: events.title,
      trail: events.trail,
      guide: events.guide,
      eventDate: events.eventDate,
      startTime: events.startTime,
      endTime: events.endTime,
      indianPrice: events.indianPrice,
      foreignPrice: events.foreignPrice,
      description: events.description,
    })
    .from(events)
    .where(eq(events.isPublished, true))
    .orderBy(asc(events.eventDate));
}
