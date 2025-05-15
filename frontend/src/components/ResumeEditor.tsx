// src/components/resume/ResumeEditor.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionId, ResumeData } from "@/types";
import {
  ProfileSection,
  WorkSection,
  EducationSection,
  AwardsSection,
  SkillsSection,
  ProjectsSection,
  LanguagesSection,
  ReferencesSection,
} from "@/components/resume";

interface ResumeEditorProps {
  activeSection: SectionId;
  resumeData: ResumeData;
  updateHandlers: {
    updateBasics: (basics: ResumeData['basics']) => void;
    updateWork: (work: ResumeData['work']) => void;
    updateEducation: (education: ResumeData['education']) => void;
    updateAwards: (awards: ResumeData['awards']) => void;
    updateSkills: (skills: ResumeData['skills']) => void;
    updateProjects: (projects: ResumeData['projects']) => void;
    updateLanguages: (languages: ResumeData['languages']) => void;
    updateReferences: (references: ResumeData['references']) => void;
  };
}

export function ResumeEditor({ activeSection, resumeData, updateHandlers }: ResumeEditorProps) {
  // Render the appropriate section based on activeSection
  const renderSection = () => {
    const {
      updateBasics,
      updateWork,
      updateEducation,
      updateAwards,
      updateSkills,
      updateProjects,
      updateLanguages,
      updateReferences
    } = updateHandlers;

    switch (activeSection) {
      case "profile":
        return <ProfileSection basics={resumeData.basics} onChange={updateBasics} />;
      case "work":
        return <WorkSection work={resumeData.work} onChange={updateWork} />;
      case "education":
        return <EducationSection education={resumeData.education} onChange={updateEducation} />;
      case "awards":
        return <AwardsSection awards={resumeData.awards} onChange={updateAwards} />;
      case "skills":
        return <SkillsSection skills={resumeData.skills} onChange={updateSkills} />;
      case "projects":
        return <ProjectsSection projects={resumeData.projects} onChange={updateProjects} />;
      case "languages":
        return <LanguagesSection languages={resumeData.languages} onChange={updateLanguages} />;
      case "references":
        return <ReferencesSection references={resumeData.references} onChange={updateReferences} />;
      default:
        return null;
    }
  };

  return (
    <ScrollArea className="h-screen">
      {renderSection()}
    </ScrollArea>
  );
}