import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UsernameMenu from "./username-menu"
import { ModeToggle } from "./mode-toggle"

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  return (
    <span className="flex items-center justify-between space-x-2">
      <ModeToggle />
      {isAuthenticated ? (
        <UsernameMenu />
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
