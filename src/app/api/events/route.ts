import { NextResponse } from "next/server";

import { getPublishedEvents } from "@/lib/events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await getPublishedEvents();
    return NextResponse.json({ events }, { headers: { "Cache-Control": "public, max-age=0, must-revalidate" } });
  } catch {
    return NextResponse.json({ error: "Could not load the event schedule." }, { status: 500 });
  }
}
