import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ResumeEditor } from "@/components/ResumeEditor";
import ResumeHTMLPreview from "@/components/ResumePreview";
import { SectionId } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Create() {
  const [activeSection, setActiveSection] = useState<SectionId>("template");

  return (

    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <SidebarTrigger />
        <div className="flex-1 flex">

          <div className="w-1/2 overflow-y-auto">
            <ResumeEditor activeSection={activeSection} />
          </div>
          <div className="w-1/2 flex-1 overflow-y-auto">
            {useIsMobile() ? (
              <div />
            ) : (
              <ResumeHTMLPreview />
            )}
          </div>

        </div>
      </div>
    </SidebarProvider>
  );
}
