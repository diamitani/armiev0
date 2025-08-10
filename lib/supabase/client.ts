"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Fallbacks if env vars are not present (preview/local). Anon key can be public per Supabase docs with RLS enabled.
const FALLBACK_SUPABASE_URL = "https://tsggkvchqqwstdmewpvw.supabase.co"
const FALLBACK_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZ2drdmNocXF3c3RkbWV3cHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NzAxNzIsImV4cCI6MjA2MjM0NjE3Mn0.9vV31IK-X8eToi6pBG6lsjIquS27IDt6OvzEn_04c4U"

let supabaseClient: SupabaseClient | null = null

function resolveEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY
  return { url, anon }
}

export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) return supabaseClient

  const { url, anon } = resolveEnv()

  supabaseClient = createClient(url, anon, {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
      autoRefreshToken: true,
      flowType: "pkce",
    },
  })

  return supabaseClient
}

export function isSupabaseConfigured(): boolean {
  const hasEnv = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  // We still consider configured if fallbacks are present
  return hasEnv || (Boolean(FALLBACK_SUPABASE_URL) && Boolean(FALLBACK_SUPABASE_ANON_KEY))
}
