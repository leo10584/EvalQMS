"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Users, Plus, Edit, Eye } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "Initiation" | "Writing" | "In Review" | "Completed"
  therapeuticArea: string
  startDate: string
  endDate: string
  progress: number
  team: string[]
  qualityScore?: number
}

export function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Phase III Oncology Study Protocol",
      description: "Clinical study protocol for advanced melanoma treatment",
      status: "Writing",
      therapeuticArea: "Oncology",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      progress: 65,
      team: ["Dr. Sarah Johnson", "Medical Writer A", "QA Reviewer"],
      qualityScore: 82,
    },
    {
      id: "2",
      name: "Cardiology Device Clinical Evaluation",
      description: "Clinical evaluation report for cardiac monitoring device",
      status: "In Review",
      therapeuticArea: "Cardiology",
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      progress: 90,
      team: ["Dr. Michael Chen", "Medical Writer B", "Regulatory Reviewer"],
      qualityScore: 91,
    },
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    therapeuticArea: "",
    startDate: "",
    endDate: "",
  })

  const handleCreateProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      status: "Initiation",
      progress: 0,
      team: [],
    }
    setProjects([...projects, project])
    setNewProject({ name: "", description: "", therapeuticArea: "", startDate: "", endDate: "" })
    setShowCreateDialog(false)
  }

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Initiation":
        return "bg-blue-100 text-blue-800"
      case "Writing":
        return "bg-yellow-100 text-yellow-800"
      case "In Review":
        return "bg-purple-100 text-purple-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-muted-foreground">Manage medical writing projects and timelines</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Set up a new medical writing project with initial parameters</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Enter project name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Brief project description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="therapeutic-area">Therapeutic Area</Label>
                  <Select
                    value={newProject.therapeuticArea}
                    onValueChange={(value) => setNewProject({ ...newProject, therapeuticArea: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oncology">Oncology</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="immunology">Immunology</SelectItem>
                      <SelectItem value="respiratory">Respiratory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">Target Completion Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={newProject.endDate}
                  onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {project.startDate} - {project.endDate}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {project.team.length} members
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  {project.qualityScore && <Badge variant="outline">Quality: {project.qualityScore}%</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{project.therapeuticArea}</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No projects yet</h3>
                <p className="text-muted-foreground">Get started by creating your first medical writing project</p>
              </div>
              <Button onClick={() => setShowCreateDialog(true)}>Create Your First Project</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
