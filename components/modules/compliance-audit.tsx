"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, FileText, AlertTriangle, Search, Download } from "lucide-react"

interface AuditEntry {
  id: string
  timestamp: string
  userId: string
  userName: string
  entityType: string
  entityId: string
  action: string
  description: string
  ipAddress?: string
}

interface ComplianceMapping {
  id: string
  regulation: string
  requirement: string
  systemFeature: string
  status: "Compliant" | "Partial" | "Not Applicable"
}

interface CAPA {
  id: string
  title: string
  description: string
  rootCause: string
  correctiveAction: string
  preventiveAction: string
  owner: string
  dueDate: string
  status: "Open" | "In Progress" | "Closed"
  priority: "High" | "Medium" | "Low"
}

export function ComplianceAudit() {
  const [auditEntries] = useState<AuditEntry[]>([
    {
      id: "1",
      timestamp: "2024-01-20 14:30:15 GMT",
      userId: "user123",
      userName: "Dr. Sarah Johnson",
      entityType: "Document",
      entityId: "doc456",
      action: "UPDATE",
      description: "Document content modified in section 3.2",
      ipAddress: "192.168.1.100",
    },
    {
      id: "2",
      timestamp: "2024-01-20 13:45:22 GMT",
      userId: "user789",
      userName: "Dr. Michael Chen",
      entityType: "Approval",
      entityId: "approval123",
      action: "SIGN",
      description: "Electronic signature applied - Approved as Final Approver",
      ipAddress: "192.168.1.101",
    },
    {
      id: "3",
      timestamp: "2024-01-20 12:15:08 GMT",
      userId: "user456",
      userName: "QA Reviewer",
      entityType: "QualityIssue",
      entityId: "issue789",
      action: "CREATE",
      description: "Quality issue logged: Reference formatting inconsistency",
      ipAddress: "192.168.1.102",
    },
  ])

  const [complianceMappings] = useState<ComplianceMapping[]>([
    {
      id: "1",
      regulation: "21 CFR Part 11",
      requirement: "11.10(a) - Validation of systems",
      systemFeature: "System validation documentation and testing",
      status: "Compliant",
    },
    {
      id: "2",
      regulation: "21 CFR Part 11",
      requirement: "11.10(e) - Audit trails",
      systemFeature: "Comprehensive audit logging system",
      status: "Compliant",
    },
    {
      id: "3",
      regulation: "21 CFR Part 11",
      requirement: "11.200(a) - Electronic signatures",
      systemFeature: "Electronic signature workflow with re-authentication",
      status: "Compliant",
    },
    {
      id: "4",
      regulation: "ICH GCP",
      requirement: "Data integrity and traceability",
      systemFeature: "Version control and change tracking",
      status: "Compliant",
    },
  ])

  const [capas] = useState<CAPA[]>([
    {
      id: "1",
      title: "Improve reference formatting validation",
      description: "Multiple projects have had reference formatting issues",
      rootCause: "Lack of automated reference format checking",
      correctiveAction: "Implement automated reference validation rules",
      preventiveAction: "Add reference formatting training to onboarding",
      owner: "QA Manager",
      dueDate: "2024-02-15",
      status: "In Progress",
      priority: "Medium",
    },
  ])

  const [auditFilters, setAuditFilters] = useState({
    dateFrom: "",
    dateTo: "",
    user: "",
    action: "",
    entityType: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant":
        return "bg-green-100 text-green-800"
      case "Partial":
        return "bg-yellow-100 text-yellow-800"
      case "Not Applicable":
        return "bg-gray-100 text-gray-800"
      case "Open":
        return "bg-red-100 text-red-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Closed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Compliance & Audit</h2>
        <p className="text-muted-foreground">Regulatory compliance tracking and audit trail management</p>
      </div>

      <Tabs defaultValue="audit-trail" className="space-y-6">
        <TabsList>
          <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Matrix</TabsTrigger>
          <TabsTrigger value="capa">CAPA Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="audit-trail" className="space-y-6">
          {/* Audit Trail Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Audit Trail Filters
              </CardTitle>
              <CardDescription>Filter audit entries by date, user, or action type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From Date</label>
                  <Input
                    type="date"
                    value={auditFilters.dateFrom}
                    onChange={(e) => setAuditFilters({ ...auditFilters, dateFrom: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To Date</label>
                  <Input
                    type="date"
                    value={auditFilters.dateTo}
                    onChange={(e) => setAuditFilters({ ...auditFilters, dateTo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">User</label>
                  <Select
                    value={auditFilters.user}
                    onValueChange={(value) => setAuditFilters({ ...auditFilters, user: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-users">All users</SelectItem>
                      <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                      <SelectItem value="QA Reviewer">QA Reviewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Action</label>
                  <Select
                    value={auditFilters.action}
                    onValueChange={(value) => setAuditFilters({ ...auditFilters, action: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All actions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-actions">All actions</SelectItem>
                      <SelectItem value="CREATE">CREATE</SelectItem>
                      <SelectItem value="UPDATE">UPDATE</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="SIGN">SIGN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Entries */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Audit Entries</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <CardDescription>Complete system activity log for compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditEntries.map((entry) => (
                  <Card key={entry.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Timestamp</span>
                          <p className="font-mono text-sm">{entry.timestamp}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">User</span>
                          <p className="font-medium">{entry.userName}</p>
                          <p className="text-xs text-muted-foreground">ID: {entry.userId}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Action</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{entry.action}</Badge>
                            <span className="text-sm">{entry.entityType}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">IP Address</span>
                          <p className="font-mono text-sm">{entry.ipAddress}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-sm text-muted-foreground">Description</span>
                        <p className="text-sm">{entry.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Regulatory Compliance Matrix
              </CardTitle>
              <CardDescription>Mapping of system features to regulatory requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceMappings.map((mapping) => (
                  <Card key={mapping.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{mapping.regulation}</h4>
                          <p className="text-sm text-muted-foreground">{mapping.requirement}</p>
                        </div>
                        <Badge className={getStatusColor(mapping.status)}>{mapping.status}</Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">System Implementation:</span>
                        <p className="text-sm">{mapping.systemFeature}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capa" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                CAPA Tracking
              </CardTitle>
              <CardDescription>Corrective and Preventive Action management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {capas.map((capa) => (
                  <Card key={capa.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{capa.title}</h4>
                          <p className="text-sm text-muted-foreground">{capa.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getPriorityColor(capa.priority)}>{capa.priority}</Badge>
                          <Badge className={getStatusColor(capa.status)}>{capa.status}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Root Cause:</span>
                          <p>{capa.rootCause}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Corrective Action:</span>
                          <p>{capa.correctiveAction}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Preventive Action:</span>
                          <p>{capa.preventiveAction}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Owner:</span>
                          <p>{capa.owner}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <span className="text-sm text-muted-foreground">Due: {capa.dueDate}</span>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-1 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
