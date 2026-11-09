import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  trail: text("trail").notNull(),
  guide: text("guide").notNull(),

  eventDate: timestamp("event_date", {
    withTimezone: true,
  }).notNull(),

  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),

  indianPrice: integer("indian_price").notNull(),
  foreignPrice: integer("foreign_price").notNull(),

  description: text("description"),

  isPublished: boolean("is_published").default(true).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});