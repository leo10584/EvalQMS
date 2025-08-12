"use client"

import type React from "react"

import { useState } from "react"
import { useSelector } from "react-redux"
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Tabs,
  Tab,
  Avatar,
  IconButton,
  Badge,
  Alert,
  AlertTitle,
} from "@mui/material"
import { Settings, Notifications } from "@mui/icons-material"
import type { RootState } from "@/store/store"
import { SessionLoader } from "@/components/auth/SessionLoader"
import Navigation from "@/components/layout/Navigation"
import DashboardMetrics from "@/components/dashboard/DashboardMetrics"
import ProjectOverview from "@/components/dashboard/ProjectOverview"
import QualityOverview from "@/components/dashboard/QualityOverview"
import RecentActivity from "@/components/dashboard/RecentActivity"

function DashboardContent() {
  const [activeTab, setActiveTab] = useState(0)
  const { user } = useSelector((state: RootState) => state.auth)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Navigation />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}>
        {/* Header */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Medical Writing Quality Management System
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Settings />
              </IconButton>
              <Avatar sx={{ bgcolor: "primary.main" }}>{user?.name?.charAt(0) || "U"}</Avatar>
              <Typography variant="body2">{user?.name || "User"}</Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
          {/* Navigation Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="MW-QMS modules">
              <Tab label="Dashboard" />
              <Tab label="Projects" />
              <Tab label="Quality" />
              <Tab label="Documents" />
              <Tab label="Reviews" />
              <Tab label="Compliance" />
              <Tab label="Analytics" />
            </Tabs>
          </Box>

          {/* Dashboard Content */}
          {activeTab === 0 && (
            <Box>
              {/* Key Metrics */}
              <DashboardMetrics />

              {/* Main Content Grid */}
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} lg={8}>
                  <ProjectOverview />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <QualityOverview />
                    </Grid>
                    <Grid item xs={12}>
                      <RecentActivity />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Alerts */}
              <Box sx={{ mt: 3 }}>
                <Alert severity="warning">
                  <AlertTitle>Attention Required</AlertTitle>
                  You have 3 open quality issues that require immediate attention.
                </Alert>
              </Box>
            </Box>
          )}

          {/* Other module content would go here */}
          {activeTab === 1 && <Typography variant="h5">Project Management Module</Typography>}
          {activeTab === 2 && <Typography variant="h5">Quality Management Module</Typography>}
          {activeTab === 3 && <Typography variant="h5">Document Management Module</Typography>}
          {activeTab === 4 && <Typography variant="h5">Review & Approval Module</Typography>}
          {activeTab === 5 && <Typography variant="h5">Compliance & Audit Module</Typography>}
          {activeTab === 6 && <Typography variant="h5">Analytics & Reporting Module</Typography>}
        </Container>
      </Box>
    </Box>
  )
}

export default function Dashboard() {
  return (
    <SessionLoader>
      <DashboardContent />
    </SessionLoader>
  )
}
