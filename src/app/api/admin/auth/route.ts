import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createAdminSession,
  credentialsMatch,
  isSameOriginRequest,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter a username and password." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Enter a username and password." }, { status: 400 });
  }

  const { username, password } = body as Record<string, unknown>;
  if (typeof username !== "string" || typeof password !== "string" || !credentialsMatch(username, password)) {
    return NextResponse.json({ error: "The username or password is incorrect." }, { status: 401 });
  }

  try {
    const session = createAdminSession();
    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(ADMIN_COOKIE_NAME, session.token, adminCookieOptions(session.maxAge));
    return response;
  } catch {
    return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  }
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_COOKIE_NAME, "", adminCookieOptions(0));
  return response;
}
