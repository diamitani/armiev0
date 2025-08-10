"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, ArrowRight, ShieldCheck, FileText, Camera, Megaphone, ClipboardList, Building2 } from "lucide-react"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export default function LandingPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = prompt.trim()
    if (!q || isSubmitting) return

    // Optimistically add the user message
    setMessages((prev) => [...prev, { role: "user", content: q }])
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: q }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}) as any)
        throw new Error(err?.error || "Failed to reach assistant")
      }

      const data = (await res.json()) as { text: string }
      setMessages((prev) => [...prev, { role: "assistant", content: data.text }])
      setPrompt("")
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I ran into an issue responding just now. Please try again, or open the full ARMIE Chat to continue.",
        },
      ])
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  function scrollToFeatures() {
    const el = document.getElementById("features")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.35),transparent_60%)] blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.28),transparent_60%)] blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.18),transparent_60%)] blur-3xl" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7))]" />
        {/* Fine film grain */}
        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:3px_3px]" />
      </div>

      {/* Top Navigation */}
      <header className="relative z-10 border-b border-white/10/0 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-indigo-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">ARMIE</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={scrollToFeatures}
              className="text-sm text-white/80 hover:text-white"
              aria-label="Scroll to features"
            >
              Features
            </button>
            <Link href="/about" className="text-sm text-white/80 hover:text-white">
              About
            </Link>
            <Link href="/auth/signin" className="text-sm text-white/80 hover:text-white">
              Sign In
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex min-h-[calc(100vh-64px)] items-center">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center">
          <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Your A.I. Powered Music Business Assistant
          </h1>
          <p className="mb-8 max-w-2xl text-balance text-white/80 sm:text-lg">
            Plan releases, generate contracts, create cover art, and grow your audience — all from one dashboard. Let
            ARMIE turn your ideas into daily, actionable steps.
          </p>

          {/* Assistant Input */}
          <form
            onSubmit={handleSubmit}
            className="mb-5 flex w-full max-w-2xl items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 shadow-lg backdrop-blur-md"
            aria-label="Ask ARMIE assistant"
          >
            <Input
              aria-label="Ask ARMIE anything"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask ARMIE to draft a booking contract, plan your EP rollout, or create a 30‑day growth plan..."
              className="h-12 flex-1 border-0 bg-transparent text-base text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-rose-600 px-5 text-white hover:from-purple-700 hover:to-rose-700 disabled:opacity-70"
            >
              {isSubmitting ? "Thinking..." : "Ask ARMIE"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Inline conversation preview */}
          {messages.length > 0 && (
            <div
              className="mb-6 w-full max-w-2xl rounded-xl border border-white/10 bg-white/5 p-4 text-left shadow-sm backdrop-blur"
              role="region"
              aria-live="polite"
            >
              <ul className="space-y-3">
                {messages.map((m, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div
                      className={`mt-1 h-6 w-6 shrink-0 rounded-full ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-indigo-500 to-purple-500"
                          : "bg-gradient-to-br from-rose-500 to-purple-600"
                      }`}
                      aria-hidden="true"
                    />
                    <p className="whitespace-pre-wrap text-sm text-white/90">{m.content}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <Link href="/dashboard/assistants/armie-chat">
                  <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    Continue in ARMIE Chat
                  </Button>
                </Link>
                <Button
                  onClick={() => setMessages([])}
                  variant="ghost"
                  className="text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Clear
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={scrollToFeatures}
              className="border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              Explore features
            </Button>
            <Link href="/dashboard/assistants/armie-chat">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Open ARMIE Chat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Isolated Features Section */}
      <section id="features" className="relative z-10 border-t border-white/10 bg-black/40 py-20 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built for modern artists</h2>
            <p className="mt-3 text-white/70">
              Everything you need to manage your career — strategy, creative, admin, and growth — in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Contracts */}
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Music Contract Assistant"
              description="Generate, edit, and understand agreements with AI guidance — from management to booking and beyond."
              href="/dashboard/contracts/wizard"
            />
            {/* Cover Art */}
            <FeatureCard
              icon={<Camera className="h-5 w-5" />}
              title="Cover Art Generator"
              description="Create professional artwork and keep assets organized for releases and promos."
              href="/dashboard/assistants/cover-art-generator"
            />
            {/* Tasks */}
            <FeatureCard
              icon={<ClipboardList className="h-5 w-5" />}
              title="Task & Release Planner"
              description="Turn goals into daily tasks and auto-schedule what matters most."
              href="/dashboard"
            />
            {/* Social */}
            <FeatureCard
              icon={<Megaphone className="h-5 w-5" />}
              title="Social Media Assistant"
              description="Draft posts, create content calendars, and stay on-brand across platforms."
              href="/dashboard/assistants/social-media-assistant"
            />
            {/* EPK */}
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="EPK & Press Tools"
              description="Generate EPKs and press releases that are ready to pitch."
              href="/dashboard/assistants/press-release-generator"
            />
            {/* EIN */}
            <FeatureCard
              icon={<Building2 className="h-5 w-5" />}
              title="EIN & Business Setup"
              description="Guided steps to register your business and get tax-ready."
              href="/dashboard/assistants/ein-manager"
            />
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/auth/signup">
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 hover:from-purple-700 hover:to-indigo-700">
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10 text-center text-sm text-white/60">
        <div className="mx-auto max-w-7xl px-4">
          <p>© {new Date().getFullYear()} ARMIE. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group relative block rounded-xl border border-white/10 bg-white/5 p-5 shadow-sm outline-none transition hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-purple-500"
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-rose-600 text-white">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{description}</p>
      <div className="mt-4 inline-flex items-center gap-1 text-sm text-white/80">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}
