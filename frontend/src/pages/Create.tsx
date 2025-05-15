// src/pages/Create.tsx
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ResumeEditor } from "@/components/ResumeEditor";
import { useResumeData } from "@/hooks/useResumeData";
import ResumeHTMLPreview from "@/components/ResumeHTMLPreview";
import { SectionId } from "@/types";
import { Button } from "@/components/ui/button";
import { Download, Play } from "lucide-react";

export default function Create() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");
  const {
    resumeData,
    updateBasics,
    updateWork,
    updateEducation,
    updateAwards,
    updateSkills,
    updateProjects,
    updateLanguages,
    updateReferences,
    exportToJSON,
    loadSavedData,
  } = useResumeData();

  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex flex-row w-full h-screen gap-4">
        <div className="flex-1">
          <ResumeEditor
            activeSection={activeSection}
            resumeData={resumeData}
            updateHandlers={{
              updateBasics,
              updateWork,
              updateEducation,
              updateAwards,
              updateSkills,
              updateProjects,
              updateLanguages,
              updateReferences,
            }}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center py-4 px-2">
            <div>
              <Button className="bg-green-400">Make<Play /></Button>
            </div>

            <div className="flex gap-4">
              <Button onClick={exportToJSON}>
                <Download /> PDF
              </Button>
              <Button onClick={exportToJSON}>
                <Download /> JSON
              </Button>
            </div>
          </div>
          <ResumeHTMLPreview />
        </div>
      </div>
    </SidebarProvider>
  );
}