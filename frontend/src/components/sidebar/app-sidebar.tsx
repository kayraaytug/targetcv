import * as React from "react"
import {
  Command,
  LifeBuoy,
  Send,
} from "lucide-react"
import { Calendar, Inbox, User, Settings } from "lucide-react"

import { getAuth } from "firebase/auth";
import { NavMain } from "@/components/sidebar/nav-main"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const auth = getAuth()
const user = auth.currentUser;

const data = {
  user: {
    name: user?.displayName || "M. Doe",
    username: user?.email?.split("@")[0] || "mdoe",
    email: user?.email || "",
    avatar: user?.photoURL || "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Profile",
      url: "profile",
      icon: User,
    },
    {
      title: "Work",
      url: "work",
      icon: Inbox,
    },
    {
      title: "Education",
      url: "education",
      icon: Calendar,
    },
    {
      title: "Awards",
      url: "awards",
      icon: Settings,
    },
    {
      title: "Skills",
      url: "skills",
      icon: Settings,
    },
    {
      title: "Projects",
      url: "projects",
      icon: Inbox,
    },
    {
      title: "Languages",
      url: "languages",
      icon: User,
    },
    {
      title: "References",
      url: "references",
      icon: Inbox,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">TargetCV</span>
                  <span className="truncate text-xs">Placeholder</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
