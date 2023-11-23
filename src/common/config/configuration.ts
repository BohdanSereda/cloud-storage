import * as process from "process";

export const configuration = () => ({
  SERVER_PORT: parseInt(process.env.SERVER_PORT || "7777"),

  POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
  POSTGRES_USER: process.env.POSTGRES_USER || "postgres",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "root",
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || "model",
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || "5432"),

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
});
