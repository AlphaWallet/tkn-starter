import mdx from "@next/mdx"

import "./lib/env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true,
  },
}

const withMDX = mdx()
export default withMDX(nextConfig)
