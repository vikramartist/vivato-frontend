/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Restaurant } from "@/type"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export const useAiFoodSearch = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getAiFoodSearchStatus = async (
    query: string
  ): Promise<Restaurant[]> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/v1/ai/food-search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(
        `Failed to get the restaurant/food details ${response.body}`
      )
    }
    return response.json()
  }

  const {
    mutateAsync: aiSearch,
    isLoading,
    reset,
  } = useMutation(getAiFoodSearchStatus, {
    onSuccess: () => {
      toast.success("AI fetched the food", { duration: 1000 })
    },
    onError: (error: any) => {
      toast.error(error.message, { duration: 1000 })
      reset()
    },
  })

  return { aiSearch, isLoading }
}
