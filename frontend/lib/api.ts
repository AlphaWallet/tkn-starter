import axios from "axios"

import { env } from "@/lib/env.mjs"

const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_BASE,
  headers: { Authorization: `Bearer ${env.NEXT_PUBLIC_JWT}` },
})

export function register(data: { chain: number; email: string }) {
  return axiosInstance
    .post<{ passId: string; email: string }>("/passes", data)
    .then((v) => v.data)
}
