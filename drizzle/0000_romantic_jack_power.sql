CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"trail" text NOT NULL,
	"guide" text NOT NULL,
	"event_date" timestamp with time zone NOT NULL,
	"start_time" text NOT NULL,
	"end_time" text NOT NULL,
	"indian_price" integer NOT NULL,
	"foreign_price" integer NOT NULL,
	"description" text,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
