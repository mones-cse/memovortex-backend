CREATE TABLE IF NOT EXISTS "card" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deck_id" uuid NOT NULL,
	"card_content_id" uuid NOT NULL,
	"reps" integer DEFAULT 0 NOT NULL,
	"due" timestamp DEFAULT now() NOT NULL,
	"state" varchar(50) DEFAULT 'NEW' NOT NULL,
	"last_review" timestamp DEFAULT now() NOT NULL,
	"elapsed_days" integer DEFAULT 0 NOT NULL,
	"scheduled_days" integer DEFAULT 0 NOT NULL,
	"difficulty" integer DEFAULT 0 NOT NULL,
	"stability" integer DEFAULT 0 NOT NULL,
	"lapses" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp DEFAULT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card" ADD CONSTRAINT "card_deck_id_deck_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."deck"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card" ADD CONSTRAINT "card_card_content_id_card_content_id_fk" FOREIGN KEY ("card_content_id") REFERENCES "public"."card_content"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
