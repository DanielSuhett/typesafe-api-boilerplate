import Elysia from "elysia";

import { cartController } from "@carts/controller";
import { openTelemetry } from "@shared/instrumentation";
import { openApi } from "@shared/openapi";
import enviroment from "@shared/enviroment";

export function createApp() {
  const app = new Elysia();

  if (enviroment.APM_SERVER_URL) {
    app.use(openTelemetry);
  }

  app.use(cartController);
  app.use(openApi);

  return app;
}

