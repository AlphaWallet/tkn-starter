"use client"

import { useState } from "react"
import Link from "next/link"

import { generatePass } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function IndexPage() {
  const { toast } = useToast()

  const [email, setEmail] = useState("")

  const handleGeneratePass = () => {
    generatePass({ email, chain: 0 }).then(() => {
      toast({ title: "📤 Please check your email inbox" })
    })
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="flex gap-4">
        <Input
          type="email"
          placeholder="Email"
          className="h-full"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button
          onClick={handleGeneratePass}
          className="whitespace-nowrap"
          variant={"outline-black"}
        >
          Generate pass
        </Button>
      </div>

      <div>
        visit{" "}
        <Link href="/pass" className="underline">
          passes
        </Link>{" "}
        page to see all the passes
      </div>
    </div>
  )
}
