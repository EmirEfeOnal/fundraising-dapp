import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "../components/WalletProvider"
import { ErrorBoundary } from "../components/ErrorBoundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Green Earth Initiative - Environmental Fundraising DApp",
  description:
    "A decentralized fundraising platform for environmental restoration projects built on the Stacks blockchain",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <WalletProvider>{children}</WalletProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
