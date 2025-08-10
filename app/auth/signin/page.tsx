"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ImagesIcon as Icons } from "lucide-react"

export default function SignInPage() {
  const { signInWithOAuth, envMissing, user } = useAuth()
  const search = useSearchParams()
  const next = search?.get("next") || "/dashboard"

  useEffect(() => {
    // If already logged in, forward to next
    if (user) {
      window.location.replace(next)
    }
  }, [user, next])

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 grid place-items-center p-4">
      <Card className="w-full max-w-md bg-neutral-900/60 border-neutral-800 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl">Sign in to Armie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {envMissing && (
            <Alert variant="destructive">
              <AlertTitle>Supabase not configured</AlertTitle>
              <AlertDescription>
                Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable OAuth sign-in.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-3">
            <Button
              disabled={envMissing}
              className="w-full justify-center"
              variant="default"
              onClick={() =>
                signInWithOAuth("google", {
                  redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
                })
              }
            >
              <span className="mr-2 inline-flex">
                <Icons name="mail" />
              </span>
              Continue with Google
            </Button>

            <Button
              disabled={envMissing}
              className="w-full justify-center"
              variant="secondary"
              onClick={() =>
                signInWithOAuth("spotify", {
                  redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
                })
              }
            >
              Continue with Spotify
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
