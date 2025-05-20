import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ResumeEditor } from "@/components/ResumeEditor";
import ResumeHTMLPreview from "@/components/ResumePreview";
import { SectionId } from "@/types";
import ExportButtons from "@/components/ExportButtons";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Create() {
  const [activeSection, setActiveSection] = useState<SectionId>("template");

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full relative">
        <AppSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <SidebarTrigger className="w-8 h-8 text-sm"/>
        <div className="flex-1 flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2 overflow-y-auto">
            <ResumeEditor activeSection={activeSection} />
          </div>
          <div className="w-full sm:w-1/2 flex-1 overflow-y-auto">
            {useIsMobile() ? (
              <div className="absolute top-4 right-4">
                <ExportButtons></ExportButtons>
              </div>
            ) : (
              <ResumeHTMLPreview />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
