import { useAuth0 } from "@auth0/auth0-react"
import Logo from "./logo"
import MainNav from "./main-nav"
import MobileNav from "./mobile-nav"
import { ModeToggle } from "./mode-toggle"
import RoleRequestPage from "@/pages/role-request-page"
import { useGetMyUser, useGetRiderProfile } from "@/api/MyUserApi"
import { useGetRoleRequest } from "@/api/MyRoleApi"
import AdminDashboard from "./admin/admin-dashboard"
import { useLocation, useNavigate } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import { Home, LucideBuilding2, MapPinHouse } from "lucide-react"
import { getUserLocation } from "@/lib/utils"
import { Badge } from "./ui/badge"
import { useEffect } from "react"
import { socket } from "@/socket"

const Header = () => {
  const { isAuthenticated } = useAuth0()
  const { currentUser } = useGetMyUser()
  const { getRole } = useGetRoleRequest()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { getRider } = useGetRiderProfile()

  const isMapOpened = pathname === "/restaurants/maps"

  useEffect(() => {
    if (!currentUser) return

    if (currentUser.role !== "Rider") {
      return
    }

    if (!socket.connected) return

    socket.emit("rider-online")

    const interval = setInterval(() => {
      socket.emit("heartbeat")
    }, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [currentUser])

  const handleLocationClick = async () => {
    try {
      const { latitude, longitude } = await getUserLocation()
      navigate({
        pathname: `/restaurants/nearby`,
        search: `?lat=${latitude}&lng=${longitude}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="border-b-2 border-orange-500 py-6 dark:border-b-[#111827] dark:bg-[#0b1220]">
      <div className="container mx-auto flex items-center justify-between px-2">
        <div className="flex items-center justify-center gap-2">
          <Logo />
          {isAuthenticated && (
            <>
              {getRider?.status === "Online" ||
              currentUser?.role === "Customer" ||
              currentUser?.role === "Owner" ? (
                <div className="flex items-start justify-start">
                  <Badge
                    className="flex w-18 items-center justify-center gap-2 bg-green-800 px-2"
                    variant={"outline"}
                  >
                    <span className="text-[11px] text-white md:text-sm">
                      Online
                    </span>
                    <div className="relative flex items-center justify-center">
                      <span className="absolute h-3 w-3 animate-ping rounded-full bg-green-500 opacity-75" />
                      <span className="absolute h-2 w-2 rounded-full bg-green-500" />
                    </div>
                  </Badge>
                </div>
              ) : getRider?.status === "Busy" ? (
                <div className="flex items-start">
                  <Badge
                    variant={"outline"}
                    className="flex w-18 items-center justify-center bg-red-500 px-2"
                  >
                    <span className="text-[11px] text-white md:text-sm">
                      Busy
                    </span>
                  </Badge>
                </div>
              ) : getRider?.status === "Leave" ? (
                <div className="flex items-start">
                  <Badge
                    variant={"outline"}
                    className="flex w-18 items-center justify-center bg-pink-500 px-2"
                  >
                    <span className="text-[11px] text-white md:text-sm">
                      Leave
                    </span>
                  </Badge>
                </div>
              ) : (
                <div className="flex items-start">
                  <Badge
                    variant={"outline"}
                    className="flex w-18 items-center justify-center bg-gray-700 px-2"
                  >
                    <span className="text-[11px] text-white md:text-sm">
                      Offline
                    </span>
                  </Badge>
                </div>
              )}
            </>
          )}
          {currentUser?.role === "Customer" && (
            <div className="w-full items-start justify-between">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={"outline"} onClick={handleLocationClick}>
                    <LucideBuilding2 className="h-3.5 w-3.5 text-orange-500 md:h-4 md:w-4 dark:text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-[9px] md:text-sm">
                    Find Restaurants near me
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

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
