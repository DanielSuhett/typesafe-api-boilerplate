import { Value } from "@sinclair/typebox/value";

import { cartSchema as schema } from "@shared/database/schemas";

import enviroment from "@shared/enviroment";

import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: enviroment.DATABASE_URL,
	max: 10,
	min: 5,
});

const database = drizzle(pool, {
	schema,
});

export async function insert(payload: typeof schema.table.insert.static) {
	const parsed = Value.Parse(schema.table.insert, payload);
	return await database
		.insert(schema.carts)
		.values(parsed)
		.returning({ id: schema.carts.id });
}

export async function find(userId: typeof schema.table.select.static.userId) {
	return await database
		.select()
		.from(schema.carts)
		.where(eq(schema.carts.userId, userId));
}