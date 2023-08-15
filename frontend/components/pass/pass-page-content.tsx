"use client"

import { useCallback, useMemo, useState } from "react"

import { Token } from "@/types/pass"
import { buildBcConfig } from "@/config/bcConfig"
import { claimReward } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { BrandConnector } from "@/components/brand-connector"

export function PassPageContent() {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [tokens, setTokens] = useState<Token[]>([])
  const bcConfig = useMemo(() => buildBcConfig(), [])

  const updateTokens = useCallback((v: Token[]) => {
    setIsLoading(false)
    setTokens(v)
  }, [])

  return (
    <div className="max-w-4xl bg-white p-20">
      <BrandConnector config={bcConfig} onTokens={updateTokens} />
      {isLoading ? (
        <div>Loading...</div>
      ) : tokens.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tokens.map((token) => (
              <div
                key={token.ticketIdString}
                className="relative flex flex-col items-center gap-4 space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
              >
                <div className="min-w-0 flex-1">
                  <a href="#" className="focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">
                      id: {token.ticketIdString}
                    </p>
                  </a>
                </div>
                <Button
                  onClick={() =>
                    claimReward(token.signedToken).then(() => {
                      toast({ title: "verify passed!" })
                    })
                  }
                >
                  Claim
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Nothing here...</div>
      )}
    </div>
  )
}
