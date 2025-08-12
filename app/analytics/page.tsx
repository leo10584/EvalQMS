"use client"
import { Container, Typography, Box } from "@mui/material"
import AnalyticsReporting from "@/components/modules/analytics-reporting"

export default function AnalyticsPage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Analytics & Reporting
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View dashboards, generate reports, and analyze quality metrics
        </Typography>
      </Box>
      <AnalyticsReporting />
    </Container>
  )
}
