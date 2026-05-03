import { useGetRestaurantById } from "@/api/RestaurantApi"
import RestaurantInfo from "@/components/restaurant-info"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useParams } from "react-router-dom"

const DetailPage = () => {
  const { restaurantId } = useParams()

  const { isLoading, restaurant } = useGetRestaurantById(restaurantId)

  if (isLoading || !restaurant) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="h-full w-full rounded-md object-cover shadow-md"
        />
      </AspectRatio>
      <div className="grid gap-5 md:grid-cols-[4fr_2fr] md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
        </div>
      </div>
    </div>
  )
}

export default DetailPage
