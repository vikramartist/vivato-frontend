import { useAuth0 } from "@auth0/auth0-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { HotelIcon, LogOut, UserIcon } from "lucide-react"
import type { User } from "@/type"
import { socket } from "@/socket"

const UsernameMenu = ({ currentUser }: { currentUser: User }) => {
  const { logout, user } = useAuth0()
  const navigate = useNavigate()

  if (!currentUser) return null

  const handleLogout = () => {
    if (currentUser?.role === "Rider" && socket.connected) {
      socket.emit("rider-offline")
      socket.disconnect()
    }

    logout({
      logoutParams: {
        returnTo: import.meta.env.VITE_AUTH0_CALLBACK_URL as string,
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 font-bold hover:text-orange-500">
        <img
          src={user?.picture ?? currentUser.profile_pic}
          alt={currentUser?.name}
          className="h-8 w-8 rounded-full bg-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {currentUser?.role === "Owner" && (
          <>
            <DropdownMenuItem onClick={() => navigate("/my-restaurants")}>
              <Button
                variant={"outline"}
                className="flex-1 text-[14px] font-bold hover:text-orange-500"
              >
                <HotelIcon />
                My Restaurants
              </Button>
            </DropdownMenuItem>
            <Separator />
          </>
        )}

        <DropdownMenuItem onClick={() => navigate("/user-profile")}>
          <Button
            variant={"outline"}
            className="flex-1 font-bold hover:text-orange-500"
          >
            <UserIcon />
            Profile
          </Button>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={handleLogout}
            className="flex flex-1 bg-orange-500 font-bold"
          >
            <LogOut />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu
