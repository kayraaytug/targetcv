import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ResumeEditor } from "@/components/ResumeEditor";
import ResumeHTMLPreview from "@/components/ResumePreview";
import { SectionId } from "@/types";

export default function Create() {
  const [activeSection, setActiveSection] = useState<SectionId>("template");

  return (
    
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="flex-1 flex">
          <div className="w-1/2 overflow-y-auto">
            <ResumeEditor activeSection={activeSection} />
          </div>

          <div className="w-1/2 flex flex-col border-l">
            <div className="flex-1 overflow-y-auto">
              <ResumeHTMLPreview />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
