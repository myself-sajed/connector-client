import "../globals.css"
import "../features.css"
import { Sora as FontSans } from "next/font/google"

export const metadata = {
  title: 'Connector',
  description: 'Welcome to Connector',
}

import { cn } from "@/lib/utils"
import Providers from "./Providers"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <body
        suppressHydrationWarning={true}
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div id="root">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
