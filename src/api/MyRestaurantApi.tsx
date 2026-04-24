import type { Restaurant } from "@/type"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createMyRestaurant = async (
    restaurantData: Restaurant
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(restaurantData),
    })

    if (!response.ok) {
      throw new Error("Failed to create Restaurant!")
    }

    return response.json()
  }
  const {
    mutateAsync: createRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createMyRestaurant)

  if (error) {
    toast.error("Failed to Create Restaurant!")
  }

  if (isSuccess) {
    toast.success("Restaurant Created!")
  }

  return { createRestaurant, isLoading }
}
