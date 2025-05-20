"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Check, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { parseResume } from "@/lib/resume-parser"

export default function ResumeUploader() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check if file is PDF or DOCX
      const fileType = selectedFile.type
      if (
        fileType === "application/pdf" ||
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile)
        setUploadStatus("idle")
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document",
          variant: "destructive",
        })
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus("uploading")

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 100)

    try {
      // Simulate API call to upload and parse resume
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Parse the resume (this would normally happen server-side)
      const parsedResume = await parseResume(file)

      clearInterval(interval)
      setUploadProgress(100)
      setUploadStatus("success")

      // Store parsed resume data in localStorage and sessionStorage for demo purposes
      localStorage.setItem("resumeData", JSON.stringify(parsedResume))
      sessionStorage.setItem("parsedResume", JSON.stringify(parsedResume))

      // Store a default job ID
      sessionStorage.setItem("selectedJobId", "software-developer")

      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been parsed and is ready for analysis",
        variant: "default",
      })

      // Redirect to analysis page after a short delay
      setTimeout(() => {
        router.push("/analysis")
      }, 1000)
    } catch (error) {
      setUploadStatus("error")
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
          <CardDescription>Upload your resume in PDF or Word format to get started with the analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => document.getElementById("resume-upload")?.click()}
          >
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-slate-400" />
              <p className="text-sm font-medium">{file ? file.name : "Click to upload or drag and drop"}</p>
              <p className="text-xs text-muted-foreground">PDF or Word documents (max 5MB)</p>
            </div>
          </div>

          {file && uploadStatus !== "success" && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            </div>
          )}

          {uploadStatus === "uploading" && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center mt-1 text-muted-foreground">Uploading and parsing resume...</p>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="mt-4 p-3 bg-green-50 rounded-md flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm text-green-700">Resume successfully uploaded and parsed</span>
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="mt-4 p-3 bg-red-50 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-700">Error uploading resume. Please try again.</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpload} disabled={!file || uploading || uploadStatus === "success"} className="w-full">
            {uploading ? "Uploading..." : "Upload and Parse Resume"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
          <CardDescription>After uploading your resume, our AI will analyze it and provide feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="font-medium text-blue-600">1</span>
              </div>
              <div>
                <h3 className="font-medium">Resume Parsing</h3>
                <p className="text-sm text-muted-foreground">
                  We extract structured data from your resume including skills, experience, and education
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="font-medium text-blue-600">2</span>
              </div>
              <div>
                <h3 className="font-medium">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI evaluates your resume's content, structure, and effectiveness
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="font-medium text-blue-600">3</span>
              </div>
              <div>
                <h3 className="font-medium">Feedback Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Receive personalized feedback and a score to help improve your resume
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="font-medium text-blue-600">4</span>
              </div>
              <div>
                <h3 className="font-medium">Job Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Compare your resume with job descriptions to identify keyword matches and gaps
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
