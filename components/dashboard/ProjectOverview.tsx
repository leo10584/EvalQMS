"use client"

import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material"
import { Add } from "@mui/icons-material"

const projects = [
  {
    id: "1",
    name: "Clinical Study Report - Phase III",
    status: "Writing",
    qualityScore: 92,
    dueDate: "2024-02-15",
    team: "Dr. Smith, J. Doe",
  },
  {
    id: "2",
    name: "Regulatory Submission Document",
    status: "Review",
    qualityScore: 88,
    dueDate: "2024-02-20",
    team: "M. Johnson, K. Lee",
  },
  {
    id: "3",
    name: "Protocol Amendment",
    status: "Approved",
    qualityScore: 96,
    dueDate: "2024-01-30",
    team: "Dr. Brown, S. Wilson",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Writing":
      return "primary"
    case "Review":
      return "warning"
    case "Approved":
      return "success"
    default:
      return "default"
  }
}

export default function ProjectOverview() {
  return (
    <Card>
      <CardHeader
        title="Active Projects"
        action={
          <Button variant="contained" startIcon={<Add />}>
            New Project
          </Button>
        }
      />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Quality Score</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Team</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    <Chip label={project.status} color={getStatusColor(project.status) as any} size="small" />
                  </TableCell>
                  <TableCell>{project.qualityScore}%</TableCell>
                  <TableCell>{project.dueDate}</TableCell>
                  <TableCell>{project.team}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
