import type { Restaurant } from "@/type"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export const useGetMyRestaurants = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyRestaurants = async (): Promise<Restaurant> => {
    const acceessToken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${acceessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get restaurant!")
    }
    return response.json()
  }

  const {
    data: getRestaurants,
    isLoading,
    error,
    isSuccess,
  } = useQuery("fetchMyRestaurant", getMyRestaurants)

  if (isSuccess) {
    toast.success("Restaurants Fecthed!")
  }

  if (error) {
    toast.error("Failed to get restaurants!")
  }

  return { getRestaurants, isLoading }
}

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
      console.log(await response.json())
      throw new Error("Failed to create Restaurant!")
    }

    return response.json()
  }
  const {
    mutate: createRestaurant,
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
