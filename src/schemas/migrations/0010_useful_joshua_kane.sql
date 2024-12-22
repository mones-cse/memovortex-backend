ALTER TABLE "document" ALTER COLUMN "file_type" SET DEFAULT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "file_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "mime_type" SET DEFAULT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "mime_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "file_size" SET DEFAULT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "file_size" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "file_s3_key" SET DEFAULT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "file_s3_key" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "document" DROP COLUMN IF EXISTS "category";