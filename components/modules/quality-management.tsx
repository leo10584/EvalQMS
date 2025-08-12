"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus } from "lucide-react"

interface QualityGate {
  id: string
  name: string
  stage: "Initial" | "Manuscript" | "Final"
  status: "Not Started" | "In Progress" | "Completed" | "Failed"
  score: number
  items: QualityCheckItem[]
}

interface QualityCheckItem {
  id: string
  description: string
  isMandatory: boolean
  isCompleted: boolean
  comments?: string
}

interface QualityIssue {
  id: string
  title: string
  description: string
  severity: "Critical" | "Major" | "Minor"
  status: "Open" | "In Progress" | "Resolved"
  assignedTo: string
  createdDate: string
}

export default function QualityManagement() {
  const [qualityGates, setQualityGates] = useState<QualityGate[]>([
    {
      id: "1",
      name: "Initial Quality Control",
      stage: "Initial",
      status: "Completed",
      score: 85,
      items: [
        { id: "1", description: "Protocol requirements reviewed", isMandatory: true, isCompleted: true },
        { id: "2", description: "Regulatory guidelines checked", isMandatory: true, isCompleted: true },
        { id: "3", description: "Template structure verified", isMandatory: false, isCompleted: true },
      ],
    },
    {
      id: "2",
      name: "Manuscript Quality Control",
      stage: "Manuscript",
      status: "In Progress",
      score: 72,
      items: [
        { id: "4", description: "Statistical analysis plan reviewed", isMandatory: true, isCompleted: true },
        { id: "5", description: "References cross-checked", isMandatory: true, isCompleted: false },
        { id: "6", description: "Formatting consistency verified", isMandatory: false, isCompleted: true },
      ],
    },
    {
      id: "3",
      name: "Final Quality Control",
      stage: "Final",
      status: "Not Started",
      score: 0,
      items: [
        { id: "7", description: "Final review completed", isMandatory: true, isCompleted: false },
        { id: "8", description: "All issues resolved", isMandatory: true, isCompleted: false },
        { id: "9", description: "Compliance verification", isMandatory: true, isCompleted: false },
      ],
    },
  ])

  const [qualityIssues, setQualityIssues] = useState<QualityIssue[]>([
    {
      id: "1",
      title: "Reference formatting inconsistency",
      description: "References 15-20 do not follow the required journal format",
      severity: "Major",
      status: "Open",
      assignedTo: "Medical Writer A",
      createdDate: "2024-01-20",
    },
    {
      id: "2",
      title: "Missing statistical significance values",
      description: "P-values missing in Table 3 results section",
      severity: "Critical",
      status: "In Progress",
      assignedTo: "Biostatistician",
      createdDate: "2024-01-18",
    },
  ])

  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    severity: "Minor" as const,
    assignedTo: "",
  })

  const handleChecklistUpdate = (gateId: string, itemId: string, completed: boolean) => {
    setQualityGates((gates) =>
      gates.map((gate) => {
        if (gate.id === gateId) {
          const updatedItems = gate.items.map((item) =>
            item.id === itemId ? { ...item, isCompleted: completed } : item,
          )
          const completedMandatory = updatedItems.filter((item) => item.isMandatory && item.isCompleted).length
          const totalMandatory = updatedItems.filter((item) => item.isMandatory).length
          const newScore = totalMandatory > 0 ? Math.round((completedMandatory / totalMandatory) * 100) : 0

          return {
            ...gate,
            items: updatedItems,
            score: newScore,
            status: newScore === 100 ? "Completed" : newScore > 0 ? "In Progress" : "Not Started",
          }
        }
        return gate
      }),
    )
  }

  const addQualityIssue = () => {
    if (newIssue.title && newIssue.description) {
      const issue: QualityIssue = {
        id: Date.now().toString(),
        ...newIssue,
        status: "Open",
        createdDate: new Date().toISOString().split("T")[0],
      }
      setQualityIssues([...qualityIssues, issue])
      setNewIssue({ title: "", description: "", severity: "Minor", assignedTo: "" })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "Major":
        return "bg-orange-100 text-orange-800"
      case "Minor":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Quality Management</h2>
        <p className="text-muted-foreground">Three-stage quality control with automated scoring</p>
      </div>

      <Tabs defaultValue="gates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="gates">Quality Gates</TabsTrigger>
          <TabsTrigger value="issues">Issues Tracking</TabsTrigger>
          <TabsTrigger value="deviations">Deviations</TabsTrigger>
        </TabsList>

        <TabsContent value="gates" className="space-y-6">
          {/* Quality Gates Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qualityGates.map((gate) => (
              <Card key={gate.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{gate.name}</CardTitle>
                    <Badge className={getStatusColor(gate.status)}>{gate.status}</Badge>
                  </div>
                  <CardDescription>{gate.stage} QC Stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Quality Score</span>
                        <span className="font-medium">{gate.score}%</span>
                      </div>
                      <Progress value={gate.score} />
                    </div>

                    <div className="space-y-2">
                      {gate.items.map((item) => (
                        <div key={item.id} className="flex items-start space-x-2">
                          <Checkbox
                            checked={item.isCompleted}
                            onCheckedChange={(checked) => handleChecklistUpdate(gate.id, item.id, checked as boolean)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${item.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                              {item.description}
                              {item.isMandatory && <span className="text-red-500 ml-1">*</span>}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-6">
          {/* Add New Issue */}
          <Card>
            <CardHeader>
              <CardTitle>Log New Quality Issue</CardTitle>
              <CardDescription>Report quality issues for tracking and resolution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Issue Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newIssue.title}
                    onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                    placeholder="Brief issue description"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Severity</label>
                  <Select
                    value={newIssue.severity}
                    onValueChange={(value: any) => setNewIssue({ ...newIssue, severity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="Major">Major</SelectItem>
                      <SelectItem value="Minor">Minor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                  placeholder="Detailed issue description"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assign To</label>
                <Select
                  value={newIssue.assignedTo}
                  onValueChange={(value) => setNewIssue({ ...newIssue, assignedTo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medical Writer A">Medical Writer A</SelectItem>
                    <SelectItem value="Medical Writer B">Medical Writer B</SelectItem>
                    <SelectItem value="QA Reviewer">QA Reviewer</SelectItem>
                    <SelectItem value="Biostatistician">Biostatistician</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addQualityIssue}>
                <Plus className="mr-2 h-4 w-4" />
                Log Issue
              </Button>
            </CardContent>
          </Card>

          {/* Issues List */}
          <div className="space-y-4">
            {qualityIssues.map((issue) => (
              <Card key={issue.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{issue.title}</CardTitle>
                      <CardDescription>{issue.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getSeverityColor(issue.severity)}>{issue.severity}</Badge>
                      <Badge variant="outline">{issue.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Assigned to: {issue.assignedTo}</span>
                    <span>Created: {issue.createdDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deviations">
          <Card>
            <CardHeader>
              <CardTitle>Deviation Management</CardTitle>
              <CardDescription>Track and approve deviations from standard procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No deviations recorded</h3>
                <p className="text-muted-foreground">Deviations will appear here when raised</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
