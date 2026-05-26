"use client"

import { useEffect, useRef } from "react"
import { useSession, signOut } from "next-auth/react"

export default function VisitTracker() {
  const { data: session } = useSession()
  const tracked = useRef(false)

  useEffect(() => {
    if (!session?.user?.email || tracked.current) return
    tracked.current = true

    const role = (session.user as any)?.role
    if (role === "admin") return

    fetch("/api/user/visit", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (data.locked) {
          signOut({ callbackUrl: "/login?locked=true" })
        }
      })
      .catch(() => {})
  }, [session])

  return null
}
