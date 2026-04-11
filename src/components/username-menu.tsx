import { useAuth0 } from "@auth0/auth0-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

const UsernameMenu = () => {
  const { user, logout } = useAuth0()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 font-bold hover:text-orange-500">
        <img src={user?.picture} alt="User" className="h-8 w-8 rounded-xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to={"/user-profile"}
            className="font-bold hover:text-orange-500"
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 bg-orange-500 font-bold"
          >
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu
