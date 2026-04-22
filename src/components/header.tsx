import { useAuth0 } from "@auth0/auth0-react"
import Logo from "./logo"
import MainNav from "./main-nav"
import MobileNav from "./mobile-nav"
import { ModeToggle } from "./mode-toggle"
import RoleRequestPage from "./role-request-page"
import { useGetMyUser } from "@/api/MyUserApi"
import { useGetRoleRequest } from "@/api/MyRoleApi"
import AdminDashboard from "./admin/admin-dashboard"

const Header = () => {
  const { isAuthenticated } = useAuth0()
  const { currentUser } = useGetMyUser()
  const { getRole } = useGetRoleRequest()
  return (
    <div className="border-b-2 border-orange-500 py-6 dark:border-b-[#111827] dark:bg-[#0b1220]">
      <div className="container mx-auto flex items-center justify-between px-2">
        <Logo />
        <div className="flex items-center gap-2 px-2 md:hidden">
          <ModeToggle />
          {isAuthenticated && currentUser?.role === "Admin" && (
            <AdminDashboard />
          )}
          {isAuthenticated &&
            currentUser?.role !== "Admin" &&
            getRole?.request?.currentRole !== "Owner" && <RoleRequestPage />}
          <MobileNav />
        </div>
        <div className="hidden gap-2 px-2 md:block">
          <MainNav />
        </div>
      </div>
    </div>
  )
}

export default Header
