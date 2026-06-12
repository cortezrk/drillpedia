"use client"

import { SessionProvider } from "next-auth/react"

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={30} refetchOnWindowFocus>
      {children}
    </SessionProvider>
  )
}
