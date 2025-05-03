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
          <Progress value={33} />
          <p className="text-sm mt-3 ">2 out of 5 PDF uploaded</p>
          <p className="mt-1 text-xs text-muted-foreground"> Upgrade to upload more PDF</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar;
