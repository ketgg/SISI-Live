import { Analytics } from "@vercel/analytics/react"
import localFont from "next/font/local"

import "@/styles/globals.css"

import Header from "@/components/header"
import { AnimationProvider } from "@/components/animations"
import Footer from "@/components/footer"

const ppRightGroteskCasual = localFont({
  src: "../assets/fonts/PPRightGrotesk-CasualVariable.ttf",
  variable: "--font-grotesk-casual",
})
const ppRightGroteskTight = localFont({
  src: "../assets/fonts/PPRightGrotesk-TightVariable.ttf",
  variable: "--font-grotesk-tight",
})
const ppRightGroteskWide = localFont({
  src: "../assets/fonts/PPRightGrotesk-WideVariable.ttf",
  variable: "--font-grotesk-wide",
})

export const metadata = {
  metadataBase: new URL("https://sisi.ketto.space"),
  keywords: [
    "sign language",
    "american sign language",
    "sign",
    "asl",
    "asl interpreter",
    "speech to asl",
    "text to asl",
    "asl animations",
    "animations",
    "threejs",
    "react",
    "nextjs",
  ],
  title: "Project — SISI",
  description:
    "Hello! I'm SISI — short for Say It, Sign It! I can turn your text or audio into American Sign Language(ASL) animations. Simply type in the box below or use the Record button to speak your input. Once you're ready, hit the Play button to watch your words come to life in ASL!",
  openGraph: {
    title: "Project — SISI",
    description:
      "Hello! I'm SISI — short for Say It, Sign It! I can turn your text or audio into American Sign Language(ASL) animations. Simply type in the box below or use the Record button to speak your input. Once you're ready, hit the Play button to watch your words come to life in ASL!",
    url: "https://sisi.ketto.space",
    siteName: "Project — SISI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/images/sisi_opengraph.jpg",
        width: 1200, // Recommended og image dimensions
        height: 630,
        alt: "SISI - Convert Text and Speech to American Sign Language(ASL) Animations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SISI - Convert Text and Speech to ASL Animations",
    description:
      "Hello! I'm SISI — short for Say It, Sign It! I can turn your text or audio into American Sign Language(ASL) animations. Simply type in the box below or use the Record button to speak your input. Once you're ready, hit the Play button to watch your words come to life in ASL!",
    images: "/assets/images/sisi_opengraph.jpg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ppRightGroteskTight.variable} ${ppRightGroteskWide.variable} ${ppRightGroteskCasual.variable} antialiased min-w-36 text-foreground font-grotesk-wide bg-background`}
      >
        <Header />
        <AnimationProvider>{children}</AnimationProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
