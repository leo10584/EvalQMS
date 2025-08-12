"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, Clock, User, FileText, PenTool } from "lucide-react"

interface ReviewTask {
  id: string
  documentTitle: string
  project: string
  assignedTo: string
  dueDate: string
  status: "Pending" | "In Progress" | "Completed"
  reviewType: "Medical Review" | "Statistical Review" | "Quality Review" | "Final Approval"
}

interface ApprovalRecord {
  id: string
  documentTitle: string
  approver: string
  approvalDate: string
  signatureType: "Electronic Signature"
  meaning: string
}

export default function ReviewApproval() {
  const [reviewTasks] = useState<ReviewTask[]>([
    {
      id: "1",
      documentTitle: "Clinical Study Protocol - Phase III Oncology",
      project: "Phase III Oncology Study",
      assignedTo: "Dr. Sarah Johnson",
      dueDate: "2024-01-25",
      status: "Pending",
      reviewType: "Medical Review",
    },
    {
      id: "2",
      documentTitle: "Clinical Evaluation Report - Cardiac Device",
      project: "Cardiology Device Study",
      assignedTo: "QA Team",
      dueDate: "2024-01-22",
      status: "In Progress",
      reviewType: "Quality Review",
    },
    {
      id: "3",
      documentTitle: "Statistical Analysis Plan",
      project: "Phase III Oncology Study",
      assignedTo: "Biostatistician",
      dueDate: "2024-01-20",
      status: "Completed",
      reviewType: "Statistical Review",
    },
  ])

  const [approvalRecords] = useState<ApprovalRecord[]>([
    {
      id: "1",
      documentTitle: "Statistical Analysis Plan",
      approver: "Dr. Michael Chen",
      approvalDate: "2024-01-19 15:30:00 GMT",
      signatureType: "Electronic Signature",
      meaning: "Approved as Final Approver",
    },
  ])

  const [showSignDialog, setShowSignDialog] = useState(false)
  const [selectedTask, setSelectedTask] = useState<ReviewTask | null>(null)
  const [signatureComments, setSignatureComments] = useState("")

  const handleElectronicSignature = () => {
    // In a real implementation, this would:
    // 1. Re-authenticate the user (prompt for password/2FA)
    // 2. Create signature record with timestamp and user details
    // 3. Update document status
    // 4. Log audit trail entry

    console.log("Electronic signature process initiated for:", selectedTask?.documentTitle)
    console.log("Signature comments:", signatureComments)

    // Mock signature creation
    const newApproval: ApprovalRecord = {
      id: Date.now().toString(),
      documentTitle: selectedTask?.documentTitle || "",
      approver: "Current User", // Would be actual logged-in user
      approvalDate: new Date().toISOString(),
      signatureType: "Electronic Signature",
      meaning: "Approved as " + selectedTask?.reviewType,
    }

    setShowSignDialog(false)
    setSignatureComments("")
    setSelectedTask(null)

    // Would update state and backend here
    alert("Document electronically signed successfully!")
  }

  const getStatusColor = (status: ReviewTask["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getReviewTypeColor = (type: ReviewTask["reviewType"]) => {
    switch (type) {
      case "Medical Review":
        return "bg-purple-100 text-purple-800"
      case "Statistical Review":
        return "bg-blue-100 text-blue-800"
      case "Quality Review":
        return "bg-orange-100 text-orange-800"
      case "Final Approval":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review & Approval</h2>
        <p className="text-muted-foreground">Manage review workflows and electronic signatures</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Review Tasks */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Pending Reviews
              </CardTitle>
              <CardDescription>Documents awaiting review and approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviewTasks.map((task) => (
                <Card key={task.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{task.documentTitle}</h4>
                          <p className="text-sm text-muted-foreground">{task.project}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          <Badge className={getReviewTypeColor(task.reviewType)} variant="outline">
                            {task.reviewType}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <User className="mr-1 h-4 w-4" />
                          {task.assignedTo}
                        </div>
                        <span className="text-muted-foreground">Due: {task.dueDate}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-1 h-4 w-4" />
                          Review
                        </Button>
                        {task.status === "Completed" && (
                          <Dialog open={showSignDialog} onOpenChange={setShowSignDialog}>
                            <DialogTrigger asChild>
                              <Button size="sm" onClick={() => setSelectedTask(task)}>
                                <PenTool className="mr-1 h-4 w-4" />
                                Sign
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Electronic Signature</DialogTitle>
                                <DialogDescription>
                                  You are about to electronically sign this document in compliance with 21 CFR Part 11
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                  <h4 className="font-medium">Document Details</h4>
                                  <p className="text-sm text-muted-foreground mt-1">{selectedTask?.documentTitle}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Signature Meaning: {selectedTask?.reviewType}
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Comments (Optional)</label>
                                  <Textarea
                                    value={signatureComments}
                                    onChange={(e) => setSignatureComments(e.target.value)}
                                    placeholder="Add any comments about your approval..."
                                  />
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-lg">
                                  <p className="text-sm text-yellow-800">
                                    <strong>Important:</strong> By clicking "Sign Document", you are providing your
                                    electronic signature which has the same legal effect as a handwritten signature.
                                  </p>
                                </div>

                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setShowSignDialog(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleElectronicSignature}>
                                    <PenTool className="mr-2 h-4 w-4" />
                                    Sign Document
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Approval Records */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Electronic Signatures
              </CardTitle>
              <CardDescription>21 CFR Part 11 compliant signature records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {approvalRecords.map((record) => (
                <Card key={record.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">{record.documentTitle}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Approver:</span>
                          <p className="font-medium">{record.approver}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date/Time:</span>
                          <p className="font-medium">{record.approvalDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Signature Type:</span>
                          <p className="font-medium">{record.signatureType}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Meaning:</span>
                          <p className="font-medium">{record.meaning}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="mt-2">
                        Audit Trail Recorded
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {approvalRecords.length === 0 && (
                <div className="text-center py-8">
                  <PenTool className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">No signatures yet</h3>
                  <p className="text-muted-foreground">Electronic signatures will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
