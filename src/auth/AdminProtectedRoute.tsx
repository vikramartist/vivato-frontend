import { useGetMyUser } from "@/api/MyUserApi"
import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

const AdminProtectedRoute = () => {
  const { isAuthenticated } = useAuth0()
  const { currentUser } = useGetMyUser()

  return isAuthenticated && currentUser?.role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace />
  )
}

export default AdminProtectedRoute
