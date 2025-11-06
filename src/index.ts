import enviroment from "@shared/enviroment";
import { createApp } from "./app";

const app = createApp();

app.listen(enviroment.PORT, () => {
  if (enviroment.NODE_ENV === "development") {
    console.debug(
      `Postman built-in alternative:  http://localhost:${enviroment.PORT}/openapi`,
    );
  }
});
