import type { SearchState } from "@/pages/search-page"
import type { Restaurant, RestaurantSearchResponse } from "@/type"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export const useGetAllRestaurants = () => {
  const getAllRestaurantsRequest = async (): Promise<Restaurant[]> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      throw new Error("Failed to get restaurants")
    }

    return response.json()
  }

  const { data: restaurants, isLoading } = useQuery(
    "fetchAllRestaurants",
    getAllRestaurantsRequest
  )

  return { restaurants, isLoading }
}

export const useGetNearbyRestaurants = ({
  lat,
  lng,
  distance = 10000,
}: {
  lat: number
  lng: number
  distance?: number
}) => {
  const getNearbyRestaurantsRequest = async (): Promise<Restaurant[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/nearby?lat=${lat}&lng=${lng}&distance=${distance}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error("Failed to get restaurants")
    }

    return response.json()
  }
  const { data: nearbyRestaurants, isLoading } = useQuery(
    ["searchNearbyRestaurants", lat, lng, distance],
    getNearbyRestaurantsRequest,
    {
      enabled: lat != null && lng != null,
    }
  )

  return { nearbyRestaurants, isLoading }
}

export const useGetRestaurantById = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    )

    if (!response.ok) {
      throw new Error("Failed to get restaurant")
    }

    return response.json()
  }

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  )

  return { restaurant, isLoading }
}

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams()
    params.set("searchQuery", searchState.searchQuery)
    params.set("page", searchState.page.toString())
    params.set("foodType", searchState.foodType!)
    params.set("selectedCuisines", searchState.selectedCuisines.join(","))
    params.set("sortOption", searchState.sortOption)

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error("Failed to search restaurant!")
    }

    return response.json()
  }

  const { data, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    {
      enabled: !!city,
    }
  )

  return { data, isLoading }
}
