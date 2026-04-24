import { useCreateMyRestaurant } from "@/api/MyRestaurantApi"
import RestaurantForm from "@/forms/restaurantForm/restaurant-form"

const RestaurantPage = () => {
  const { isLoading, createRestaurant } = useCreateMyRestaurant()

  return <RestaurantForm onSave={createRestaurant} isLoading={isLoading} />
}

export default RestaurantPage
