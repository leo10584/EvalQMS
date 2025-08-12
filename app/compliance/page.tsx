"use client"
import { Container, Typography, Box } from "@mui/material"
import ComplianceAudit from "@/components/modules/compliance-audit"

export default function CompliancePage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Compliance & Audit
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track audit trails, manage CAPA, and ensure regulatory compliance
        </Typography>
      </Box>
      <ComplianceAudit />
    </Container>
  )
}
