import openapi from "@elysiajs/openapi";

import * as pack from "../package.json";

export const openApi = openapi({
	documentation: {
		info: {
			title: pack.name,
			version: pack.version,
			description: `An example API using Elysia framework, 
                TypeBox for schema definitions,
                and Drizzle ORM for database interactions.
            `,
		},
	},
	scalar: {
		showToolbar: "never",
	},
});
