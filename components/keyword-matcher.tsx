"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, XCircle, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
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

interface KeywordMatch {
  keyword: string
  found: boolean
  context?: string
}

export default function KeywordMatcher() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [matchResults, setMatchResults] = useState<{
    matches: KeywordMatch[]
    matchScore: number
    missingKeywords: string[]
  } | null>(null)

  useEffect(() => {
    // Check if resume data exists in localStorage or sessionStorage
    const storedData = localStorage.getItem("resumeData") || sessionStorage.getItem("parsedResume")
    if (storedData) {
      setResumeData(JSON.parse(storedData))
    }
  }, [])

  const analyzeKeywords = async () => {
    if (!resumeData || !jobDescription) return

    setAnalyzing(true)

    // Simulate API call for keyword analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Extract keywords from job description (simplified for demo)
    const extractedKeywords = [
      "JavaScript",
      "React",
      "TypeScript",
      "UI/UX",
      "Frontend",
      "Responsive Design",
      "API Integration",
      "Git",
      "Agile",
      "Testing",
    ]

    // Check which keywords are in the resume
    const resumeText = JSON.stringify(resumeData).toLowerCase()

    const matches: KeywordMatch[] = extractedKeywords.map((keyword) => {
      const found = resumeText.toLowerCase().includes(keyword.toLowerCase())
      let context = ""

      if (found) {
        // Find context where the keyword appears (simplified)
        if (resumeData.skills.some((skill) => skill.toLowerCase().includes(keyword.toLowerCase()))) {
          context = `Found in Skills section`
        } else if (
          resumeData.experience.some(
            (exp) =>
              exp.title.toLowerCase().includes(keyword.toLowerCase()) ||
              exp.description.toLowerCase().includes(keyword.toLowerCase()),
          )
        ) {
          context = `Found in Experience section`
        } else {
          context = `Found in resume`
        }
      }

      return {
        keyword,
        found,
        context: found ? context : undefined,
      }
    })

    const matchedKeywords = matches.filter((m) => m.found)
    const missingKeywords = matches.filter((m) => !m.found).map((m) => m.keyword)
    const matchScore = Math.round((matchedKeywords.length / extractedKeywords.length) * 100)

    setMatchResults({
      matches,
      matchScore,
      missingKeywords,
    })

    setAnalyzing(false)
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Description Analysis</CardTitle>
          <CardDescription>Paste a job description to match keywords with your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste job description here..."
            className="min-h-[200px]"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={analyzeKeywords} disabled={!jobDescription || analyzing} className="w-full">
            {analyzing ? "Analyzing Keywords..." : "Analyze Keywords"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Match Results</CardTitle>
          <CardDescription>See how well your resume matches the job requirements</CardDescription>
        </CardHeader>
        <CardContent>
          {!matchResults ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <Search className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium">No Analysis Yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Paste a job description and click "Analyze Keywords" to see how well your resume matches
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Keyword Match Score</h3>
                  <span className="text-lg font-bold">{matchResults.matchScore}%</span>
                </div>
                <Progress
                  value={matchResults.matchScore}
                  className="h-2.5"
                  indicatorClassName={
                    matchResults.matchScore >= 80
                      ? "bg-green-500"
                      : matchResults.matchScore >= 60
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {matchResults.matchScore >= 80
                    ? "Excellent match! Your resume aligns well with this job."
                    : matchResults.matchScore >= 60
                      ? "Good match with some gaps to address."
                      : "Significant gaps found. Consider updating your resume for this position."}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Keyword Analysis</h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {matchResults.matches.map((match, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-md flex items-start gap-2 ${match.found ? "bg-green-50" : "bg-red-50"}`}
                    >
                      {match.found ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-medium ${match.found ? "text-green-700" : "text-red-700"}`}>
                          {match.keyword}
                        </p>
                        {match.found && match.context && (
                          <p className="text-xs text-muted-foreground">{match.context}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {matchResults.missingKeywords.length > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <h3 className="font-medium text-amber-800 mb-2">Missing Keywords</h3>
                  <p className="text-sm text-amber-700 mb-2">
                    Consider adding these keywords to your resume to improve your match:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {matchResults.missingKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white border border-amber-300 text-amber-800 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
