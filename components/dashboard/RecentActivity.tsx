"use client"

import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material"
import { Assignment, CheckCircle, RateReview, Warning } from "@mui/icons-material"

const activities = [
  {
    id: "1",
    type: "project_created",
    message: 'New project "Clinical Study Report - Phase III" created',
    user: "Dr. Smith",
    timestamp: "2 hours ago",
    icon: <Assignment />,
  },
  {
    id: "2",
    type: "quality_passed",
    message: "Initial QC completed for Protocol Amendment",
    user: "Quality Team",
    timestamp: "4 hours ago",
    icon: <CheckCircle />,
  },
  {
    id: "3",
    type: "review_submitted",
    message: "Review submitted for Regulatory Submission Document",
    user: "M. Johnson",
    timestamp: "6 hours ago",
    icon: <RateReview />,
  },
  {
    id: "4",
    type: "issue_raised",
    message: "Critical issue raised in manuscript review",
    user: "K. Lee",
    timestamp: "1 day ago",
    icon: <Warning />,
  },
]

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader title="Recent Activity" />
      <CardContent>
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>{activity.icon}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={activity.message}
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {activity.user} • {activity.timestamp}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
