import { useEffect } from "react"
import { Client } from "@tokenscript/token-negotiator"

import { isInIframe } from "@/lib/isInIframe"

interface BrandConnectorProps {
  config: any
  onTokens: (tokens: any[]) => void
}
export const BrandConnector = (props: BrandConnectorProps) => {
  const config = props.config
  const onTokens = props.onTokens

  useEffect(() => {
    if (isInIframe()) {
      return
    }

    const negotiator = new Client({
      type: "passive",
      issuers: [config],
    })

    negotiator.on("tokens", (issuerTokens: any) => {
      console.log("on tokens", issuerTokens)
      const collectionID = config.collectionID.toLowerCase()
      const tokens = issuerTokens[collectionID].tokens
      onTokens(tokens)
    })

    negotiator.negotiate()
  }, [config, onTokens])

  return null
}
