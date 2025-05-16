import { Calendar, Inbox, User, Settings } from "lucide-react"

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
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-tight">
          TargetCV
        </a>
      </SidebarHeader>
      <SidebarContent>
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
