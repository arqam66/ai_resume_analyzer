"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Send, Bot, User, Loader2 } from "lucide-react"
// Comment out the imports for AI SDK since we're not using them
// import { generateText } from "ai"
// import { openai } from "@ai-sdk/openai"
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

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ResumeChat() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI resume assistant. I can help you improve your resume with personalized suggestions. What would you like help with today?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if resume data exists in localStorage or sessionStorage
    const storedData = localStorage.getItem("resumeData") || sessionStorage.getItem("parsedResume")
    if (storedData) {
      setResumeData(JSON.parse(storedData))
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Replace the handleSendMessage function with this mock version that doesn't require an API key
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    setLoading(true)

    try {
      // Mock AI response instead of calling the OpenAI API
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      // Generate a mock response based on the user's message
      let response = ""

      if (userMessage.toLowerCase().includes("experience") || userMessage.toLowerCase().includes("work history")) {
        response =
          "To improve your work experience section:\n\n1. Use strong action verbs at the beginning of each bullet point\n2. Include specific, quantifiable achievements (e.g., 'increased sales by 20%')\n3. Tailor your experience to highlight skills relevant to the job you're applying for\n4. Focus on impact and results rather than just listing responsibilities\n5. Keep descriptions concise and impactful"
      } else if (userMessage.toLowerCase().includes("skill") || userMessage.toLowerCase().includes("keyword")) {
        response =
          "For your skills section, consider:\n\n1. Organizing skills by category (technical, soft, industry-specific)\n2. Prioritizing skills mentioned in the job description\n3. Including proficiency levels for technical skills where appropriate\n4. Removing outdated or irrelevant skills\n5. Adding specific tools, software, and methodologies you're familiar with"
      } else if (
        userMessage.toLowerCase().includes("ats") ||
        userMessage.toLowerCase().includes("applicant tracking")
      ) {
        response =
          "To make your resume more ATS-friendly:\n\n1. Use standard section headings (Experience, Education, Skills)\n2. Include keywords from the job description\n3. Avoid using tables, headers/footers, or complex formatting\n4. Submit in PDF format unless otherwise specified\n5. Don't use images, logos, or graphics\n6. Use a clean, simple layout with standard fonts"
      } else if (userMessage.toLowerCase().includes("format") || userMessage.toLowerCase().includes("layout")) {
        response =
          "For optimal resume formatting:\n\n1. Use a clean, professional design with consistent spacing\n2. Choose a readable font (Arial, Calibri, or Helvetica) at 10-12pt size\n3. Include clear section headings with a logical flow\n4. Ensure adequate white space to improve readability\n5. Keep your resume to 1-2 pages depending on experience level\n6. Use bullet points for easy scanning"
      } else {
        response =
          "Thanks for your question! Here are some general resume improvement tips:\n\n1. Start with a compelling professional summary that highlights your unique value\n2. Quantify your achievements with specific metrics and results\n3. Tailor your resume for each job application\n4. Use keywords from the job description to pass ATS screening\n5. Proofread carefully for grammar and spelling errors\n\nIs there a specific section of your resume you'd like me to help with?"
      }

      // Add AI response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error generating a response. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
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
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>AI Resume Assistant</CardTitle>
        <CardDescription>Chat with our AI assistant for personalized resume improvement suggestions</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 mb-4 ${message.role === "assistant" ? "" : "justify-end"}`}>
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === "assistant" ? "bg-slate-100 text-slate-800" : "bg-blue-600 text-white"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-slate-200">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>

              <div className="rounded-lg p-4 bg-slate-100 text-slate-800">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder="Ask for resume improvement suggestions..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || loading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
