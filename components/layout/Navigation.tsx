"use client"
import { usePathname } from "next/navigation"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from "@mui/material"
import { Dashboard, Assignment, VerifiedUser, Description, RateReview, Gavel, Analytics } from "@mui/icons-material"

const drawerWidth = 240

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Projects", icon: <Assignment />, path: "/projects" },
  { text: "Quality Management", icon: <VerifiedUser />, path: "/quality" },
  { text: "Documents", icon: <Description />, path: "/documents" },
  { text: "Review & Approval", icon: <RateReview />, path: "/reviews" },
  { text: "Compliance & Audit", icon: <Gavel />, path: "/compliance" },
  { text: "Analytics", icon: <Analytics />, path: "/analytics" },
]

export default function Navigation() {
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path
    }
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          MW-QMS
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "primary.contrastText",
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
