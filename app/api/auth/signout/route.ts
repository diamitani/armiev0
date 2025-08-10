import { NextResponse } from "next/server"

export async function POST() {
  // Sign out is handled client-side with supabase.auth.signOut().
  // We keep this route for backward compatibility; it just returns success.
  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json({ success: false, error: "Method not allowed" }, { status: 405 })
}
