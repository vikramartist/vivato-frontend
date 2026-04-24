import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { useGetMyUser } from "@/api/MyUserApi"

const MobilenavLinks = () => {
  const { logout } = useAuth0()
  const navigate = useNavigate()
  const { currentUser } = useGetMyUser()
  return (
    <>
      {currentUser?.role === "Admin" && (
        <Button
          onClick={() => navigate("/admin")}
          variant={"outline"}
          className="flex items-center text-[10px] font-semibold tracking-tight hover:text-orange-500 dark:bg-[#201f1f] dark:text-white"
          size={"sm"}
        >
          Admin Dashboard
        </Button>
      )}
      {currentUser?.role === "Owner" && (
        <Button
          onClick={() => navigate("/my-restaurants")}
          variant={"outline"}
          className="flex items-center text-[10px] font-semibold tracking-tight hover:text-orange-500 dark:bg-[#201f1f] dark:text-white"
          size={"sm"}
        >
          My Restaurants
        </Button>
      )}
      <Button
        onClick={() => navigate("/user-profile")}
        variant={"outline"}
        className="flex items-center text-[10px] font-semibold tracking-tight hover:text-orange-500 dark:bg-[#201f1f] dark:text-white"
        size={"sm"}
      >
        Profile
      </Button>
      <Button
        onClick={() => logout()}
        variant={"link"}
        size={"sm"}
        className="flex items-center px-3 text-[10px] font-bold text-orange-500 dark:text-white"
      >
        Log out
      </Button>
    </>
  )
}

export default MobilenavLinks
