"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Edit, Eye, Clock, MessageSquare, Save } from "lucide-react"

interface Document {
  id: string
  title: string
  project: string
  status: "Draft" | "In Review" | "Approved"
  lastModified: string
  version: string
  author: string
  wordCount: number
}

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  resolved: boolean
}

export function DocumentManagement() {
  const [documents] = useState<Document[]>([
    {
      id: "1",
      title: "Clinical Study Protocol - Phase III Oncology",
      project: "Phase III Oncology Study",
      status: "Draft",
      lastModified: "2024-01-20 14:30",
      version: "1.2",
      author: "Dr. Sarah Johnson",
      wordCount: 12450,
    },
    {
      id: "2",
      title: "Clinical Evaluation Report - Cardiac Device",
      project: "Cardiology Device Study",
      status: "In Review",
      lastModified: "2024-01-19 16:45",
      version: "2.1",
      author: "Dr. Michael Chen",
      wordCount: 8920,
    },
  ])

  const [activeDocument, setActiveDocument] = useState<Document | null>(documents[0])
  const [documentContent, setDocumentContent] = useState(`# Clinical Study Protocol

## 1. Introduction

This protocol describes a Phase III, randomized, double-blind, placebo-controlled study to evaluate the efficacy and safety of the investigational treatment in patients with advanced melanoma.

## 2. Study Objectives

### 2.1 Primary Objective
To demonstrate the superiority of the investigational treatment compared to placebo in terms of overall survival (OS) in patients with advanced melanoma.

### 2.2 Secondary Objectives
- To evaluate progression-free survival (PFS)
- To assess objective response rate (ORR)
- To evaluate safety and tolerability
- To assess quality of life measures

## 3. Study Design

This is a multicenter, randomized, double-blind, placebo-controlled Phase III study. Approximately 600 patients will be randomized in a 2:1 ratio to receive either the investigational treatment or placebo.

## 4. Patient Population

### 4.1 Inclusion Criteria
- Age ≥ 18 years
- Histologically confirmed advanced melanoma
- ECOG performance status 0-1
- Adequate organ function

### 4.2 Exclusion Criteria
- Prior systemic therapy for advanced melanoma
- Active brain metastases
- Significant cardiovascular disease
- Pregnancy or nursing`)

  const [comments] = useState<Comment[]>([
    {
      id: "1",
      author: "QA Reviewer",
      content: "Please verify the inclusion criteria align with the statistical analysis plan.",
      timestamp: "2024-01-20 10:15",
      resolved: false,
    },
    {
      id: "2",
      author: "Medical Writer B",
      content: "Consider adding more detail to the safety monitoring section.",
      timestamp: "2024-01-19 14:30",
      resolved: true,
    },
  ])

  const getStatusColor = (status: Document["status"]) => {
    switch (status) {
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "In Review":
        return "bg-blue-100 text-blue-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Document Management</h2>
        <p className="text-muted-foreground">Collaborative document editing with version control</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeDocument?.id === doc.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveDocument(doc)}
                >
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm leading-tight">{doc.title}</h4>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(doc.status)} variant="secondary">
                        {doc.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">v{doc.version}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{doc.wordCount.toLocaleString()} words</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Document Editor */}
        <div className="lg:col-span-3">
          {activeDocument ? (
            <div className="space-y-4">
              {/* Document Header */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{activeDocument.title}</CardTitle>
                      <CardDescription>
                        Project: {activeDocument.project} • Version {activeDocument.version}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Clock className="mr-2 h-4 w-4" />
                        History
                      </Button>
                      <Button size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Author: {activeDocument.author}</span>
                    <span>Last modified: {activeDocument.lastModified}</span>
                    <span>{activeDocument.wordCount.toLocaleString()} words</span>
                  </div>
                </CardHeader>
              </Card>

              {/* Editor Tabs */}
              <Tabs defaultValue="editor" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="editor">
                    <Edit className="mr-2 h-4 w-4" />
                    Editor
                  </TabsTrigger>
                  <TabsTrigger value="preview">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="comments">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Comments ({comments.filter((c) => !c.resolved).length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="editor">
                  <Card>
                    <CardContent className="p-0">
                      <Textarea
                        value={documentContent}
                        onChange={(e) => setDocumentContent(e.target.value)}
                        className="min-h-[600px] border-0 resize-none font-mono text-sm"
                        placeholder="Start writing your document..."
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preview">
                  <Card>
                    <CardContent className="p-6">
                      <div className="prose max-w-none">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: documentContent
                              .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                              .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                              .replace(/^### (.*$)/gm, "<h3>$1</h3>")
                              .replace(/\n/g, "<br>"),
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="comments">
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <Card key={comment.id} className={comment.resolved ? "opacity-60" : ""}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium text-sm">{comment.author}</div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                              {comment.resolved && (
                                <Badge variant="secondary" className="text-xs">
                                  Resolved
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                          {!comment.resolved && (
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                              Mark Resolved
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <CardContent className="text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">Select a document</h3>
                <p className="text-muted-foreground">Choose a document from the list to start editing</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
