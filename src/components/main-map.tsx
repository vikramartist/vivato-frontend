import { useGetAllRestaurants } from "@/api/RestaurantApi"
import MapPage from "@/pages/map-page"

const MainMap = () => {
  const { isLoading, restaurants } = useGetAllRestaurants()

  if (isLoading || !restaurants) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Loading...</span>
      </div>
    )
  }
  return (
    <MapPage
      restaurants={restaurants}
      className="h-screen min-w-sm px-2 md:w-full md:p-1"
    />
  )
}

export default MainMap
