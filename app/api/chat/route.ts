import { NextResponse } from "next/server"

// Mock responses for different resume-related topics
const mockResponses = {
  experience: [
    "To improve your work experience section:\n\n1. Use strong action verbs at the beginning of each bullet point (e.g., 'Implemented', 'Developed', 'Led')\n2. Include specific, quantifiable achievements with metrics (e.g., 'Increased sales by 20%', 'Reduced costs by $50,000')\n3. Tailor your experience to highlight skills relevant to the job you're applying for\n4. Focus on impact and results rather than just listing responsibilities\n5. Keep descriptions concise and impactful - aim for 3-5 bullet points per role",
    "Here are some tips for enhancing your work experience section:\n\n1. Structure each entry with company name, position, location, and dates in a consistent format\n2. Prioritize recent and relevant experience\n3. Use the PAR method: Problem, Action, Result for each achievement\n4. Include relevant keywords from the job description to pass ATS screening\n5. Show progression and growth if you've had multiple roles at the same company",
  ],
  skills: [
    "For your skills section, consider these improvements:\n\n1. Organize skills by category (technical, soft, industry-specific)\n2. Prioritize skills mentioned in the job description\n3. Include proficiency levels for technical skills where appropriate\n4. Remove outdated or irrelevant skills\n5. Add specific tools, software, and methodologies you're familiar with\n6. Consider using a visual representation for skill proficiency",
    "To optimize your skills section:\n\n1. List hard skills (technical abilities) and soft skills (interpersonal qualities) separately\n2. Include industry-specific keywords and phrases\n3. Be specific rather than general (e.g., 'Advanced Excel formulas' instead of just 'Excel')\n4. Focus on quality over quantity - highlight your strongest and most relevant skills\n5. Update your skills regularly to reflect current industry standards",
  ],
  ats: [
    "To make your resume more ATS-friendly:\n\n1. Use standard section headings (Experience, Education, Skills)\n2. Include keywords from the job description\n3. Avoid using tables, headers/footers, or complex formatting\n4. Submit in PDF format unless otherwise specified\n5. Don't use images, logos, or graphics\n6. Use a clean, simple layout with standard fonts\n7. Avoid text boxes and columns that might confuse ATS systems",
    "For better ATS optimization:\n\n1. Match your job titles to industry standards when possible\n2. Include the exact keywords and phrases from the job posting\n3. Avoid abbreviations for important terms and skills\n4. Use a chronological or hybrid resume format\n5. Don't hide keywords in white text or use keyword stuffing\n6. Test your resume with an ATS simulator before submitting",
  ],
  format: [
    "For optimal resume formatting:\n\n1. Use a clean, professional design with consistent spacing\n2. Choose a readable font (Arial, Calibri, or Helvetica) at 10-12pt size\n3. Include clear section headings with a logical flow\n4. Ensure adequate white space to improve readability\n5. Keep your resume to 1-2 pages depending on experience level\n6. Use bullet points for easy scanning\n7. Maintain consistent formatting for dates, headings, and bullet points",
    "To improve your resume format:\n\n1. Start with contact information at the top\n2. Use bold, italics, and underlining sparingly and consistently\n3. Align text left for better readability\n4. Use 0.5-1 inch margins on all sides\n5. Consider a simple color accent for section headings\n6. Ensure your name stands out at the top of the page\n7. Use a consistent date format throughout (MM/YYYY or Month YYYY)",
  ],
  summary: [
    "To create an effective professional summary:\n\n1. Keep it concise - 3-5 impactful sentences\n2. Highlight your years of experience and key areas of expertise\n3. Include your most impressive achievements\n4. Mention your career goals as they relate to the position\n5. Customize it for each job application\n6. Use industry-specific keywords\n7. Write in the first person but omit pronouns",
    "For a compelling professional summary:\n\n1. Start with a strong professional title that matches the job you're applying for\n2. Mention your specialization and unique value proposition\n3. Include 2-3 key accomplishments with metrics\n4. Highlight your most relevant skills and qualifications\n5. Show your personality and work style briefly\n6. End with what you're looking for in your next role",
  ],
  education: [
    "To optimize your education section:\n\n1. List your highest degree first\n2. Include institution name, location, degree, and graduation date\n3. Add relevant coursework, academic achievements, and GPA if above 3.5\n4. Mention scholarships, honors, or academic awards\n5. Include relevant certifications and continuing education\n6. For recent graduates, place education before work experience\n7. For experienced professionals, keep education brief and focus on degrees",
    "For your education section:\n\n1. Format consistently with your other resume sections\n2. Include study abroad experiences if relevant\n3. Mention academic projects related to your target role\n4. List relevant student organizations and leadership positions\n5. Include professional development courses and certifications\n6. For advanced degrees, you can omit high school information\n7. Consider adding relevant thesis or dissertation topics",
  ],
  general: [
    "Here are some general resume improvement tips:\n\n1. Start with a compelling professional summary that highlights your unique value\n2. Quantify your achievements with specific metrics and results\n3. Tailor your resume for each job application\n4. Use keywords from the job description to pass ATS screening\n5. Proofread carefully for grammar and spelling errors\n6. Include relevant certifications and professional development\n7. Get feedback from colleagues or mentors in your industry",
    "To enhance your overall resume:\n\n1. Focus on achievements rather than responsibilities\n2. Use active voice and action verbs throughout\n3. Remove outdated or irrelevant information\n4. Ensure consistent formatting and style\n5. Include a LinkedIn profile and make sure it matches your resume\n6. Consider adding a projects section for relevant work samples\n7. Update your resume regularly, even when not actively job searching",
  ],
}

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Determine which category the message falls into
    let category = "general"
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("experience") || lowerMessage.includes("work history") || lowerMessage.includes("job")) {
      category = "experience"
    } else if (
      lowerMessage.includes("skill") ||
      lowerMessage.includes("ability") ||
      lowerMessage.includes("qualification")
    ) {
      category = "skills"
    } else if (
      lowerMessage.includes("ats") ||
      lowerMessage.includes("applicant tracking") ||
      lowerMessage.includes("keyword")
    ) {
      category = "ats"
    } else if (
      lowerMessage.includes("format") ||
      lowerMessage.includes("layout") ||
      lowerMessage.includes("design") ||
      lowerMessage.includes("template")
    ) {
      category = "format"
    } else if (
      lowerMessage.includes("summary") ||
      lowerMessage.includes("profile") ||
      lowerMessage.includes("objective")
    ) {
      category = "summary"
    } else if (
      lowerMessage.includes("education") ||
      lowerMessage.includes("degree") ||
      lowerMessage.includes("university") ||
      lowerMessage.includes("college")
    ) {
      category = "education"
    }

    // Get a random response from the selected category
    const responses = mockResponses[category]
    const randomIndex = Math.floor(Math.random() * responses.length)
    const response = responses[randomIndex]

    // Add personalization if context is available
    let personalizedResponse = response
    if (context) {
      // Extract name from context if available
      const nameMatch = context.match(/Name:\s*([^\n]+)/)
      const name = nameMatch ? nameMatch[1].trim() : null

      if (name) {
        personalizedResponse = `Hi ${name}, ${response.charAt(0).toLowerCase()}${response.slice(1)}`
      }
    }

    return NextResponse.json({ response: personalizedResponse })
  } catch (error) {
    console.error("Error in chat API route:", error)
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
