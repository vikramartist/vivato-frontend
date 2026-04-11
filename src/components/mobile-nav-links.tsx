import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const MobilenavLinks = () => {
  const { logout } = useAuth0()
  const navigate = useNavigate()
  return (
    <>
      <Button
        onClick={() => navigate("/user-profile")}
        variant={"outline"}
        className="flex items-center font-semibold tracking-tight hover:text-orange-500 dark:bg-[#7891b8] dark:text-white dark:hover:bg-[#6c7e9b]"
        size={"sm"}
      >
        Profile
      </Button>
      <Button
        onClick={() => logout()}
        variant={"destructive"}
        size={"sm"}
        className="flex items-center px-3 font-bold"
      >
        Log out
      </Button>
    </>
  )
}

export default MobilenavLinks
