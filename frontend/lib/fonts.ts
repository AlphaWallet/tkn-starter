import {
  JetBrains_Mono as FontMono,
  Rubik as FontRubik,
  Inter,
} from "next/font/google"
import localFont from "next/font/local"

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const fontSans = FontRubik({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontNeuePlak = localFont({
  variable: "--font-neue-plak",
  src: [
    { path: "./fonts/Neue-Plak-Extended-Bold.woff", weight: "800" },
    { path: "./fonts/Neue-Plak-Extended-SemiBold.woff", weight: "600" },
  ],
  display: "swap",
})
