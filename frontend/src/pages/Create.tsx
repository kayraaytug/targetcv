import { useState, useCallback } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ResumeEditor } from "@/components/ResumeEditor";
import ResumeHTMLPreview from "@/components/ResumeHTMLPreview";
import { SectionId } from "@/types";
import { Button } from "@/components/ui/button";
import { Download, Play } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";

export default function Create() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  const exportToJSON = useResumeStore(useCallback(state => state.exportToJSON, []));
  const exportToPDF = useResumeStore(useCallback(state => state.exportToPDF, []));
  const makeHTMLPreview = useResumeStore(useCallback(state => state.makeHTMLPreview, []));

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
            <div className="flex justify-between items-center p-4 border-b">
              <Button 
                variant="default" 
                className="bg-green-500 hover:bg-green-600" 
                onClick={makeHTMLPreview}
              >
                <Play className="w-4 h-4 mr-2" />
                Preview
              </Button>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={exportToPDF}
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button 
                  variant="outline" 
                  onClick={exportToJSON}
                >
                  <Download className="w-4 h-4 mr-2" />
                  JSON
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ResumeHTMLPreview />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
