import * as dotenv from 'dotenv';
dotenv.config();

// Add validation to ensure BASE_URL exists
function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`${key} is required but missing`);
  return val;
}

export const config = {
  baseURL: requireEnv("BASE_URL"),
  standardUsername: requireEnv("STANDARD_USERNAME"),
  standardPassword: requireEnv("STANDARD_USER_PASSWORD"),
  responseTime: Number(requireEnv("RESPONSE_TIME"))
};

