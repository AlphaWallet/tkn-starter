"use client"

import { useHydrateAtoms } from "jotai/utils"

import { fetchToggle } from "@/lib/featureToggle"
import { toggleAtom } from "@/lib/store"

export const InitStoreFromServer = ({
  toggle,
}: {
  toggle: Awaited<ReturnType<typeof fetchToggle>>
}) => {
  useHydrateAtoms([[toggleAtom, toggle]])
  return null
}
