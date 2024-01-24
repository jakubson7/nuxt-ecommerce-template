CREATE TABLE `locales` (
	`ID` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `variantsContent` (
	`variantID` integer NOT NULL,
	`locale` text NOT NULL,
	`description` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	PRIMARY KEY(`locale`, `variantID`),
	FOREIGN KEY (`variantID`) REFERENCES `variants`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`locale`) REFERENCES `locales`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `variants` (
	`ID` integer PRIMARY KEY NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL
);
