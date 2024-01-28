import { storageUnits, warehouses } from "../schema";

export type Warehouse = typeof warehouses.$inferSelect;
export type InsertWarehouse = typeof warehouses.$inferInsert;
export type StorageUnit = typeof storageUnits.$inferSelect;
export type InsertStorageUnit = typeof storageUnits.$inferInsert;
