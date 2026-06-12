"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  howFound: string
  reason: string
  approved: boolean
  role: string
  visitCount: number
  createdAt: string
}

const howFoundLabels: Record<string, string> = {
  friend: "From a friend",
  "social-media": "Social media",
  forum: "Forum / Reddit",
  "music-platform": "Music platform",
  research: "Academic research",
  other: "Other",
}

export default function Admin() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [newRequest, setNewRequest] = useState(false)
  const prevPendingCount = useRef(0)
  const notifSent = useRef(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated" && (session.user as any)?.role !== "admin") {
      router.push("/")
    }
  }, [status, session, router])

  useEffect(() => {
    if (status === "authenticated" && (session.user as any)?.role === "admin") {
      fetchUsers()
      const interval = setInterval(fetchUsers, 10000)
      return () => clearInterval(interval)
    }
  }, [status, session])

  useEffect(() => {
    const pending = users.filter((u) => !u.approved).length
    if (pending > prevPendingCount.current && prevPendingCount.current > 0) {
      setNewRequest(true)
      setTimeout(() => setNewRequest(false), 4000)
      if (!notifSent.current && "Notification" in window && Notification.permission === "granted") {
        new Notification("New Access Request", {
          body: `${pending - prevPendingCount.current} new user(s) requested access`,
          icon: "/logo.jpg",
        })
        notifSent.current = true
        setTimeout(() => { notifSent.current = false }, 5000)
      }
    }
    prevPendingCount.current = pending
  }, [users])

  async function fetchUsers() {
    try {
      const res = await fetch("/api/admin/users")
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch {
      console.error("Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  async function handleAction(userId: string, approved: boolean) {
    await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    })
    fetchUsers()
  }

  async function handleDelete(userId: string) {
    if (confirm("Delete this user?")) {
      await fetch(`/api/admin/users/${userId}`, { method: "DELETE" })
      fetchUsers()
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    )
  }

  const pendingUsers = users.filter((u) => !u.approved)
  const approvedUsers = users.filter((u) => u.approved)

  const q = search.toLowerCase().trim()
  const filteredPending = q
    ? pendingUsers.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    : pendingUsers
  const filteredApproved = q
    ? approvedUsers.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    : approvedUsers

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Admin Dashboard</h1>
        <p className="mt-1 text-muted">Manage user access requests</p>
      </div>

      <AnimatePresence>
        {newRequest && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mb-4 overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3"
          >
            <p className="text-sm font-medium text-emerald-300">
              New pending request{prevPendingCount.current > 1 ? "s" : ""} detected
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mb-8">
        <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-xl border border-border bg-surface-2 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
        />
      </div>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          Pending Requests ({filteredPending.length})
          <AnimatePresence>
            {newRequest && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="inline-flex h-2 w-2 rounded-full bg-emerald-400"
              />
            )}
          </AnimatePresence>
        </h2>
        {pendingUsers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-surface/60 p-8 text-center text-muted backdrop-blur-sm"
          >
            No pending requests
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            className="space-y-4"
          >
            {filteredPending.map((user) => (
              <motion.div
                key={user.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
                }}
                className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted">{user.email}</p>
                  </div>
                  <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-300">
                    Pending
                  </span>
                </div>
                <div className="mb-3 space-y-1 text-sm text-muted">
                  <p>
                    <span className="font-medium text-foreground">Found via:</span>{" "}
                    {howFoundLabels[user.howFound] || user.howFound}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Reason:</span>{" "}
                    {user.reason}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Requested:</span>{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Visits:</span>{" "}
                    <span className={user.visitCount > 10 ? "text-red-300" : ""}>
                      {user.visitCount}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction(user.id, true)}
                    className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(user.id)}
                    className="rounded-lg border border-border px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-red-500/30 hover:text-red-300"
                  >
                    Reject
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Approved Users ({filteredApproved.length})
        </h2>
        {approvedUsers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-surface/60 p-8 text-center text-muted backdrop-blur-sm"
          >
            No approved users yet
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
            className="space-y-3"
          >
            {filteredApproved.map((user) => (
              <motion.div
                key={user.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
                }}
                className="flex items-center justify-between rounded-xl border border-border bg-surface/60 p-4 backdrop-blur-sm"
              >
                <div>
                  <p className="font-medium">
                    {user.name}
                    {user.role === "admin" && (
                      <span className="ml-2 rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary-light">
                        Admin
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted">{user.email}</p>
                  {user.role !== "admin" && (
                    <p className="mt-1 text-xs text-muted">
                      Visits:{" "}
                      <span className={user.visitCount > 10 ? "text-red-300 font-medium" : ""}>
                        {user.visitCount}
                      </span>
                      /10
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
                    Approved
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction(user.id, true)}
                    className="text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                  >
                    Re-activate
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction(user.id, false)}
                    className="text-sm text-muted transition-colors hover:text-red-300"
                  >
                    Revoke
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </motion.div>
  )
}
