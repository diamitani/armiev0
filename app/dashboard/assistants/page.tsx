"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AssistantsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the main dashboard which now displays all assistants
    router.replace("/dashboard")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <p className="text-lg text-muted-foreground">Redirecting to AI Assistants...</p>
    </div>
  )
}
