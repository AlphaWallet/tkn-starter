"use client"

import { useMemo, useState } from "react"

import { Token } from "@/types/pass"
import { buildBcConfig } from "@/config/bcConfig"
import { BrandConnector } from "@/components/brand-connector"

export function PassPageContent() {
  const [tokens, setTokens] = useState<Token[]>([])
  const bcConfig = useMemo(() => buildBcConfig(), [])

  return (
    <div className="bg-white">
      <BrandConnector config={bcConfig} onTokens={setTokens} />
      <div>{JSON.stringify(tokens, null, 2)}</div>
    </div>
  )
}
