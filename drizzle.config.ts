export default {
	out: "./shared/database/drizzle/migrations",
	schema: "./shared/database/schemas",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
	},
} as const;
