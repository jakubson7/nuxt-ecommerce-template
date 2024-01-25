CREATE TABLE `warehouses` (
	`ID` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
ALTER TABLE locales ADD `metadata` text DEFAULT '{}' NOT NULL;