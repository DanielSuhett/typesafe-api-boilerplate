import { opentelemetry } from "@elysiajs/opentelemetry";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";

import * as pack from "../package.json";

const ElasticApmServer = new BatchSpanProcessor(
	new OTLPTraceExporter({
		url: process.env.APM_SERVER_URL as string,
		headers: {
			"Content-Type": "application/x-protobuf",
		},
	}),
);

export const openTelemetry = opentelemetry({
	spanProcessors: [ElasticApmServer],
	instrumentations: [new PgInstrumentation()],
	serviceName: pack.name,
});
