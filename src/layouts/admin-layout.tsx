import AdminSidebar from "@/components/admin/admin-sidebar"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import AdminHeader from "@/components/admin/admin-header"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout
