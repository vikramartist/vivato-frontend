import { useGetNearbyRestaurants } from "@/api/RestaurantApi"
import SearchBar from "@/components/search-bar"
import SearchCard from "@/components/search/search-card"
import { useSearchParams } from "react-router-dom"

const NearbyRestaurantsPage = () => {
  const [searchParams] = useSearchParams()

  const lat = Number(searchParams.get("lat"))
  const lng = Number(searchParams.get("lng"))

  const { isLoading, nearbyRestaurants } = useGetNearbyRestaurants({ lat, lng })

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">
          Searching Nearby Restaurants...
        </span>
      </div>
    )
  }

  if (!nearbyRestaurants) {
    return <span>No nearby Restaurants found</span>
  }

  const handleSearchSubmit = () => {
    return
  }

  return (
    <div className="flex w-full flex-col items-start justify-center gap-2">
      <div className="w-[80%] flex-1 space-y-2">
        <SearchBar
          placeHolder="Not enabled now"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div id="main-content" className="flex flex-col items-start gap-5">
        <span className="px-2">
          Found{" "}
          {nearbyRestaurants.length > 1
            ? `${nearbyRestaurants.length} Restaurants `
            : `${nearbyRestaurants.length} Restaurant `}
          near you
        </span>
        <div className="grid grid-cols-1 gap-5 px-2 md:grid-cols-2 xl:grid-cols-2">
          {nearbyRestaurants.map((restaurant, index) => (
            <SearchCard restaurant={restaurant} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NearbyRestaurantsPage
