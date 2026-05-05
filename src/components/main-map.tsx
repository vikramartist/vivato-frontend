import { useGetAllRestaurants } from "@/api/RestaurantApi"
import MapPage from "@/pages/map-page"
import { useParams } from "react-router-dom"

const MainMap = () => {
  const { isLoading, restaurants } = useGetAllRestaurants()
  const { restaurantId } = useParams()

  if (isLoading || !restaurants) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Loading...</span>
      </div>
    )
  }

  const className = "w-full h-[80vh] rounded-lg"

  if (restaurantId) {
    return (
      <div className="p-2 md:p-2">
        <MapPage restaurantId={restaurantId} className={className} />
      </div>
    )
  }

  return (
    <div className="p-2 md:p-2">
      <MapPage restaurants={restaurants} className={className} />
    </div>
  )
}

export default MainMap
