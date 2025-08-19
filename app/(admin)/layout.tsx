import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import SideBarNavMenu from "./components/SidebarNavMenu";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SideBarNavMenu />
        <section className="p-4">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default AdminLayout;
