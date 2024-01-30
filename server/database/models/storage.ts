import { storageUnits, warehouses } from "../schema";

export type SelectWarehouse = typeof warehouses.$inferSelect;
export type InsertWarehouse = typeof warehouses.$inferInsert;
export type SelectStorageUnit = typeof storageUnits.$inferSelect;
export type InsertStorageUnit = typeof storageUnits.$inferInsert;

export type Warehouse = SelectWarehouse;
export type StorageUnit = SelectStorageUnit;
