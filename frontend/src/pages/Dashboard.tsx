import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SectionId } from "@/types";

export default function Create() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <h1>Protected route here</h1>
        </div>
    </SidebarProvider>
  );
}
