CREATE TABLE IF NOT EXISTS "document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_type" varchar(50) NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"file_size" bigint NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_accessed_at" timestamp DEFAULT now(),
	"deleted_at" timestamp DEFAULT NULL,
	"file_s3_key" varchar(255) NOT NULL,
	"category" varchar(100) NOT NULL,
	"parent_id" uuid DEFAULT NULL,
	"is_directory" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document" ADD CONSTRAINT "document_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document" ADD CONSTRAINT "document_parent_id_document_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."document"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
