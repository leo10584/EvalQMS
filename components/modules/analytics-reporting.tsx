"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Target, Clock, FileText, Download } from "lucide-react"

interface MetricCard {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  icon: React.ReactNode
}

export function AnalyticsReporting() {
  const [timeRange, setTimeRange] = useState("last-30-days")

  const executiveMetrics: MetricCard[] = [
    {
      title: "Quality Improvement",
      value: "40%",
      change: "+15% vs last quarter",
      trend: "up",
      icon: <Target className="h-4 w-4" />,
    },
    {
      title: "Time to Submission",
      value: "30%",
      change: "Reduction achieved",
      trend: "up",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "First-Time Quality Pass",
      value: "85%",
      change: "+20% improvement",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Audit Readiness",
      value: "100%",
      change: "All projects compliant",
      trend: "stable",
      icon: <FileText className="h-4 w-4" />,
    },
  ]

  const projectMetrics = [
    { name: "Phase III Oncology", quality: 87, timeline: 92, issues: 2 },
    { name: "Cardiology Device", quality: 91, timeline: 88, issues: 1 },
    { name: "Neurology Protocol", quality: 83, timeline: 95, issues: 3 },
    { name: "Immunology Study", quality: 89, timeline: 90, issues: 1 },
  ]

  const qualityTrends = [
    { month: "Oct", score: 78 },
    { month: "Nov", score: 82 },
    { month: "Dec", score: 85 },
    { month: "Jan", score: 87 },
  ]

  const getTrendColor = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      case "stable":
        return "text-blue-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
          <p className="text-muted-foreground">Performance insights and executive dashboards</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="executive" className="space-y-6">
        <TabsList>
          <TabsTrigger value="executive">Executive KPIs</TabsTrigger>
          <TabsTrigger value="quality">Quality Trends</TabsTrigger>
          <TabsTrigger value="projects">Project Analytics</TabsTrigger>
          <TabsTrigger value="reports">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="executive" className="space-y-6">
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {executiveMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  {metric.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className={`text-xs ${getTrendColor(metric.trend)}`}>{metric.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Business Impact Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Business Impact Summary</CardTitle>
              <CardDescription>Key achievements and ROI metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Quality Improvements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 40% reduction in quality-related rejections</li>
                    <li>• 85% first-time quality pass rate</li>
                    <li>• 95% compliance with regulatory standards</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Efficiency Gains</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 30% faster time to submission</li>
                    <li>• 50% reduction in review cycles</li>
                    <li>• 60% less time spent on revisions</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Process Standardization</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 100% projects follow standard workflow</li>
                    <li>• Complete audit trail for all activities</li>
                    <li>• Automated quality scoring implemented</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quality Score Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Quality Score Trend</CardTitle>
                <CardDescription>Average quality scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{trend.month}</span>
                      <div className="flex items-center space-x-2 flex-1 ml-4">
                        <Progress value={trend.score} className="flex-1" />
                        <span className="text-sm font-medium w-12">{trend.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quality Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Quality Score Distribution</CardTitle>
                <CardDescription>Current project quality breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Excellent (90-100%)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Good (80-89%)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                      <span className="text-sm font-medium">50%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fair (70-79%)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Needs Improvement (&lt;70%)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "0%" }}></div>
                      </div>
                      <span className="text-sm font-medium">0%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance Overview</CardTitle>
              <CardDescription>Quality scores, timeline adherence, and issue counts by project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectMetrics.map((project, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">{project.name}</h4>
                      <div className="flex space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {project.issues} issues
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Quality Score</span>
                          <span>{project.quality}%</span>
                        </div>
                        <Progress value={project.quality} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Timeline Adherence</span>
                          <span>{project.timeline}%</span>
                        </div>
                        <Progress value={project.timeline} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Generate custom reports for specific data analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quality-summary">Quality Summary</SelectItem>
                        <SelectItem value="project-status">Project Status</SelectItem>
                        <SelectItem value="audit-trail">Audit Trail</SelectItem>
                        <SelectItem value="deviation-report">Deviation Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-week">Last Week</SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="last-quarter">Last Quarter</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pre-built Report Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Pre-built Report Templates</CardTitle>
              <CardDescription>Quick access to commonly used reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Monthly Quality Report</div>
                    <div className="text-sm text-muted-foreground">Quality metrics and trends</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Compliance Audit Report</div>
                    <div className="text-sm text-muted-foreground">21 CFR Part 11 compliance status</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Project Status Summary</div>
                    <div className="text-sm text-muted-foreground">All active projects overview</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">CAPA Effectiveness Report</div>
                    <div className="text-sm text-muted-foreground">Corrective action tracking</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
