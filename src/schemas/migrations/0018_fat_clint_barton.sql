ALTER TABLE "card" DROP CONSTRAINT "card_card_content_id_card_content_id_fk";
--> statement-breakpoint
ALTER TABLE "card" DROP CONSTRAINT "card_deck_id_deck_id_fk";
--> statement-breakpoint
ALTER TABLE "card_content" ADD COLUMN "card_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card_content" ADD CONSTRAINT "card_content_card_id_card_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."card"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card" ADD CONSTRAINT "card_deck_id_deck_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."deck"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "card" DROP COLUMN IF EXISTS "card_content_id";