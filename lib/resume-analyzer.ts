import type { ParsedResume } from "./resume-parser"
import { getJobDescription } from "./job-descriptions"

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

export async function analyzeResume(resume: ParsedResume): Promise<ResumeAnalysis> {
  try {
    // Get the selected job ID from session storage
    const selectedJobId = sessionStorage.getItem("selectedJobId") || "software-developer"
    const jobDescription = getJobDescription(selectedJobId)

    // In a real implementation, this would use AI to analyze the resume
    // For demo purposes, we'll simulate this with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock job description keywords for comparison
    const jobKeywords = jobDescription?.keywords || [
      "JavaScript",
      "React",
      "TypeScript",
      "Node.js",
      "AWS",
      "CI/CD",
      "Jest",
      "Agile",
      "REST API",
      "GraphQL",
      "Performance optimization",
      "Team leadership",
      "Python",
    ]

    // Calculate matched keywords
    const resumeSkills = resume.skills.map((skill) => skill.toLowerCase())
    const matchedKeywords = jobKeywords.filter(
      (keyword) =>
        resumeSkills.includes(keyword.toLowerCase()) ||
        JSON.stringify(resume).toLowerCase().includes(keyword.toLowerCase()),
    )

    const missingKeywords = jobKeywords.filter(
      (keyword) =>
        !resumeSkills.includes(keyword.toLowerCase()) &&
        !JSON.stringify(resume).toLowerCase().includes(keyword.toLowerCase()),
    )

    const keywordMatchScore = Math.round((matchedKeywords.length / jobKeywords.length) * 100)

    // In a real implementation, you would use AI to generate this analysis
    // For example, using the AI SDK:
    /*
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Analyze this resume: ${JSON.stringify(resume)} for a ${jobDescription?.title || 'software developer'} position.`,
      system: "You are an expert resume analyzer. Provide detailed feedback on the resume."
    });
    
    // Then parse the AI response to structure it
    const analysis = JSON.parse(text);
    */

    // For demo purposes, we'll return mock data
    return {
      score: 78,
      feedback: {
        strengths: [
          "Strong technical skill set with in-demand technologies",
          "Clear progression in career with increasing responsibilities",
          "Quantifiable achievements (e.g., 40% performance improvement)",
          "Good educational background with relevant degrees",
        ],
        weaknesses: [
          "Summary is too generic and doesn't highlight unique value proposition",
          "Experience descriptions focus more on responsibilities than achievements",
          "Missing metrics and quantifiable results in some experience entries",
          "Skills section could be better organized by categories",
        ],
        suggestions: [
          "Add a more compelling and specific professional summary that highlights your unique value proposition",
          "Include more quantifiable achievements in your experience descriptions (metrics, percentages, etc.)",
          "Add relevant certifications to strengthen your credentials",
          "Organize skills by categories (e.g., Programming Languages, Frameworks, Tools)",
          "Include a projects section to showcase specific work examples",
          "Add relevant keywords from job descriptions to improve ATS matching",
        ],
      },
      keywordMatch: {
        score: keywordMatchScore,
        matched: matchedKeywords,
        missing: missingKeywords,
      },
      sections: [
        {
          name: "Contact Information",
          score: 95,
          feedback:
            "Contact information is complete and well-formatted. Consider adding LinkedIn profile and GitHub links.",
        },
        {
          name: "Professional Summary",
          score: 65,
          feedback: "Summary is too generic. Make it more specific to your unique skills and career goals.",
        },
        {
          name: "Work Experience",
          score: 80,
          feedback: "Good progression shown, but add more quantifiable achievements and results.",
        },
        {
          name: "Skills",
          score: 85,
          feedback: "Strong technical skills listed, but consider organizing them by categories.",
        },
        {
          name: "Education",
          score: 90,
          feedback: "Education is well-presented. Consider adding relevant coursework or academic achievements.",
        },
      ],
    }
  } catch (error) {
    console.error("Error analyzing resume:", error)
    throw new Error("Failed to analyze resume")
  }
}
