import {
	json,
	pgTable,
	varchar,
	timestamp,
	pgEnum,
	integer,
} from "drizzle-orm/pg-core";

import { spread } from "@shared/database/spread";

import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";

const cartStatusEnum = pgEnum("status", ["active", "completed", "cancelled"]);

export const CartItems = t.Array(
	t.Object({
		productId: t.String(),
		quantity: t.Number(),
	}),
);

const cartTypeEnum = pgEnum("type", ["physical", "digital"]);

export const carts = pgTable("carts", {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	userId: varchar("user_id").notNull(),
	type: cartTypeEnum().notNull(),
	status: cartStatusEnum().default("active").notNull(),
	items: json().$type<typeof CartItems.static>().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

const select = createSelectSchema(carts);
const insert = createInsertSchema(carts);
const interfaceCarts = spread(select);

export const table = {
	interface: interfaceCarts,
	insert,
	select,
} as const;
