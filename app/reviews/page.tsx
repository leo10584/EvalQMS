"use client"
import { Container, Typography, Box } from "@mui/material"
import ReviewApproval from "@/components/modules/review-approval"

export default function ReviewsPage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Review & Approval
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage review workflows and electronic signatures
        </Typography>
      </Box>
      <ReviewApproval />
    </Container>
  )
}
