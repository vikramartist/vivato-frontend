import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { useGetMyUser } from "@/api/MyUserApi"
import { LogOut, ShoppingBag, User, Utensils } from "lucide-react"

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
          <Utensils />
          My Restaurants
        </Button>
      )}
      <Button
        onClick={() => navigate("/order-status")}
        variant={"outline"}
        className="flex items-center text-[10px] font-semibold tracking-tight hover:text-orange-500 dark:bg-[#201f1f] dark:text-white"
        size={"sm"}
      >
        <ShoppingBag />
        Order Status
      </Button>
      <Button
        onClick={() => navigate("/user-profile")}
        variant={"outline"}
        className="flex items-center text-[10px] font-semibold tracking-tight hover:text-orange-500 dark:bg-[#201f1f] dark:text-white"
        size={"sm"}
      >
        <User />
        Profile
      </Button>
      <Button
        onClick={() => logout()}
        variant={"link"}
        size={"sm"}
        className="flex items-center px-3 text-[10px] font-bold text-orange-500 md:text-sm dark:text-white"
      >
        <LogOut className="md text-[10px] text-orange-500 md:text-sm dark:text-white" />
        Log out
      </Button>
    </>
  )
}

export default MobilenavLinks
