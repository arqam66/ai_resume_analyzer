"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Download, ArrowLeft } from "lucide-react"
import { ResumeTemplate } from "@/components/resume-template"
import Link from "next/link"

export default function PreviewPage() {
  const router = useRouter()
  const [parsedResume, setParsedResume] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const resumeData = sessionStorage.getItem("parsedResume")

    if (!resumeData) {
      setError("No resume found. Please upload your resume first.")
      return
    }

    try {
      const parsedData = JSON.parse(resumeData)
      setParsedResume(parsedData)
    } catch (err) {
      console.error(err)
      setError("An error occurred while loading your resume.")
    }
  }, [])

  const handleDownload = () => {
    // In a real app, this would generate a PDF of the resume
    alert("In a real application, this would download your resume as a PDF.")
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

  if (!parsedResume) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Resume Preview</h1>
          </div>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <Card className="p-1">
          <ResumeTemplate resume={parsedResume} />
        </Card>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => router.push("/analysis")}>
            Back to Analysis
          </Button>
          <Button onClick={() => router.push("/chat")}>Get AI Advice</Button>
        </div>
      </div>
    </div>
  )
}
