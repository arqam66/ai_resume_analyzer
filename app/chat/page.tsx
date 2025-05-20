"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { Send, Loader2, Bot, User, FileText, Upload, Lightbulb, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getJobDescription } from "@/lib/job-descriptions"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface SuggestedPrompt {
  title: string
  prompt: string
  icon?: React.ReactNode
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI resume assistant. I can help you improve your resume and provide personalized advice. What would you like help with today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resumeLoaded, setResumeLoaded] = useState(false)
  const [parsedResume, setParsedResume] = useState<any>(null)
  const [jobTitle, setJobTitle] = useState<string>("Software Developer")
  const [apiError, setApiError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedPrompts: SuggestedPrompt[] = [
    {
      title: "Improve Experience Section",
      prompt: "How can I improve my work experience section?",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Highlight Key Skills",
      prompt: `What skills should I highlight for a ${jobTitle} role?`,
      icon: <Lightbulb className="h-4 w-4" />,
    },
    {
      title: "ATS Optimization",
      prompt: "How can I make my resume more ATS-friendly?",
      icon: <Bot className="h-4 w-4" />,
    },
    {
      title: "Resume Format",
      prompt: "What's the best format for my resume?",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Cover Letter Tips",
      prompt: "Can you help me write a cover letter that complements my resume?",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Interview Preparation",
      prompt: "Based on my resume, what interview questions should I prepare for?",
      icon: <User className="h-4 w-4" />,
    },
  ]

  useEffect(() => {
    // Check if resume data exists in session storage
    const resumeData = sessionStorage.getItem("parsedResume")
    const selectedJobId = sessionStorage.getItem("selectedJobId")

    if (resumeData) {
      setResumeLoaded(true)
      setParsedResume(JSON.parse(resumeData))
    }

    // Get job title
    if (selectedJobId) {
      const jobDescription = getJobDescription(selectedJobId)
      if (jobDescription) {
        setJobTitle(jobDescription.title)
      }
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    // Set loading state
    setIsLoading(true)
    setApiError(null) // Clear any previous errors

    try {
      // Get resume context if available
      let resumeContext = ""
      if (parsedResume) {
        resumeContext = `The user has uploaded a resume with the following information: 
          Name: ${parsedResume.name}
          Skills: ${parsedResume.skills.join(", ")}
          Experience: ${parsedResume.experience.length} positions
          Education: ${parsedResume.education.map((edu: any) => `${edu.degree} from ${edu.institution}`).join(", ")}
        `
      }

      // Get job context if available
      let jobContext = ""
      const selectedJobId = sessionStorage.getItem("selectedJobId")
      if (selectedJobId) {
        const jobDescription = getJobDescription(selectedJobId)
        if (jobDescription) {
          jobContext = `The user is targeting a ${jobDescription.title} position. Relevant keywords for this role include: ${jobDescription.keywords.join(", ")}.`
        }
      }

      // Call our mock API (no API key needed)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: `${resumeContext} ${jobContext}`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to get response from AI")
      }

      // Add AI response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error generating response:", error)

      // Set API error message
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setApiError(errorMessage)

      // Use a generic fallback response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I encountered an error while processing your request. Please try asking a different question about your resume.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Resume AI Assistant</h1>
          <p className="text-slate-600">Get personalized advice to improve your resume</p>
        </div>

        {apiError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              <p>{apiError}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Chat with AI</CardTitle>
                <CardDescription>Ask questions about your resume or get advice on improvements</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === "assistant" ? "bg-slate-100 text-slate-900" : "bg-slate-700 text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                          <span className="font-medium">{message.role === "assistant" ? "AI Assistant" : "You"}</span>
                        </div>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="pt-4">
                <form onSubmit={handleSubmit} className="w-full flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow resize-none"
                    rows={2}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Tabs defaultValue="suggestions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
              </TabsList>

              <TabsContent value="suggestions" className="mt-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Suggested Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="space-y-2">
                      {suggestedPrompts.map((prompt, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2 gap-2"
                          onClick={() => {
                            setInput(prompt.prompt)
                          }}
                        >
                          {prompt.icon}
                          <span className="truncate">{prompt.title}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resume" className="mt-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Resume Status</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    {resumeLoaded ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-green-600">
                          <FileText className="h-5 w-5" />
                          <span className="text-sm font-medium">Resume Loaded</span>
                        </div>

                        {parsedResume && (
                          <>
                            <Separator />
                            <div>
                              <h3 className="text-sm font-medium mb-1">Target Position</h3>
                              <Badge variant="outline">{jobTitle}</Badge>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium mb-1">Skills</h3>
                              <div className="flex flex-wrap gap-1">
                                {parsedResume.skills?.slice(0, 5).map((skill: string, i: number) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {parsedResume.skills?.length > 5 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{parsedResume.skills.length - 5} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-amber-600">
                          <Upload className="h-5 w-5" />
                          <span className="text-sm font-medium">No Resume</span>
                        </div>
                        <p className="text-xs text-slate-500">Upload your resume for personalized advice.</p>
                        <Link href="/upload">
                          <Button size="sm" variant="outline" className="w-full">
                            Upload Resume
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="mt-4">
              <CardHeader className="py-3">
                <CardTitle className="text-base">Tips</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <div className="space-y-2 text-sm">
                  <p className="flex gap-2 items-start">
                    <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Be specific about which parts of your resume you need help with.</span>
                  </p>
                  <p className="flex gap-2 items-start">
                    <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Ask for examples of how to phrase your achievements.</span>
                  </p>
                  <p className="flex gap-2 items-start">
                    <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Request feedback on specific job descriptions to tailor your resume.</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
