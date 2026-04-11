import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import MobilenavLinks from "./mobile-nav-links"
import { Spinner } from "./ui/spinner"

const MobileNav = () => {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0()

  if (isLoading) {
    return <Spinner className="h-6 w-6" />
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3 px-2">
        <SheetTitle className="mt-3 flex items-center justify-center gap-2">
          {isAuthenticated ? (
            <span className="flex items-center justify-between gap-2 font-bold">
              <img
                src={user?.picture}
                alt={user?.given_name}
                className="h-8 w-8 rounded-xl shadow-md"
              />
              <span className="text-[12px] md:text-sm">
                Hello! {user?.name}
              </span>
            </span>
          ) : (
            <>
              <img src="/logo.svg" alt="Vivato" className="h-5 w-5" />
              <div>
                Welcome to{" "}
                <span className="font-bold tracking-tighter text-orange-500 italic dark:text-white">
                  Vivato
                </span>
              </div>
            </>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobilenavLinks />
          ) : (
            <Button
              onClick={async () => await loginWithRedirect()}
              className="flex-1 bg-orange-500 font-bold dark:bg-orange-900 dark:text-white dark:hover:bg-orange-700"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
