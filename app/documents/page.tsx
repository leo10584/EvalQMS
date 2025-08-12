"use client"
import { Container, Typography, Box } from "@mui/material"
import DocumentManagement from "@/components/modules/document-management"

export default function DocumentsPage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Document Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create, edit, and collaborate on medical writing documents
        </Typography>
      </Box>
      <DocumentManagement />
    </Container>
  )
}
