import { Calendar, Inbox, User, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SectionId } from "@/types"

interface SidebarItem {
  title: string;
  id: SectionId;
  icon: React.ElementType;
}

interface AppSidebarProps {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
}

// Menu items.
const items: SidebarItem[] = [
  {
    title: "Profile",
    id: "profile",
    icon: User,
  },
  {
    title: "Work",
    id: "work",
    icon: Inbox,
  },
  {
    title: "Education",
    id: "education",
    icon: Calendar,
  },
  {
    title: "Awards",
    id: "awards",
    icon: Settings,
  },
  {
    title: "Skills",
    id: "skills",
    icon: Settings,
  },
  {
    title: "Projects",
    id: "projects",
    icon: Inbox,
  },
  {
    title: "Languages",
    id: "languages",
    icon: User,
  },
  {
    title: "References",
    id: "references",
    icon: Inbox,
  },
];

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl m-auto">TargetCV</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={activeSection === item.id ? "bg-accent" : ""}
                  >
                    <button 
                      onClick={() => setActiveSection(item.id)}
                      className="flex items-center gap-2 w-full"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}