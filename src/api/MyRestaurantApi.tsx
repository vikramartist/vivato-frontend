import type { Order, Restaurant } from "@/type"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

type UpdateMyRestaurantRequest = {
  restaurantData: Restaurant
  restaurantId: string
}

export type GetMyRestaurantOrdersRequest = {
  restaurant: Restaurant
  orders: Order[]
  status: string
}

export type UpdateMyRestaurantOrderStatus = {
  orderId: string
  status: string
}

export const useUpdateMyRestaurantOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0()

  const { restaurantId } = useParams()

  const queryClient = useQueryClient()

  const updateMyRestaurantOrderStatus = async ({
    orderId,
    status,
  }: UpdateMyRestaurantOrderStatus) => {
    const aceessToken = await getAccessTokenSilently()
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/${restaurantId}/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${aceessToken}`,
        },
        body: JSON.stringify({ status }),
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to Update Order status for this OrderId:${orderId}`
      )
    }

    return response.json()
  }

  const {
    mutateAsync: updateRestaurantOrderStatus,
    isLoading,
    reset,
  } = useMutation(updateMyRestaurantOrderStatus, {
    onSuccess: async () => {
      toast.success("Order updated")

      await queryClient.invalidateQueries(["fetchMyRestauantOrders"])
    },

    onError: () => {
      toast.error("Unable to update order")
      reset()
    },
  })

  return { updateRestaurantOrderStatus, isLoading }
}

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyRestaurantOrdersRequest = async (): Promise<
    GetMyRestaurantOrdersRequest[]
  > => {
    const aceessToken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${aceessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get the orders")
    }

    return response.json()
  }

  const { data: allOrders, isLoading } = useQuery(
    "fetchMyRestauantOrders",
    getMyRestaurantOrdersRequest,
    {
      refetchInterval: 5000,
    }
  )

  return { allOrders, isLoading }
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

export const useGetMyRestaurantById = (restaurantId: string) => {
  const { getAccessTokenSilently } = useAuth0()

  const getRestaurantById = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/${restaurantId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to get restaurant ${restaurantId}`)
    }

    return response.json()
  }

  const { data: getRestaurant, isLoading } = useQuery(
    "fetchRestaurantById",
    getRestaurantById,
    {
      staleTime: 0,
      enabled: !!restaurantId,
    }
  )

  return { getRestaurant, isLoading }
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

  const queryClient = useQueryClient()
  const { mutate: updateRestaurant, isLoading } = useMutation(
    updateMyRestaurant,
    {
      onSuccess: (updatedRestaurant) => {
        toast.success("Updated Restaurant!")
        queryClient.setQueryData(
          ["fetchRestaurantById", updatedRestaurant._id],
          updatedRestaurant
        )

        queryClient.invalidateQueries(["fetchMyRestaurants"])
      },
      onError: () => {
        toast.error("Failed to update restaurant!")
      },
    }
  )

  return { updateRestaurant, isLoading }
}
