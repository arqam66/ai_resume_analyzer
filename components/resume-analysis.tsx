"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, XCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

interface ResumeData {
  name: string
  email: string
  phone: string
  skills: string[]
  experience: {
    title: string
    company: string
    duration: string
    description: string
  }[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
}

export default function ResumeAnalysis() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisScore, setAnalysisScore] = useState({
    overall: 0,
    content: 0,
    format: 0,
    impact: 0,
    keywords: 0,
  })
  const [feedback, setFeedback] = useState({
    strengths: [] as string[],
    improvements: [] as string[],
    suggestions: [] as string[],
  })

  useEffect(() => {
    // Check if resume data exists in localStorage or sessionStorage
    const storedData = localStorage.getItem("resumeData") || sessionStorage.getItem("parsedResume")
    if (storedData) {
      setResumeData(JSON.parse(storedData))
    }
  }, [])

  const runAnalysis = async () => {
    if (!resumeData) return

    setLoading(true)

    // Simulate API call for AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock analysis results
    setAnalysisScore({
      overall: 78,
      content: 82,
      format: 75,
      impact: 70,
      keywords: 85,
    })

    setFeedback({
      strengths: [
        "Strong technical skills section with relevant technologies",
        "Clear work experience with quantifiable achievements",
        "Good education credentials with relevant degree",
      ],
      improvements: [
        "Resume lacks a compelling professional summary",
        "Work experience descriptions could use more action verbs",
        "Skills section could be better organized by categories",
      ],
      suggestions: [
        "Add a concise professional summary highlighting your key strengths",
        "Quantify achievements with metrics where possible (e.g., 'Increased conversion rates by 25%')",
        "Consider adding a projects section to showcase practical applications of your skills",
        "Group skills by categories (e.g., Programming Languages, Tools, Soft Skills)",
      ],
    })

    setLoading(false)
    setAnalysisComplete(true)
  }

  if (!resumeData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No resume found</AlertTitle>
        <AlertDescription>
          Please upload your resume first in the Upload Resume tab or go to the upload page.
        </AlertDescription>
        <div className="mt-4">
          <Link href="/upload">
            <Button>Upload Resume</Button>
          </Link>
        </div>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {!analysisComplete ? (
        <Card>
          <CardHeader>
            <CardTitle>Resume Analysis</CardTitle>
            <CardDescription>Our AI will analyze your resume and provide personalized feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-md">
                <h3 className="font-medium mb-2">Resume Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">{resumeData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{resumeData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Skills</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {resumeData.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm text-muted-foreground">{resumeData.experience.length} positions listed</p>
                  </div>
                </div>
              </div>

              <Button onClick={runAnalysis} disabled={loading} className="w-full">
                {loading ? "Analyzing Resume..." : "Start AI Analysis"}
              </Button>

              {loading && (
                <div className="space-y-2">
                  <Progress value={Math.random() * 100} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground">
                    Our AI is analyzing your resume... This may take a moment.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Resume Score</CardTitle>
              <CardDescription>Overall assessment of your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative h-36 w-36">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold">{analysisScore.overall}</span>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={
                        analysisScore.overall >= 80 ? "#22c55e" : analysisScore.overall >= 60 ? "#f59e0b" : "#ef4444"
                      }
                      strokeWidth="10"
                      strokeDasharray={`${analysisScore.overall * 2.83} 283`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {analysisScore.overall >= 80
                    ? "Excellent resume! You're well positioned for job applications."
                    : analysisScore.overall >= 60
                      ? "Good resume with some areas for improvement."
                      : "Your resume needs significant improvements."}
                </p>
              </div>

              <div className="space-y-4 mt-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Content Quality</span>
                    <span className="text-sm font-medium">{analysisScore.content}%</span>
                  </div>
                  <Progress value={analysisScore.content} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Format & Structure</span>
                    <span className="text-sm font-medium">{analysisScore.format}%</span>
                  </div>
                  <Progress value={analysisScore.format} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Impact & Clarity</span>
                    <span className="text-sm font-medium">{analysisScore.impact}%</span>
                  </div>
                  <Progress value={analysisScore.impact} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Keyword Optimization</span>
                    <span className="text-sm font-medium">{analysisScore.keywords}%</span>
                  </div>
                  <Progress value={analysisScore.keywords} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Detailed Feedback</CardTitle>
              <CardDescription>AI-generated insights to improve your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="strengths">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="strengths">Strengths</TabsTrigger>
                  <TabsTrigger value="improvements">Improvements</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>

                <TabsContent value="strengths" className="mt-0">
                  <div className="space-y-3">
                    {feedback.strengths.map((strength, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p>{strength}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="improvements" className="mt-0">
                  <div className="space-y-3">
                    {feedback.improvements.map((improvement, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p>{improvement}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="suggestions" className="mt-0">
                  <div className="space-y-3">
                    {feedback.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p>{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-amber-500 flex-shrink-0"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m12 16 4-4-4-4" />
                    <path d="M8 12h8" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-amber-800">Next Steps</h4>
                    <p className="text-sm text-amber-700">
                      Head over to the AI Chat Assistant tab to get personalized help implementing these suggestions and
                      improving your resume further.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
