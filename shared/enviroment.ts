import { getSchemaValidator, t } from "elysia";

const enviromentSchema = t.Object({
	NODE_ENV: t.Union([t.Literal("development"), t.Literal("production"), t.Literal("test")], {
		default: "development",
	}),
	DATABASE_URL: t.String(),
	PORT: t.Number(),
	OTEL_LOG_LEVEL: t.String(),
	APM_SERVER_URL: t.Optional(t.String()),
});

const enviroments = getSchemaValidator(enviromentSchema);

const values = {
	NODE_ENV: process.env.NODE_ENV || "development",
	DATABASE_URL: process.env.DATABASE_URL,
	PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
	OTEL_LOG_LEVEL: process.env.OTEL_LOG_LEVEL || "error",
	APM_SERVER_URL: process.env.APM_SERVER_URL || "",
};

const { error } = enviroments.safeParse(values);

if (error) {
	throw new Error(error);
}

export default values as typeof enviromentSchema.static;
