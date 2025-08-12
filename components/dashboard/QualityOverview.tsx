"use client"

import { Card, CardContent, CardHeader, List, ListItem, LinearProgress, Box, Typography } from "@mui/material"

const qualityGates = [
  { stage: "Initial QC", progress: 100, status: "Completed" },
  { stage: "Manuscript QC", progress: 75, status: "In Progress" },
  { stage: "Final QC", progress: 0, status: "Pending" },
]

export default function QualityOverview() {
  return (
    <Card>
      <CardHeader title="Quality Gates Progress" />
      <CardContent>
        <List>
          {qualityGates.map((gate) => (
            <ListItem key={gate.stage} sx={{ px: 0 }}>
              <Box sx={{ width: "100%" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">{gate.stage}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {gate.progress}%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={gate.progress} sx={{ height: 8, borderRadius: 4 }} />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {gate.status}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
