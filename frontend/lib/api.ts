import axios from "axios"

import { env } from "@/lib/env.mjs"

const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_BASE,
  headers: { Authorization: `Bearer ${env.NEXT_PUBLIC_JWT}` },
})

export function generatePass(data: { chain: number; email: string }) {
  return axiosInstance.post("/tickets", data).then((v) => v.data)
}

export function claimReward(signedToken: string) {
  return axiosInstance.post("/reward", { signedToken }).then((v) => v.data)
}
