import { productStorageUnits, warehouses } from "../schema";

export type SelectWarehouse = typeof warehouses.$inferSelect;
export type InsertWarehouse = typeof warehouses.$inferInsert;
export type SelectStorageUnit = typeof productStorageUnits.$inferSelect;
export type InsertStorageUnit = typeof productStorageUnits.$inferInsert;

export type Warehouse = SelectWarehouse;
export type StorageUnit = SelectStorageUnit;
