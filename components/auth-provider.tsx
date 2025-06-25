"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  plan: string
  avatar?: string
  signedIn: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (userData: User) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing user session immediately
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("armie_user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          if (userData.signedIn) {
            setUser(userData)
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("armie_user")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = (userData: User) => {
    try {
      localStorage.setItem("armie_user", JSON.stringify(userData))
      setUser(userData)
      setIsLoading(false)
      // Immediate redirect to dashboard
      router.replace("/")
    } catch (error) {
      console.error("Sign in error:", error)
    }
  }

  const signOut = () => {
    try {
      localStorage.removeItem("armie_user")
      setUser(null)
      router.replace("/landing")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const value = {
    user,
    isAuthenticated: !!user?.signedIn,
    isLoading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
