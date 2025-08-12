"use client"

import { Grid, Card, CardContent, Typography, Box } from "@mui/material"
import { TrendingUp, Assignment, CheckCircle, Warning } from "@mui/icons-material"

const metrics = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2 from last month",
    icon: <Assignment color="primary" />,
    color: "primary.main",
  },
  {
    title: "Quality Score",
    value: "94%",
    change: "+3% improvement",
    icon: <CheckCircle color="success" />,
    color: "success.main",
  },
  {
    title: "On-Time Delivery",
    value: "87%",
    change: "+5% improvement",
    icon: <TrendingUp color="info" />,
    color: "info.main",
  },
  {
    title: "Open Issues",
    value: "8",
    change: "-4 from last week",
    icon: <Warning color="warning" />,
    color: "warning.main",
  },
]

export default function DashboardMetrics() {
  return (
    <Grid container spacing={3}>
      {metrics.map((metric) => (
        <Grid item xs={12} sm={6} md={3} key={metric.title}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    {metric.title}
                  </Typography>
                  <Typography variant="h4" component="div">
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {metric.change}
                  </Typography>
                </Box>
                <Box sx={{ color: metric.color }}>{metric.icon}</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
