export const fetchToggle = async () => {
  return {
    feature_toggle_maintenance: false,
  }
}

export type Toggle = Awaited<ReturnType<typeof fetchToggle>>
