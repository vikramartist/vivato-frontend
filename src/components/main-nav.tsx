import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UsernameMenu from "./username-menu"
import { ModeToggle } from "./mode-toggle"
import RoleRequestPage from "@/pages/role-request-page"
import { useGetMyUser } from "@/api/MyUserApi"
import { useGetRoleRequest } from "@/api/MyRoleApi"
import AdminDashboard from "./admin/admin-dashboard"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Home, MapPinHouse, ShoppingBag } from "lucide-react"

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const { currentUser } = useGetMyUser()
  const { getRole } = useGetRoleRequest()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isMapOpened = pathname === "/restaurants/maps"

  return (
    <span className="flex items-center justify-between space-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            onClick={() => navigate(isMapOpened ? "/" : "/restaurants/maps")}
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
      {isAuthenticated ? (
        <>
          {currentUser?.role === "Admin" && <AdminDashboard />}
          {currentUser?.role !== "Admin" &&
            getRole?.request?.currentRole !== "Owner" && <RoleRequestPage />}
          <Button className="flex" type="button" variant={"outline"} asChild>
            <div className="items-center gap-2">
              <ShoppingBag className="text-orange-500 dark:text-white" />
              <Link
                to={"/order-status"}
                className="font-semibold hover:text-orange-500 dark:hover:text-white"
              >
                Order Status
              </Link>
            </div>
          </Button>

          <UsernameMenu />
        </>
      ) : (
        <Button
          onClick={async () => await loginWithRedirect()}
          variant={"ghost"}
          className="font-bold hover:bg-white hover:text-orange-500 dark:text-white"
        >
          Log In
        </Button>
      )}
    </span>
  )
}

export default MainNav
