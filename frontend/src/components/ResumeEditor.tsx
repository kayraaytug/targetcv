// src/components/resume/ResumeEditor.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionId } from "@/types";
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
}

export function ResumeEditor({ activeSection }: ResumeEditorProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "work":
        return <WorkSection />;
      case "education":
        return <EducationSection />;
      case "awards":
        return <AwardsSection />;
      case "skills":
        return <SkillsSection />;
      case "projects":
        return <ProjectsSection />;
      case "languages":
        return <LanguagesSection />;
      case "references":
        return <ReferencesSection />;
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