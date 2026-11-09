import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { isAdminRequest, isSameOriginRequest } from "@/lib/admin-auth";
import { getDb } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { validateEventInput } from "@/lib/event-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Invalid event id." }, { status: 400 });

  let input: unknown;
  try { input = await request.json(); } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  const validation = validateEventInput(input);
  if (validation.error) return NextResponse.json({ error: validation.error }, { status: 400 });
  if (!validation.value) return NextResponse.json({ error: "Event data is invalid." }, { status: 400 });

  try {
    const [updated] = await getDb().update(events)
      .set({ ...validation.value, updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();
    if (!updated) return NextResponse.json({ error: "Event not found." }, { status: 404 });
    return NextResponse.json({ event: updated }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not update this event." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Invalid event id." }, { status: 400 });

  try {
    const [deleted] = await getDb().delete(events).where(eq(events.id, id)).returning({ id: events.id });
    if (!deleted) return NextResponse.json({ error: "Event not found." }, { status: 404 });
    return new NextResponse(null, { status: 204, headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not delete this event." }, { status: 500 });
  }
}
