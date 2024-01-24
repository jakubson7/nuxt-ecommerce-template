CREATE TABLE `productContents` (
	`productID` integer NOT NULL,
	`locale` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	PRIMARY KEY(`locale`, `productID`),
	FOREIGN KEY (`productID`) REFERENCES `products`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`locale`) REFERENCES `locales`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `productPrices` (
	`ID` integer PRIMARY KEY NOT NULL,
	`productID` integer NOT NULL,
	`locale` text NOT NULL,
	`currency` text NOT NULL,
	`value` integer NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	FOREIGN KEY (`productID`) REFERENCES `products`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`locale`) REFERENCES `locales`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`ID` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL
);
