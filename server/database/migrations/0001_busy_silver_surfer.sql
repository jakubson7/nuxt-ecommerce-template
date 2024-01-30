CREATE TABLE `userSessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE `products` RENAME COLUMN `slug` TO `universalSlug`;--> statement-breakpoint
ALTER TABLE productContents ADD `slug` text NOT NULL;--> statement-breakpoint
ALTER TABLE `categoryContents` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `categoryContents` DROP COLUMN `updatedAt`;