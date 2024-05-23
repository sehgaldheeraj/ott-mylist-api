import dotenv from "dotenv";
interface EnvFile {
  [key: string]: string;
}
const envFile: EnvFile = {
  test: ".env.test",
  development: ".env.development",
  production: ".env.production",
};

const currentEnv = process.env.NODE_ENV || "development";
const envFilePath = envFile[currentEnv];

dotenv.config({ path: envFilePath });
export function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}
