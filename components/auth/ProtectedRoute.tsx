"use client"

import type React from "react"
import { useSelector } from "react-redux"
import { Box, Typography, Button } from "@mui/material"
import { Lock } from "@mui/icons-material"
import type { RootState } from "@/store/store"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  fallbackPath?: string
}

export function ProtectedRoute({ children, requiredRoles = [], fallbackPath = "/" }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated || !user) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
        gap={2}
        p={4}
      >
        <Lock color="error" sx={{ fontSize: 48 }} />
        <Typography variant="h6" color="error">
          Access Denied
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          You need to be authenticated to access this resource.
        </Typography>
      </Box>
    )
  }

  // Check role-based access
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) => user.roles?.includes(role))

    if (!hasRequiredRole) {
      const handleGoBack = () => {
        window.location.href = fallbackPath
      }

      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="400px"
          gap={2}
          p={4}
        >
          <Lock color="warning" sx={{ fontSize: 48 }} />
          <Typography variant="h6" color="warning.main">
            Insufficient Permissions
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            You don't have the required permissions to access this resource.
            <br />
            Required roles: {requiredRoles.join(", ")}
          </Typography>
          <Button variant="outlined" onClick={handleGoBack} sx={{ mt: 2 }}>
            Go Back
          </Button>
        </Box>
      )
    }
  }

  return <>{children}</>
}
