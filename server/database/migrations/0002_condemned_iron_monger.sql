CREATE TABLE `productVariants` (
	`productID` integer NOT NULL,
	`variantID` integer NOT NULL,
	`available` integer NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	PRIMARY KEY(`productID`, `variantID`),
	FOREIGN KEY (`productID`) REFERENCES `products`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variantID`) REFERENCES `variants`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE variants ADD `value` text NOT NULL;--> statement-breakpoint
ALTER TABLE variants ADD `type` text NOT NULL;