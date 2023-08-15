import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fetchToggle } from "@/lib/featureToggle"
import { fontInter, fontNeuePlak, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/footer"
import { InitStoreFromServer } from "@/components/init-store-from-server"
import { Providers } from "@/components/providers"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const toggle = await fetchToggle()

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>{/* <GoogleAnalytics GA_MEASUREMENT_ID="" /> */}</head>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable,
            fontNeuePlak.variable,
            fontInter.variable
          )}
        >
          <Providers>
            <InitStoreFromServer toggle={toggle} />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <div className="flex-1">
                  {children}
                  <Footer />
                </div>
              </div>
              <Toaster />

              <TailwindIndicator />
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </>
  )
}
