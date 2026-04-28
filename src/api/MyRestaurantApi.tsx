import type { Restaurant } from "@/type"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

type UpdateMyRestaurantRequest = {
  restaurantData: Restaurant
  restaurantId?: string
}

export const useGetMyRestaurants = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyRestaurants = async (): Promise<Restaurant[]> => {
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

  const { data: getRestaurants, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurants,
    {
      staleTime: 0,
      onSuccess: () => {
        toast.success("Restaurants Fetched!", { id: "fetch-success" })
      },
      onError: () => {
        toast.error("Failed to get restaurants!", { id: "fetch-error" })
      },
    }
  )

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

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateMyRestaurant = async ({
    restaurantData,
    restaurantId,
  }: UpdateMyRestaurantRequest): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/${restaurantId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(restaurantData),
      }
    )
    if (!response.ok) {
      console.log(await response.json())
      throw new Error("Failed to update Restaurant!")
    }

    return response.json()
  }

  const { mutate: updateRestaurant, isLoading } = useMutation(
    updateMyRestaurant,
    {
      onSuccess: () => {
        toast.success("Updated Restaurant!")
      },
      onError: () => {
        toast.error("Failed to update restaurant!")
      },
    }
  )

  return { updateRestaurant, isLoading }
}
