"use client"

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  LinearProgress,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
} from "@mui/material"
import { CheckCircle, Warning, Error } from "@mui/icons-material"

interface QualityGateProps {
  stage: "Initial" | "Manuscript" | "Final"
  status: "Not Started" | "In Progress" | "Completed" | "Failed"
  score: number
  completedItems: number
  totalItems: number
  checklist: Array<{
    id: string
    description: string
    completed: boolean
    mandatory: boolean
  }>
  onChecklistUpdate: (itemId: string, completed: boolean) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "success"
    case "In Progress":
      return "warning"
    case "Failed":
      return "error"
    default:
      return "default"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle color="success" />
    case "Failed":
      return <Error color="error" />
    default:
      return <Warning color="warning" />
  }
}

export default function QualityGateCard({
  stage,
  status,
  score,
  completedItems,
  totalItems,
  checklist,
  onChecklistUpdate,
}: QualityGateProps) {
  const progress = (completedItems / totalItems) * 100

  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{stage} QC</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              {getStatusIcon(status)}
              <Chip label={status} color={getStatusColor(status) as any} size="small" />
            </Box>
          </Box>
        }
        subheader={
          <Box>
            <Typography variant="body2" color="text.secondary">
              Quality Score: {score}% | Progress: {completedItems}/{totalItems}
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ mt: 1, height: 6, borderRadius: 3 }} />
          </Box>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Quality Checklist
        </Typography>
        <List dense>
          {checklist.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemIcon>
                <Checkbox
                  checked={item.completed}
                  onChange={(e) => onChecklistUpdate(item.id, e.target.checked)}
                  size="small"
                />
              </ListItemIcon>
              <ListItemText
                primary={item.description}
                secondary={item.mandatory ? "Mandatory" : "Optional"}
                primaryTypographyProps={{
                  style: { textDecoration: item.completed ? "line-through" : "none" },
                }}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small">
            Add Issue
          </Button>
          <Button variant="outlined" size="small">
            Request Deviation
          </Button>
          {status === "In Progress" && completedItems === totalItems && (
            <Button variant="contained" size="small" color="success">
              Complete Gate
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
