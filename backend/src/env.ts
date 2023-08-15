import {createEnv} from '@t3-oss/env-core';
import dotenv from 'dotenv';
import {z} from 'zod';

dotenv.config();

export const env = createEnv({
  clientPrefix: '',
  server: {
    JWT_SECRET: z.string().default('SuPeRpaSsW0rd'),
    FASTIFY_PORT: z.coerce.number().default(3006),
    FASTIFY_ADDRESS: z.string().default('127.0.0.1'),
    LOG_LEVEL: z.string().default('debug'),
    DB_HOST: z.string().default('127.0.0.1'),
    DB_PORT: z.coerce.number().default(5432),
    DB_USER: z.string().default('test_admin'),
    DB_PASSWORD: z.string().default('admin'),
    DB_DATABASE: z.string().default('test'),
    COMMON_API: z.string().default('http://localhost:3005'),
    PROJECT_API_KEY: z.string(),
    ROOT_URL_PREFIX: z.string().default('http://localhost:3006'),
  },
  client: {},
  runtimeEnv: process.env,
});
