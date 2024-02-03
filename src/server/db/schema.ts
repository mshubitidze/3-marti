import { sql } from "drizzle-orm";
import {
  bigint,
  mysqlEnum,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

export const createTable = mysqlTableCreator((name) => `3-marti_${name}`);

export const messages = createTable("messages", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  slug: varchar("slug", { length: 256 }).notNull(),
  design: mysqlEnum("design", ["white", "blue", "red"]).notNull(),
  message: varchar("message", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const messagesInsertSchema = createInsertSchema(messages, {
  message: (schema) =>
    schema.message.min(1, { message: "შევსება სავალდებულოა" }).max(256),
});

export const designMessageSchema = messagesInsertSchema.pick({
  design: true,
  message: true,
});
