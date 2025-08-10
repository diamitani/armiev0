import type React from "react"
import type { Metadata } from "next"
import AuthGate from "@/components/auth-gate"

export const metadata: Metadata = {
  title: "Dashboard • Armie",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthGate>{children}</AuthGate>
}
