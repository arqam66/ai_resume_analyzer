"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle, CheckCircle2, XCircle, Info, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { analyzeResume } from "@/lib/resume-analyzer"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { getJobDescription } from "@/lib/job-descriptions"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ResumeAnalysis {
  score: number
  feedback: {
    strengths: string[]
    weaknesses: string[]
    suggestions: string[]
  }
  keywordMatch: {
    score: number
    matched: string[]
    missing: string[]
  }
  sections: {
    name: string
    score: number
    feedback: string
  }[]
}

export default function AnalysisPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [parsedResume, setParsedResume] = useState<any>(null)
  const [jobTitle, setJobTitle] = useState<string>("Software Developer")

  useEffect(() => {
    const resumeData = sessionStorage.getItem("parsedResume")
    const selectedJobId = sessionStorage.getItem("selectedJobId")

    if (!resumeData) {
      setError("No resume found. Please upload your resume first.")
      setIsLoading(false)
      return
    }

    // Get job title
    if (selectedJobId) {
      const jobDescription = getJobDescription(selectedJobId)
      if (jobDescription) {
        setJobTitle(jobDescription.title)
      }
    }

    const fetchAnalysis = async () => {
      try {
        const parsedData = JSON.parse(resumeData)
        setParsedResume(parsedData)

        // In a real app, this would be an API call to your backend
        const result = await analyzeResume(parsedData)
        setAnalysis(result)
      } catch (err) {
        console.error(err)
        setError("An error occurred while analyzing your resume.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalysis()
  }, [])

  const handleDownloadReport = () => {
    // In a real app, this would generate a PDF report
    alert("In a real application, this would download a PDF report of your resume analysis.")
  }

  const handleShareAnalysis = () => {
    // In a real app, this would share the analysis via email or link
    alert("In a real application, this would share your resume analysis via email or a shareable link.")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-slate-600" />
          <h2 className="text-2xl font-bold mb-2">Analyzing Your Resume</h2>
          <p className="text-slate-600 mb-8">Our AI is reviewing your resume and generating personalized feedback...</p>
          <div className="max-w-md mx-auto">
            <Progress value={65} className="h-2" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Link href="/upload">
              <Button>Upload Resume</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return null
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-amber-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-amber-100"
    return "bg-red-100"
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Resume Analysis</h1>
            <p className="text-slate-600">AI-powered feedback for {jobTitle} position</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>{analysis.score}%</div>
            <div className="text-sm text-slate-600">
              Overall
              <br />
              Score
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6 gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => alert("Email sharing would be implemented here")}>
                Share via Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Link copying would be implemented here")}>
                Copy Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.feedback.strengths.map((strength, i) => (
                      <li key={i} className="flex gap-2">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                        </div>
                        <p>{strength}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Areas to Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.feedback.weaknesses.map((weakness, i) => (
                      <li key={i} className="flex gap-2">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                        </div>
                        <p>{weakness}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Resume Summary</CardTitle>
                <CardDescription>Key information extracted from your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsedResume && (
                    <>
                      <div>
                        <h3 className="font-medium mb-1">Contact Information</h3>
                        <div className="text-sm">
                          <p>{parsedResume.name}</p>
                          <p>{parsedResume.email}</p>
                          <p>{parsedResume.phone}</p>
                          {parsedResume.location && <p>{parsedResume.location}</p>}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-1">Skills</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {parsedResume.skills?.map((skill: string, i: number) => (
                            <Badge key={i} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-1">Experience</h3>
                        <div className="space-y-3">
                          {parsedResume.experience?.map((exp: any, i: number) => (
                            <div key={i} className="text-sm">
                              <div className="font-medium">{exp.title}</div>
                              <div>{exp.company}</div>
                              <div className="text-slate-600">{exp.date}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-1">Education</h3>
                        <div className="space-y-3">
                          {parsedResume.education?.map((edu: any, i: number) => (
                            <div key={i} className="text-sm">
                              <div className="font-medium">{edu.degree}</div>
                              <div>{edu.institution}</div>
                              <div className="text-slate-600">{edu.date}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sections" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Section Analysis</CardTitle>
                <CardDescription>Detailed feedback on each section of your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analysis.sections.map((section, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{section.name}</h3>
                        <div
                          className={`px-2 py-0.5 rounded-full text-sm font-medium ${getScoreBg(section.score)} ${getScoreColor(section.score)}`}
                        >
                          {section.score}%
                        </div>
                      </div>
                      <p className="text-sm mb-3">{section.feedback}</p>
                      <Progress value={section.score} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Analysis</CardTitle>
                <CardDescription>How well your resume matches {jobTitle} job description keywords</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Keyword Match Score</h3>
                    <div
                      className={`px-2 py-0.5 rounded-full text-sm font-medium ${getScoreBg(analysis.keywordMatch.score)} ${getScoreColor(analysis.keywordMatch.score)}`}
                    >
                      {analysis.keywordMatch.score}%
                    </div>
                  </div>
                  <Progress value={analysis.keywordMatch.score} className="h-2 mt-2" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Matched Keywords
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.keywordMatch.matched.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-1.5">
                      <XCircle className="h-4 w-4 text-red-600" />
                      Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.keywordMatch.missing.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Alert className="mt-6">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Tip</AlertTitle>
                  <AlertDescription>
                    Including industry-specific keywords can help your resume pass through Applicant Tracking Systems
                    (ATS).
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Improvement Suggestions</CardTitle>
                <CardDescription>Actionable recommendations to enhance your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {analysis.feedback.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-sm font-medium">
                          {i + 1}
                        </div>
                      </div>
                      <p>{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/chat" className="w-full">
                  <Button className="w-full">Chat with AI for Personalized Advice</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/upload")}>
            Upload New Resume
          </Button>
          <Link href="/chat">
            <Button>Get Personalized Advice</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
