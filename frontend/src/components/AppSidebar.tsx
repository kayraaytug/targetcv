import { FolderRoot, User, BookType, FileText, BriefcaseBusiness, GraduationCap, Trophy, Dumbbell } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { SectionId } from "@/types"
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { NavUser } from "./sidebar/nav-user";

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
    title: "Template",
    id: "template",
    icon: FileText,
  },
  {
    title: "Profile",
    id: "profile",
    icon: User,
  },
  {
    title: "Work",
    id: "work",
    icon: BriefcaseBusiness,
  },
  {
    title: "Education",
    id: "education",
    icon: GraduationCap,
  },
  {
    title: "Awards",
    id: "awards",
    icon: Trophy,
  },
  {
    title: "Skills",
    id: "skills",
    icon: Dumbbell,
  },
  {
    title: "Projects",
    id: "projects",
    icon: FolderRoot,
  },
  {
    title: "Languages",
    id: "languages",
    icon: BookType,
  },
  {
    title: "References",
    id: "references",
    icon: User,
  },
];

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe(); // clean up listener on unmount
  }, []);

  const userdata = {
    name: user?.displayName || "M. Doe",
    username: user?.email?.split("@")[0] || "mdoe",
    email: user?.email || "",
    avatar: user?.photoURL || "/avatars/shadcn.jpg",
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
      <SidebarHeader className="flex items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-tight">
          TargetCV
        </a>
      </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className={activeSection === item.id ? "bg-accent" : ""}
                  >
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      className="flex items-center gap-2 w-full"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={userdata} />}
      </SidebarFooter>
    </Sidebar>
  );
}
