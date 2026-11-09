import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

let database: ReturnType<typeof drizzle> | undefined;

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not configured");
  database ??= drizzle(neon(databaseUrl));
  return database;
}
