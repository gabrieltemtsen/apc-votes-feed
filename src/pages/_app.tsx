import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { BottomNav } from "@/components/layout/BottomNav"
import { Toaster } from "@/components/ui/toaster"

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="pb-16 md:pb-0">
          <Component {...pageProps} />
        </main>
        <BottomNav />
        <Toaster />
      </div>
    </SessionProvider>
  )
}
