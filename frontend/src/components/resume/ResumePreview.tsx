// ResumePreview.tsx
import { Basics, Work, Education, Award, Skill, Project, Language, Reference } from "@/types"

type ResumePreviewProps = {
  basics: Basics
  work: Work[]
  education: Education[]
  awards: Award[]
  skills: Skill[]
  projects: Project[]
  languages: Language[]
  references: Reference[]
}

export default function ResumePreview({
  basics,
  work,
  education,
  awards,
  skills,
  projects,
  languages,
  references,
}: ResumePreviewProps) {
  return (
    <div className="flex border flex-col w-full h-screen gap-4 overflow-auto p-6">
      <h1 className="text-3xl font-bold">{basics.name}</h1>
      <p className="text-sm text-gray-600">{basics.label}</p>
      <p>{basics.email} | {basics.phone} | {basics.url}</p>
      <p>{basics.summary}</p>

      <hr className="my-4" />

      <h2 className="text-xl font-semibold">Work Experience</h2>
      {work.map((job, idx) => (
        <div key={idx}>
          <p className="font-bold">{job.position} @ {job.name}</p>
          <p className="text-sm text-gray-600">{job.startDate} - {job.endDate}</p>
          <p>{job.summary}</p>
        </div>
      ))}

      {/* Repeat similarly for other sections */}
    </div>
  )
}
