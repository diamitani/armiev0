"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      const next = encodeURIComponent(pathname || "/dashboard")
      router.replace(`/auth/signin?next=${next}`)
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return (
      <main className="min-h-[50vh] grid place-items-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </main>
    )
  }

  if (!user) return null
  return <>{children}</>
}
