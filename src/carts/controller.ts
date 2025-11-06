import { Elysia, InternalServerError } from "elysia";

import * as cartService from "@carts/service";
import * as cartDTO from "@carts/dto";
import { tryCatch } from "@shared/http";
import { logger } from "@bogeychan/elysia-logger";

const base = new Elysia({
	tags: ["Cart"],
	name: "CartController",
	prefix: "/cart",
})
	.use(logger())
	.post(
		"/:type",
		async function createCart(context) {
			const { data, error } = await tryCatch(
				cartService.insert({
					userId: context.headers.userid,
					type: context.params.type,
					items: context.body.items,
				}),
			);

			if (error) {
				context.log.error(error);
				throw new InternalServerError();
			}

			const cartId = data.at(0)?.id;

			if (!cartId) {
				throw new InternalServerError();
			}

			return { cartId };
		},
		cartDTO.createCart,
	)
	.get(
		"/",
		async (context) => {
			const result = await cartService.find(context.headers.userid);

			return { carts: result };
		},
		cartDTO.getAllCartsFromUser,
	);

export const cartController = base;
