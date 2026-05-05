import { useAuth0 } from "@auth0/auth0-react"
import Logo from "./logo"
import MainNav from "./main-nav"
import MobileNav from "./mobile-nav"
import { ModeToggle } from "./mode-toggle"
import RoleRequestPage from "@/pages/role-request-page"
import { useGetMyUser } from "@/api/MyUserApi"
import { useGetRoleRequest } from "@/api/MyRoleApi"
import AdminDashboard from "./admin/admin-dashboard"
import { useLocation, useNavigate } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import { Home, MapPinHouse } from "lucide-react"

const Header = () => {
  const { isAuthenticated } = useAuth0()
  const { currentUser } = useGetMyUser()
  const { getRole } = useGetRoleRequest()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isMapOpened = pathname === "/restaurants/maps"

  return (
    <div className="border-b-2 border-orange-500 py-6 dark:border-b-[#111827] dark:bg-[#0b1220]">
      <div className="container mx-auto flex items-center justify-between px-2">
        <Logo />
        <div className="flex items-center gap-2 px-2 md:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                onClick={() =>
                  navigate(isMapOpened ? "/" : "/restaurants/maps")
                }
              >
                {!isMapOpened ? (
                  <MapPinHouse className="text-[9px] text-orange-500 md:text-[13px] dark:text-white" />
                ) : (
                  <Home className="text-[9px] text-orange-500 md:text-[13px] dark:text-white" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-[9px] md:text-sm">
                {isMapOpened ? "Go back Home" : "View Restaurants in Maps"}
              </p>
            </TooltipContent>
          </Tooltip>
          <ModeToggle />
          {isAuthenticated && currentUser?.role === "Admin" && (
            <AdminDashboard />
          )}
          {isAuthenticated &&
            currentUser?.role !== "Admin" &&
            getRole?.request?.currentRole !== "Owner" && <RoleRequestPage />}
          <MobileNav />
        </div>
        <div className="z-9000 hidden gap-2 px-2 md:block">
          <MainNav />
        </div>
      </div>
    </div>
  )
}

export default Header
