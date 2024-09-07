CREATE TABLE IF NOT EXISTS "card_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"front_text" text NOT NULL,
	"back_text" text NOT NULL,
	"front_image_url" varchar(255) DEFAULT '',
	"back_image_url" varchar(255) DEFAULT '',
	"card_type" varchar(50) DEFAULT 'BASIC',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp DEFAULT NULL
);
