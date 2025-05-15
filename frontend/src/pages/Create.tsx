import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

import {
  ProfileSection,
  WorkSection,
  EducationSection,
  AwardsSection,
  SkillsSection,
  ProjectsSection,
  LanguagesSection,
  ReferencesSection,
} from "@/components/resume"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import ResumePreview from "@/components/resume/ResumePreview"
import { Basics, SectionId, Work, Education, Award, Skill, Project, Language, Reference } from "@/types"

export default function Create() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile")
  const [basics, setBasics] = useState<Basics>({
    name: "",
    label: "",
    email: "",
    phone: "",
    url: "",
    summary: "",
    image: "",
    location: {
      address: "",
      postalCode: "",
      city: "",
      countryCode: "",
      region: "",
    },
    profiles: [],
  })

  const [work, setWork] = useState<Work[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [awards, setAwards] = useState<Award[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [references, setReferences] = useState<Reference[]>([])

  // Render the appropriate section based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection basics={basics} onChange={setBasics} />
      case "work":
        return <WorkSection work={work} onChange={setWork} />
      case "education":
        return <EducationSection education={education} onChange={setEducation} />
      case "awards":
        return <AwardsSection awards={awards} onChange={setAwards} />
      case "skills":
        return <SkillsSection skills={skills} onChange={setSkills} />
      case "projects":
        return <ProjectsSection projects={projects} onChange={setProjects} />
      case "languages":
        return <LanguagesSection languages={languages} onChange={setLanguages} />
      case "references":
        return <ReferencesSection references={references} onChange={setReferences} />
      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex flex-row w-full h-screen gap-4">
        <div className="flex-1">
          <ScrollArea className="h-screen">
            {renderSection()}
          </ScrollArea>
        </div>
        <div className="flex-1">
          <ResumePreview
            basics={basics}
            work={work}
            education={education}
            awards={awards}
            skills={skills}
            projects={projects}
            languages={languages}
            references={references}
          />

        </div>
      </div>
    </SidebarProvider>
  )
}