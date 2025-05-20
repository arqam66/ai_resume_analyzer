import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResumeUploader from "@/components/resume-uploader"
import ResumeAnalysis from "@/components/resume-analysis"
import KeywordMatcher from "@/components/keyword-matcher"
import ResumeChat from "@/components/resume-chat"

export const metadata: Metadata = {
  title: "AI Resume Analyzer",
  description: "Upload your resume and get AI-powered feedback to improve your chances of landing interviews.",
}

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">AI-Powered Resume Analyzer</h1>
        <p className="text-muted-foreground max-w-2xl">
          Upload your resume, get AI-powered feedback, match with job descriptions, and chat with our AI assistant for
          personalized improvement suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Upload & Parse</h2>
          <p className="text-center text-muted-foreground text-sm">
            Extract structured data from PDF or Word documents
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
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
              className="h-6 w-6 text-green-600"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24" />
              <path d="M21 3v9h-9" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">AI Analysis</h2>
          <p className="text-center text-muted-foreground text-sm">Get personalized feedback on your resume quality</p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
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
              className="h-6 w-6 text-purple-600"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Keyword Matching</h2>
          <p className="text-center text-muted-foreground text-sm">
            Compare your resume with job descriptions for relevancy
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Link href="/upload">
          <Button size="lg">Get Started</Button>
        </Link>
        <Link href="/chat">
          <Button variant="outline" size="lg">
            Chat with AI Assistant
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          <TabsTrigger value="analysis">Resume Analysis</TabsTrigger>
          <TabsTrigger value="keywords">Keyword Matching</TabsTrigger>
          <TabsTrigger value="chat">AI Chat Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-0">
          <ResumeUploader />
        </TabsContent>

        <TabsContent value="analysis" className="mt-0">
          <ResumeAnalysis />
        </TabsContent>

        <TabsContent value="keywords" className="mt-0">
          <KeywordMatcher />
        </TabsContent>

        <TabsContent value="chat" className="mt-0">
          <ResumeChat />
        </TabsContent>
      </Tabs>
    </main>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 flex gap-4">
      <div className="flex-shrink-0 text-slate-700">{icon}</div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}
