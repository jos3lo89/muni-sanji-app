import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { Organization } from "./Organization";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { sideBarData } from "./ItemsData";
import { UserRole } from "@prisma/client";

export async function AppSidebar() {
  const session = await auth();
  const role = session?.user?.role as UserRole;

  const navItems = (role && sideBarData.navMain[role]) ?? [];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <Organization teams={sideBarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
