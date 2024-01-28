CREATE TABLE `storageUnits` (
	`productID` integer NOT NULL,
	`variantID` integer NOT NULL,
	`warehouseID` integer NOT NULL,
	`amount` integer,
	PRIMARY KEY(`productID`, `variantID`, `warehouseID`),
	FOREIGN KEY (`productID`) REFERENCES `products`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variantID`) REFERENCES `variants`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`warehouseID`) REFERENCES `warehouses`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `productVariants` RENAME COLUMN `available` TO `isAvailable`;