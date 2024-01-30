CREATE TABLE `productCategories` (
	`productID` integer NOT NULL,
	`categoryID` integer NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	FOREIGN KEY (`productID`) REFERENCES `products`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryID`) REFERENCES `categories`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
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
CREATE TABLE `productVariants` (
	`productID` integer NOT NULL,
	`variantID` integer NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	PRIMARY KEY(`productID`, `variantID`),
	FOREIGN KEY (`productID`) REFERENCES `products`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variantID`) REFERENCES `variants`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`ID` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `locales` (
	`ID` text PRIMARY KEY NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
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
	`value` text NOT NULL,
	`type` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `storageUnits` (
	`productID` integer NOT NULL,
	`variantID` integer NOT NULL,
	`warehouseID` integer NOT NULL,
	`amount` integer NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	PRIMARY KEY(`productID`, `variantID`, `warehouseID`),
	FOREIGN KEY (`productID`) REFERENCES `products`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variantID`) REFERENCES `variants`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`warehouseID`) REFERENCES `warehouses`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `warehouses` (
	`ID` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`ID` integer PRIMARY KEY NOT NULL,
	`products` text DEFAULT '[]' NOT NULL,
	`metadata` text DEFAULT '{}',
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`ID` integer PRIMARY KEY NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categoryContents` (
	`categoryID` integer NOT NULL,
	`localeID` text NOT NULL,
	`name` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`localeID`) REFERENCES `locales`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prices` (
	`ID` integer PRIMARY KEY NOT NULL,
	`productID` integer NOT NULL,
	`locale` text NOT NULL,
	`currency` text NOT NULL,
	`value` integer NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`productID`) REFERENCES `products`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`locale`) REFERENCES `locales`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `offerContents` (
	`offerID` integer NOT NULL,
	`localeID` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	PRIMARY KEY(`localeID`, `offerID`),
	FOREIGN KEY (`offerID`) REFERENCES `offers`(`offers`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`localeID`) REFERENCES `locales`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`offers` integer PRIMARY KEY NOT NULL,
	`scheme` text DEFAULT '{}' NOT NULL,
	`productsAffected` text DEFAULT '[]' NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
