ALTER TABLE users ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE users ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE users ADD `hashedPassword` text NOT NULL;--> statement-breakpoint
ALTER TABLE users ADD `role` text NOT NULL;