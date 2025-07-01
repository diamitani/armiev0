"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  signedIn: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for existing user session
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("armie_user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        localStorage.removeItem("armie_user")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData: User = {
        id: "user-" + Date.now(),
        name: email
          .split("@")[0]
          .replace(/[^a-zA-Z]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        email,
        avatar: "/placeholder-user.jpg",
        signedIn: true,
      }

      setUser(userData)
      localStorage.setItem("armie_user", JSON.stringify(userData))
      router.push("/dashboard")
    } catch (error) {
      throw new Error("Sign in failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData: User = {
        id: "user-" + Date.now(),
        name,
        email,
        avatar: "/placeholder-user.jpg",
        signedIn: true,
      }

      setUser(userData)
      localStorage.setItem("armie_user", JSON.stringify(userData))
      router.push("/dashboard")
    } catch (error) {
      throw new Error("Sign up failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("armie_user")
    router.push("/landing")
  }

  // Redirect logic for protected routes
  useEffect(() => {
    if (!isLoading) {
      const isAuthPage = pathname?.startsWith("/auth/")
      const isLandingPage = pathname === "/landing"
      const isPublicPage = isAuthPage || isLandingPage || pathname === "/"

      if (!user?.signedIn && !isPublicPage) {
        // Redirect unauthenticated users to landing page
        router.replace("/landing")
      } else if (user?.signedIn && (isAuthPage || pathname === "/" || isLandingPage)) {
        // Redirect authenticated users to main dashboard
        router.replace("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
