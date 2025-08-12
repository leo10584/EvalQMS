"use client"

import type React from "react"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Keycloak from "keycloak-js"
import { setUser, clearUser } from "@/store/slices/authSlice"
import { Box } from "@mui/material"

const keycloak = new Keycloak({
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "mw-qms",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "mw-qms-client",
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
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
