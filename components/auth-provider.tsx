"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client"

type Provider = "google" | "github" | "apple" | "discord" | "facebook" | "twitter" | "spotify"

interface User {
  id: string
  email?: string
  user_metadata?: Record<string, any>
}

interface AuthContextType {
  user: User | null
  loading: boolean
  envMissing: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (
    email: string,
    password: string,
    name: string,
    artistName?: string,
  ) => Promise<{ success: boolean; error?: string }>
  signInWithOAuth: (
    provider: Provider,
    options?: { redirectTo?: string; queryParams?: Record<string, string> },
  ) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const envMissing = !isSupabaseConfigured()
  const supabase = getSupabaseClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    try {
      const { data } = await supabase.auth.getUser()
      setUser((data.user as unknown as User) ?? null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    loadUser()
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as unknown as User) ?? null)
    })
    return () => {
      sub.subscription.unsubscribe()
    }
  }, [supabase, loadUser])

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) return { success: false, error: error.message }
        setUser((data.user as unknown as User) ?? null)
        return { success: true }
      } catch (e: any) {
        return { success: false, error: e?.message || "Sign in failed" }
      }
    },
    [supabase],
  )

  const signUp = useCallback(
    async (email: string, password: string, name: string, artistName?: string) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              artist_name: artistName,
            },
          },
        })
        if (error) return { success: false, error: error.message }
        setUser((data.user as unknown as User) ?? null)
        return { success: true }
      } catch (e: any) {
        return { success: false, error: e?.message || "Sign up failed" }
      }
    },
    [supabase],
  )

  const signInWithOAuth = useCallback(
    async (provider: Provider, options?: { redirectTo?: string; queryParams?: Record<string, string> }) => {
      const redirectTo = options?.redirectTo || `${window.location.origin}/auth/callback?next=/dashboard`
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          queryParams: options?.queryParams,
        },
      })
    },
    [supabase],
  )

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
  }, [supabase])

  const refreshUser = useCallback(async () => {
    await loadUser()
  }, [loadUser])

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      envMissing,
      signIn,
      signUp,
      signInWithOAuth,
      signOut,
      refreshUser,
    }),
    [user, loading, envMissing, signIn, signUp, signInWithOAuth, signOut, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
