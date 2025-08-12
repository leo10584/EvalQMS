"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Box, CircularProgress, Typography } from "@mui/material"
import type { RootState } from "@/store/store"

interface SessionLoaderProps {
  children: React.ReactNode
  redirectTo?: string
}

export function SessionLoader({ children, redirectTo = "/login" }: SessionLoaderProps) {
  const { isAuthenticated, loading, user } = useSelector((state: RootState) => state.auth)
  const [redirectState, setRedirectState] = useState<"idle" | "redirecting" | "complete">("idle")

  useEffect(() => {
    console.log("SessionLoader - Auth state:", { isAuthenticated, loading, user: user?.name })

    if (!loading && !isAuthenticated) {
      console.log("SessionLoader - User not authenticated, preparing redirect")
      setRedirectState("redirecting")

      setTimeout(() => {
        console.log("SessionLoader - Redirecting to:", redirectTo)
        window.location.href = redirectTo
      }, 1000)
    } else if (!loading && isAuthenticated) {
      setRedirectState("complete")
    }
  }, [isAuthenticated, loading, redirectTo, user])

  if (loading || redirectState === "idle") {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" gap={2}>
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Loading session...
        </Typography>
      </Box>
    )
  }

  if (redirectState === "redirecting") {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" gap={2}>
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Redirecting to login...
        </Typography>
      </Box>
    )
  }

  if (!isAuthenticated) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" gap={2}>
        <Typography variant="h6" color="error">
          Authentication Required
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please log in to access this application.
        </Typography>
      </Box>
    )
  }

  return <>{children}</>
}