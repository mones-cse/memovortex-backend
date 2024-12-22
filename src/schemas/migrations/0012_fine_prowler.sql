CREATE TABLE IF NOT EXISTS "deck" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deck_title" varchar(255) NOT NULL,
	"deck_description" text NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp DEFAULT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deck" ADD CONSTRAINT "deck_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
