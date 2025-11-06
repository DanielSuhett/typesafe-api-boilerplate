import { cartSchema } from "@shared/database/schemas";
import { t } from "elysia";

export const createCart = {
	detail: {
		summary: "Create a new cart for a user",
	},
	params: t.Object({
		type: cartSchema.table.interface.type,
	}),
	headers: t.Object({
		userid: cartSchema.table.interface.userId,
	}),
	body: t.Object({
		items: cartSchema.CartItems,
	}),
};

export const getAllCartsFromUser = {
	headers: t.Object({
		userid: cartSchema.table.interface.userId,
	}),
};
