import {
  useGetMyRestaurantById,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi"
import RestaurantForm from "@/forms/restaurantForm/restaurant-form"
import type { Restaurant } from "@/type"
import { useParams } from "react-router-dom"

const UpdateRestaurant = () => {
  const { updateRestaurant, isLoading: isUpdating } = useUpdateMyRestaurant()

  const { restaurantId } = useParams()
  const { getRestaurant, isLoading: isFetching } = useGetMyRestaurantById(
    restaurantId!
  )

  const handleUpdate = (data: Restaurant) => {
    if (!data) return

    updateRestaurant({ restaurantData: data, restaurantId: restaurantId! })
  }

  if (isFetching) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Fetching...</span>
      </div>
    )
  }

  if (!getRestaurant) {
    return <div>Restaurant not found...</div>
  }

  return (
    <RestaurantForm
      onSave={handleUpdate}
      isLoading={isUpdating}
      restaurant={getRestaurant}
    />
  )
}

export default UpdateRestaurant
