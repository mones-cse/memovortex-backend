ALTER TABLE "document" ALTER COLUMN "file_s3_key" SET DEFAULT NULL;--> statement-breakpoint
ALTER TABLE "document" ALTER COLUMN "file_s3_key" DROP NOT NULL;