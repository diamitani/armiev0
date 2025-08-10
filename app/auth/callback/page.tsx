"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function OAuthCallbackPage() {
  const router = useRouter()
  const search = useSearchParams()
  const next = search?.get("next") || "/dashboard"
  const [message, setMessage] = useState("Completing sign-in…")

  useEffect(() => {
    const supabase = getSupabaseClient()
    ;(async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)
      if (error) {
        // eslint-disable-next-line no-console
        console.error("OAuth exchange error:", error)
        setMessage("We couldn’t complete sign-in. Please try again.")
        router.replace("/auth/signin")
        return
      }
      router.replace(next)
    })()
  }, [router, next])

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 grid place-items-center p-4">
      <div className="text-sm text-neutral-300">{message}</div>
    </main>
  )
}
