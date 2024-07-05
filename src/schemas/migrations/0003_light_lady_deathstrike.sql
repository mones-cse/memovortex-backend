CREATE TABLE IF NOT EXISTS "note" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"note_title" varchar(100) NOT NULL,
	"note_content" text NOT NULL,
	"is_note_favorite" boolean DEFAULT false,
	"note_bg_color" varchar(50) DEFAULT '#ffffff',
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp DEFAULT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "note" ADD CONSTRAINT "note_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
