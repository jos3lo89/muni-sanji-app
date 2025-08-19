import { auth } from "@/auth";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { PacmanLoader } from "react-spinners";
import { UserMenu } from "./UserMenu";

export async function NavUser() {
  const session = await auth();

  if (!session?.user) {
    return <PacmanLoader color="#fff" />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserMenu user={session.user} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
