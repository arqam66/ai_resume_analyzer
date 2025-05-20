// This file contains sample job descriptions for keyword matching

export interface JobDescription {
  id: string
  title: string
  company: string
  keywords: string[]
}

export const jobDescriptions: JobDescription[] = [
  {
    id: "software-developer",
    title: "Software Developer",
    company: "Tech Innovations Inc.",
    keywords: [
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
      "Git",
      "Problem solving",
      "Communication skills",
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    company: "Data Analytics Co.",
    keywords: [
      "Python",
      "R",
      "SQL",
      "Machine Learning",
      "Data Visualization",
      "Statistical Analysis",
      "TensorFlow",
      "PyTorch",
      "Pandas",
      "NumPy",
      "Jupyter",
      "Big Data",
      "Data Mining",
      "A/B Testing",
      "Natural Language Processing",
      "Deep Learning",
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    company: "Product Innovations",
    keywords: [
      "Product Strategy",
      "User Research",
      "Agile",
      "Scrum",
      "Roadmapping",
      "Stakeholder Management",
      "Market Analysis",
      "User Stories",
      "KPIs",
      "Analytics",
      "A/B Testing",
      "Wireframing",
      "Prototyping",
      "Communication",
      "Leadership",
      "Prioritization",
    ],
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    company: "Design Solutions",
    keywords: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Figma",
      "Adobe XD",
      "Sketch",
      "User Testing",
      "Information Architecture",
      "Interaction Design",
      "Visual Design",
      "Accessibility",
      "Design Systems",
      "User Flows",
      "Usability Testing",
      "Design Thinking",
    ],
  },
  {
    id: "marketing-specialist",
    title: "Marketing Specialist",
    company: "Marketing Experts",
    keywords: [
      "Digital Marketing",
      "Social Media",
      "Content Creation",
      "SEO",
      "SEM",
      "Google Analytics",
      "Email Marketing",
      "Campaign Management",
      "Market Research",
      "Brand Strategy",
      "CRM",
      "Adobe Creative Suite",
      "Copywriting",
      "A/B Testing",
      "Marketing Automation",
    ],
  },
]

export function getJobDescription(id: string): JobDescription | undefined {
  return jobDescriptions.find((job) => job.id === id)
}

export function getAllJobTitles(): { id: string; title: string }[] {
  return jobDescriptions.map((job) => ({ id: job.id, title: job.title }))
}
