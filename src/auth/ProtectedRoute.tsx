import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading)
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Loading...</span>
      </div>
    )

  if (isAuthenticated) return <Outlet />

  return <Navigate to={"/"} replace />
}

export default ProtectedRoute
