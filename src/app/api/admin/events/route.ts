import { NextRequest, NextResponse } from "next/server";

import { isAdminRequest, isSameOriginRequest } from "@/lib/admin-auth";
import { getDb } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { validateEventInput } from "@/lib/event-validation";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  try {
    const rows = await getDb().select().from(events).orderBy(desc(events.eventDate));
    return NextResponse.json({ events: rows }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not load events." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  let input: unknown;
  try { input = await request.json(); } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  const validation = validateEventInput(input);
  if (validation.error) return NextResponse.json({ error: validation.error }, { status: 400 });
  if (!validation.value) return NextResponse.json({ error: "Event data is invalid." }, { status: 400 });

  try {
    const [created] = await getDb().insert(events).values(validation.value).returning();
    return NextResponse.json({ event: created }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not create this event." }, { status: 500 });
  }
}
