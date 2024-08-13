ALTER TABLE "document" ALTER COLUMN "file_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "mime_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "file_size" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "document" DROP COLUMN IF EXISTS "category";