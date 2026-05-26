"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"

const howFoundOptions = [
  { value: "", label: "Select an option..." },
  { value: "friend", label: "From a friend" },
  { value: "social-media", label: "Social media" },
  { value: "forum", label: "Forum / Reddit" },
  { value: "other", label: "Other" },
]

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    howFound: "",
    reason: "",
  })
  const [status, setStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [loading, setLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus(null)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus({ type: "error", message: data.error })
      } else {
        setStatus({ type: "success", message: data.message })
        if (data.isAdmin) {
          setTimeout(() => (window.location.href = "/login"), 1500)
        }
      }
    } catch {
      setStatus({ type: "error", message: "Something went wrong" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center px-4 py-8">
       <div className="w-full">
        <div className="mb-8 text-center">
          <Image
            src="/logo.jpg"
            alt="Drill Pedia"
            width={56}
            height={56}
            className="mx-auto mb-4 rounded-xl object-cover"
          />
          <h1 className="text-3xl font-bold">Request Access</h1>
          <p className="mt-2 text-muted">
            Fill out the form to request access to Drill Pedia
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {status && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/30 bg-red-500/10 text-red-300"
              }`}
            >
              {status.message}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-foreground placeholder-muted outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-foreground placeholder-muted outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
              placeholder="you@email.com"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-foreground placeholder-muted outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
              placeholder="Min 8 characters"
              minLength={8}
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">
              How did you find out about Drill Pedia?
            </label>
            <select
              name="howFound"
              value={form.howFound}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
              required
            >
              {howFoundOptions.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={!opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">
              Why do you want access?
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-foreground placeholder-muted outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
              placeholder="Tell us why you're interested in Drill Pedia..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-2.5 font-medium text-white transition-all hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have access?{" "}
          <Link
            href="/login"
            className="font-medium text-primary-light hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
