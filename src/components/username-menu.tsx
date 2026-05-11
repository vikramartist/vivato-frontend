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
import { useGetMyUser } from "@/api/MyUserApi"

const UsernameMenu = () => {
  const { user, logout } = useAuth0()
  const { currentUser } = useGetMyUser()
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-fit items-center gap-2 rounded-full border px-3 font-bold hover:text-orange-500">
        <img
          src={user?.picture}
          alt={user?.given_name}
          className="h-8 w-8 rounded-xl bg-cover"
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
            onClick={() => logout()}
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
