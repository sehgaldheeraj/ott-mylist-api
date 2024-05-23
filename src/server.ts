import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./json/swagger_output.json";

dotenv.config();

import router from "./routes";
import { getEnvVariable } from "./utils/env";
const app = express();

app.use(bodyParser.json());

app.use("/api", router);

const options = { explorer: true };
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput, options));

const PORT = process.env.PORT || 3000;

const uri = process.env.MONGO_URI;
mongoose
  .connect(getEnvVariable("MONGO_URI"))
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

export { app };
