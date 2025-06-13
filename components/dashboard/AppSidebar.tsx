"use client"
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
import { Cable, Home, Settings,} from "lucide-react"

import { Progress } from "../ui/progress"
import { UploadPdfButtton } from "./UploadPdfButton"
import { useUserData } from "@/hooks/use-user-data"




// Menu items.
const items = [
  {
    title: "Workspace",
    url: "#",
    icon: Home,
  },
  {
    title: "Upgrade",
    url: "#",
    icon: Cable,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
 


export const AppSidebar = () => {
  const { userDetails, isInitialized, internalUserId } = useUserData();

  const totalPdf = userDetails?.plan === "free" ? 3 : 5;

  // Show loading state while initializing
  if (!isInitialized || !internalUserId) {
    return (
      <Sidebar variant="floating">
        <SidebarHeader className="pt-3 font-bold">
          Chat with PDF
        </SidebarHeader>
        <SidebarContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="pt-3 font-bold">
        Chat with PDF
      </SidebarHeader>
       <SidebarContent>
        <SidebarGroup />
       
        <UploadPdfButtton variant="Sidebar" />
        
        <SidebarGroupContent>
        <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarGroupContent>

        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter >
        <div className="border py-3 px-2 rounded-md text-center">
          <Progress value={((userDetails?.pdfUploadCount || 0) / totalPdf) * 100} />
          <p className="text-sm mt-3 ">{userDetails?.pdfUploadCount} out of {totalPdf} PDF uploaded</p>
          <p className="mt-1 text-xs text-muted-foreground"> Upgrade to upload more PDF</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar;
