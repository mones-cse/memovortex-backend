ALTER TABLE "deck" RENAME COLUMN "state" TO "state_new";--> statement-breakpoint
ALTER TABLE "deck" ADD COLUMN "state_learning" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "deck" ADD COLUMN "state_review" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "deck" ADD COLUMN "state_relearning" integer DEFAULT 0 NOT NULL;