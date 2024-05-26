import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  HASH_SECRET: z.string(),
});

export const environments = envSchema.parse(process.env);
