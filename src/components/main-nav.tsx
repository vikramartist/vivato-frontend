import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UsernameMenu from "./username-menu"
import { ModeToggle } from "./mode-toggle"
import RoleRequestPage from "@/pages/role-request-page"
import { useGetMyUser } from "@/api/MyUserApi"
import { useGetRoleRequest } from "@/api/MyRoleApi"
import AdminDashboard from "./admin/admin-dashboard"

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const { currentUser } = useGetMyUser()
  const { getRole } = useGetRoleRequest()
  return (
    <span className="flex items-center justify-between space-x-2">
      <ModeToggle />
      {isAuthenticated ? (
        <>
          {currentUser?.role === "Admin" && <AdminDashboard />}
          {currentUser?.role !== "Admin" &&
            getRole?.request?.currentRole !== "Owner" && <RoleRequestPage />}
          <UsernameMenu />
        </>
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
