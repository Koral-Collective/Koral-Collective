import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "koral_admin_session";
const SESSION_SECONDS = 60 * 60 * 12;

function sessionKey() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("Admin credentials are not configured");
  return secret;
}

function signature(payload: string) {
  return createHmac("sha256", sessionKey()).update(payload).digest("base64url");
}

function equalStrings(left: string, right: string) {
  const leftHash = createHmac("sha256", "constant-time-comparison").update(left).digest();
  const rightHash = createHmac("sha256", "constant-time-comparison").update(right).digest();
  return timingSafeEqual(leftHash, rightHash) && left.length === right.length;
}

export function credentialsMatch(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUsername || !expectedPassword) return false;
  return equalStrings(username, expectedUsername) && equalStrings(password, expectedPassword);
}

export function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = Buffer.from(JSON.stringify({ sub: "admin", exp: expiresAt, nonce: randomUUID() })).toString("base64url");
  return { token: `${payload}.${signature(payload)}`, maxAge: SESSION_SECONDS };
}

export function verifyAdminSession(token: string | undefined) {
  if (!token) return false;
  const [payload, suppliedSignature, ...rest] = token.split(".");
  if (!payload || !suppliedSignature || rest.length) return false;

  try {
    if (!equalStrings(suppliedSignature, signature(payload))) return false;
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      sub?: unknown;
      exp?: unknown;
    };
    return session.sub === "admin" && typeof session.exp === "number" && session.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function adminCookieOptions(maxAge = SESSION_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}

export async function isAdminPageSession() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(COOKIE_NAME)?.value);
}

export function isAdminRequest(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(COOKIE_NAME)?.value);
}

export function isSameOriginRequest(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export { COOKIE_NAME as ADMIN_COOKIE_NAME };
