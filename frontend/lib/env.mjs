import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_BACKEND_BASE: z.string().min(1).endsWith("/"),
    NEXT_PUBLIC_JWT: z.string().min(1),
    NEXT_PUBLIC_CHAIN_ID: z
      .string()
      // transform to number
      .transform((s) => parseInt(s, 10))
      // make sure transform worked
      .pipe(z.number()),
    NEXT_PUBLIC_SENDER_PUBLIC_KEY: z.string().min(1),
    NEXT_PUBLIC_ATTESTOR_PUBLIC_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BACKEND_BASE: process.env.NEXT_PUBLIC_BACKEND_BASE,
    NEXT_PUBLIC_JWT: process.env.NEXT_PUBLIC_JWT,
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_SENDER_PUBLIC_KEY: process.env.NEXT_PUBLIC_SENDER_PUBLIC_KEY,
    NEXT_PUBLIC_ATTESTOR_PUBLIC_KEY: process.env.NEXT_PUBLIC_SENDER_PUBLIC_KEY,
  },
})
