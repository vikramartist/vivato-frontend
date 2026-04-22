import {
  ChevronsUpDown,
  HotelIcon,
  LogOut,
  MapPinHouse,
  UserCheck2,
  UserCogIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useAuth0 } from "@auth0/auth0-react"
import { Link, useNavigate } from "react-router-dom"
import { ModeToggle } from "../mode-toggle"
import { useState } from "react"
import { cn } from "@/lib/utils"

const adminData = {
  navMain: [
    {
      title: "User Roles",
      url: "/admin/roles",
      icon: UserCheck2,
      name: "user",
    },
    {
      title: "Restaurants",
      url: "/admin/restaurants",
      icon: HotelIcon,
      name: "restaurant",
    },
  ],
}

const AdminSidebar = () => {
  const { user, logout } = useAuth0()
  const navigate = useNavigate()
  const { isMobile } = useSidebar()
  const [active, setActive] = useState("user")

  const handleActive = (name: string) => {
    setActive(name)
  }

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className={"group flex h-screen flex-col items-center justify-center"}
    >
      <SidebarHeader>
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size={"lg"}
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.picture} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {user?.given_name?.toString().substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.picture} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">
                      {user?.given_name
                        ?.toString()
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ModeToggle />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => navigate("/")}
                  className="text-orange-500 dark:text-white"
                >
                  <MapPinHouse className="hover: text-orange-500 dark:text-white" />
                  Homepage
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/user-profile")}
                  className="text-orange-500 dark:text-white"
                >
                  <UserCogIcon className="hover: text-orange-500 dark:text-white" />
                  Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => logout()}
                className="text-orange-500 dark:text-white"
              >
                <LogOut className="text-orange-500 dark:text-white" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {adminData.navMain.map(({ title, url, icon: Icon, name }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={`Manage ${title}`}
                    className={cn(
                      active === name
                        ? "text-orange-500 hover:text-orange-400 dark:bg-gray-300 dark:text-orange-600 dark:hover:bg-gray-300"
                        : ""
                    )}
                  >
                    <Link to={`${url}`} onClick={() => handleActive(name)}>
                      <Icon />
                      <span className="group-data-[collapsible=icon]">
                        {title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="w-full">
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col items-center gap-2">
            <img src="/logo.svg" alt="logo" className="h-6 w-6 items-start" />
            <span className="animate-in text-[9px] transition group-data-[collapsible=icon]:hidden md:text-[10px]">
              Copyright @ {new Date().getFullYear()} All rights reserved
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default AdminSidebar
