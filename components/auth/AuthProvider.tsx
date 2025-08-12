"use client"

import type React from "react"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Keycloak from "keycloak-js"
import { setUser, clearUser } from "@/store/slices/authSlice"
import { Box } from "@mui/material"

const isDevelopment = process.env.NODE_ENV === "development"
const hasKeycloakConfig =
  process.env.NEXT_PUBLIC_KEYCLOAK_URL &&
  process.env.NEXT_PUBLIC_KEYCLOAK_REALM &&
  process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID

const keycloak = hasKeycloakConfig
  ? new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL!,
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM!,
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
    })
  : null

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (isDevelopment && !hasKeycloakConfig) {
      // Mock user for development
      dispatch(
        setUser({
          id: "dev-user-1",
          name: "Dr. Sarah Johnson",
          email: "sarah.johnson@mw-qms.com",
          roles: ["medical-writer", "project-manager", "qa-reviewer"],
        }),
      )
      return
    }

    if (!keycloak) {
      dispatch(clearUser())
      return
    }

    keycloak
      .init({ onLoad: "login-required" })
      .then((authenticated) => {
        if (authenticated && keycloak.tokenParsed) {
          dispatch(
            setUser({
              id: keycloak.subject || "",
              name: keycloak.tokenParsed.name || "",
              email: keycloak.tokenParsed.email || "",
              roles: keycloak.tokenParsed.realm_access?.roles || [],
            }),
          )
        } else {
          dispatch(clearUser())
        }
      })
      .catch(() => {
        dispatch(clearUser())
      })
  }, [dispatch])

  return <Box sx={{ minHeight: "100vh" }}>{children}</Box>
}
