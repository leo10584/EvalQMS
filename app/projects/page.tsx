"use client"
import { Container, Typography, Box } from "@mui/material"
import ProjectManagement from "@/components/modules/project-management"

export default function ProjectsPage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Project Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage medical writing projects, timelines, and team assignments
        </Typography>
      </Box>
      <ProjectManagement />
    </Container>
  )
}
