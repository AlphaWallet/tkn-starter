"use client"

import { useEffect } from "react"
import { Outlet } from "@tokenscript/token-negotiator"

import { buildBcConfig } from "@/config/bcConfig"
import { useIsMounted } from "@/lib/hooks/use-is-mounted"
import { isInIframe } from "@/lib/isInIframe"
import { PassPageContent } from "@/components/pass/pass-page-content"

export default function PassPage() {
  const isMounted = useIsMounted()

  useEffect(() => {
    new Outlet(buildBcConfig())
  }, [])

  if (!isMounted || isInIframe()) {
    return <div>loading...</div>
  }

  return <PassPageContent />
}
