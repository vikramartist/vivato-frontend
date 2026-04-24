import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import HomePage from "./pages/home-page"
import AuthCallbackPage from "./pages/auth-call-back"
import UserProfilePage from "./components/user-profile-page"
import ProtectedRoute from "./auth/ProtectedRoute"
import AdminLayout from "./layouts/admin-layout.tsx"
import Roles from "./components/admin/roles.tsx"
import Restaurants from "./components/admin/restaurants.tsx"
import RestaurantPage from "./components/restaurant-page.tsx"
import AdminProtectedRoute from "./auth/AdminProtectedRoute.tsx"

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="roles" element={<Roles />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route />
        </Route>
      </Route>
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/my-restaurants"
          element={
            <Layout>
              <RestaurantPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  )
}

export default AppRoutes
