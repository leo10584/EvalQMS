"use client"
import { Container, Typography, Box } from "@mui/material"
import QualityManagement from "@/components/modules/quality-management"

export default function QualityPage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quality Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor quality gates, track issues, and manage deviations
        </Typography>
      </Box>
      <QualityManagement />
    </Container>
  )
}
