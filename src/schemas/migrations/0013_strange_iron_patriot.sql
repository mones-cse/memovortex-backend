CREATE TABLE IF NOT EXISTS "card_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"front_text" text NOT NULL,
	"back_text" text NOT NULL,
	"front_image_url" varchar(255),
	"back_image_url" varchar(255),
	"card_type" varchar(50) DEFAULT 'basic' NOT NULL,
	"multiple_choice_options" text[],
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp DEFAULT NULL,
	"tags" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "card" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deck_id" uuid NOT NULL,
	"card_content_id" uuid NOT NULL,
	"reps" integer NOT NULL,
	"due" timestamp NOT NULL,
	"state" varchar(50) NOT NULL,
	"last_review" timestamp NOT NULL,
	"elapsed_days" integer NOT NULL,
	"scheduled_days" integer NOT NULL,
	"difficulty" integer NOT NULL,
	"stability" integer NOT NULL,
	"lapses" integer NOT NULL,
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
