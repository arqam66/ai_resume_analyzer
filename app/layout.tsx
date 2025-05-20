import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Resume Analyzer",
  description: "AI-powered resume analysis and improvement suggestions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="min-h-screen bg-white">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M8 13h8" />
                    <path d="M8 17h8" />
                    <path d="M8 9h1" />
                  </svg>
                  <span className="font-bold text-lg">ResumeAI</span>
                </div>
                <nav>
                  <ul className="flex gap-6">
                    <li>
                      <a href="/" className="text-sm font-medium hover:text-slate-600">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/upload" className="text-sm font-medium hover:text-slate-600">
                        Upload
                      </a>
                    </li>
                    <li>
                      <a href="/chat" className="text-sm font-medium hover:text-slate-600">
                        AI Chat
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </header>
            {children}
            <footer className="border-t mt-12">
              <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-600">
                © {new Date().getFullYear()} ResumeAI. All rights reserved.
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
