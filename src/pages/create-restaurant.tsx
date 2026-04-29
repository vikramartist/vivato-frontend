import { useCreateMyRestaurant } from "@/api/MyRestaurantApi"
import RestaurantForm from "@/forms/restaurantForm/restaurant-form"

const CreateRestaurant = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant()

  return <RestaurantForm onSave={createRestaurant} isLoading={isLoading} />
}

export default CreateRestaurant
