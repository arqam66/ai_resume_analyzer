"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { parseResume } from "@/lib/resume-parser"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { getAllJobTitles } from "@/lib/job-descriptions"

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string>("software-developer")

  const jobTitles = getAllJobTitles()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const fileType = file.type

    // Check if file is PDF or Word document
    if (
      fileType === "application/pdf" ||
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      setFile(file)
      setError(null)
    } else {
      setError("Please upload a PDF or Word document")
      setFile(null)
    }
  }

  // Fix the handleUpload function to properly handle file upload and redirect
  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      // In a real app, you would upload the file to your server
      // For this demo, we'll simulate parsing and then redirect

      // Simulate file processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Parse the resume (this would normally happen server-side)
      const parsedResume = await parseResume(file)

      // Store the parsed resume data in sessionStorage
      sessionStorage.setItem("parsedResume", JSON.stringify(parsedResume))

      // Store the selected job ID
      sessionStorage.setItem("selectedJobId", selectedJob)

      // Redirect to analysis page
      router.push("/analysis")
    } catch (err) {
      console.error(err)
      setError("An error occurred while processing your resume. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Upload Your Resume</h1>

        <Card>
          <CardHeader>
            <CardTitle>Resume Upload</CardTitle>
            <CardDescription>Upload your resume in PDF or Word format for AI analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                dragActive ? "border-slate-400 bg-slate-50" : "border-slate-200"
              } ${file ? "bg-slate-50" : ""}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setFile(null)}>
                    Change file
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-slate-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Drag and drop your resume here</p>
                    <p className="text-sm text-slate-500">Supports PDF and Word documents</p>
                  </div>
                  <div>
                    <label htmlFor="resume-upload">
                      <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                        <span>Browse files</span>
                      </Button>
                      <input
                        id="resume-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-type">Select Job Type for Keyword Matching</Label>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger id="job-type" className="w-full">
                  <SelectValue placeholder="Select a job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTitles.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                This helps us match your resume against relevant keywords for the selected job type.
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleUpload} disabled={!file || isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
