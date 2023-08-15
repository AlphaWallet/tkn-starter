import { atom } from "jotai"

import { Toggle } from "@/lib/featureToggle"

export const toggleAtom = atom<Toggle>({
  feature_toggle_maintenance: false,
})
