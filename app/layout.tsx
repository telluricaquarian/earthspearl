import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const editorial = localFont({
  src: "../public/PPEditorialNew-UltralightItalic.otf",
  variable: "--font-editorial",
  display: "swap",
})


export const metadata: Metadata = {
  title: "Earths Pearl",
  applicationName: "Earths Pearl",
  authors: [{ name: "Meghan Giudice" }],
  creator: "Meghan Giudice",
  publisher: "Earths Pearl",
  description: "helping women build sustainable businesses the feminine way",
  generator: "v0.app",
  openGraph: {
    title: "Earths Pearl",
    description: "helping women build sustainable businesses the feminine way",
    siteName: "Earths Pearl",
  },
  twitter: {
    card: "summary",
    title: "Earths Pearl",
    description: "helping women build sustainable businesses the feminine way",
    creator: "@earthspearlll",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${editorial.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
