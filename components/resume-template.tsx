import { Badge } from "@/components/ui/badge"
import type { ParsedResume } from "@/lib/resume-parser"

interface ResumeTemplateProps {
  resume: ParsedResume
}

export function ResumeTemplate({ resume }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-8 shadow-lg max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{resume.name}</h1>
        <div className="flex justify-center items-center gap-3 mt-2 text-sm text-slate-600">
          <span>{resume.email}</span>
          <span>•</span>
          <span>{resume.phone}</span>
          {resume.location && (
            <>
              <span>•</span>
              <span>{resume.location}</span>
            </>
          )}
        </div>
      </div>

      {resume.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">{resume.summary}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3">Experience</h2>
        <div className="space-y-4">
          {resume.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{exp.title}</h3>
                  <div className="text-sm">{exp.company}</div>
                </div>
                <div className="text-sm text-slate-600">{exp.date}</div>
              </div>
              {exp.description && (
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>
        <div className="space-y-3">
          {resume.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{edu.degree}</h3>
                <div className="text-sm">{edu.institution}</div>
              </div>
              <div className="text-sm text-slate-600">{edu.date}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
