CREATE TABLE `productCategories` (
	`productId` integer NOT NULL,
	`categoryId` integer NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `productContents` (
	`productId` integer NOT NULL,
	`localeId` text NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	PRIMARY KEY(`localeId`, `productId`),
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`localeId`) REFERENCES `locales`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `productVariants` (
	`productId` integer NOT NULL,
	`variantId` integer NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	PRIMARY KEY(`productId`, `variantId`),
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variantId`) REFERENCES `variants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`universalSlug` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `locales` (
	`id` text PRIMARY KEY NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `variantsContent` (
	`variantId` integer NOT NULL,
	`localeId` text NOT NULL,
	`description` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	PRIMARY KEY(`localeId`, `variantId`),
	FOREIGN KEY (`variantId`) REFERENCES `variants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`localeId`) REFERENCES `locales`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `variants` (
	`id` integer PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`type` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `storageUnits` (
	`productId` integer NOT NULL,
	`variantId` integer NOT NULL,
	`warehouseId` integer NOT NULL,
	`amount` integer NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	PRIMARY KEY(`productId`, `variantId`, `warehouseId`),
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variantId`) REFERENCES `variants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`warehouseId`) REFERENCES `warehouses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `warehouses` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` integer PRIMARY KEY NOT NULL,
	`products` text DEFAULT '[]' NOT NULL,
	`metadata` text DEFAULT '{}',
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categoryContents` (
	`categoryId` integer NOT NULL,
	`localeId` text NOT NULL,
	`name` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	FOREIGN KEY (`localeId`) REFERENCES `locales`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prices` (
	`id` integer PRIMARY KEY NOT NULL,
	`productId` integer NOT NULL,
	`localeId` text NOT NULL,
	`currency` text NOT NULL,
	`value` integer NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`localeId`) REFERENCES `locales`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `offerContents` (
	`offerId` integer NOT NULL,
	`localeId` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	PRIMARY KEY(`localeId`, `offerId`),
	FOREIGN KEY (`offerId`) REFERENCES `offers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`localeId`) REFERENCES `locales`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` integer PRIMARY KEY NOT NULL,
	`scheme` text DEFAULT '{}' NOT NULL,
	`productsAffected` text DEFAULT '[]' NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `userSessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`hashedPassword` text NOT NULL,
	`role` text NOT NULL
);
