import type { User } from "@/type"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
  auth0Id: string
  email: string
  profile_pic: string
  role?: string
  contact: string
}

type UpdateMyUserRequest = {
  name: string
  addressLine1: string
  city: string
  country: string
  profile_pic?: string
  contact: string
}

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Error fetching user!")
    }

    return response.json()
  }

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest)

  if (error && currentUser?.email) {
    console.log("Failed to get user Profile details")
  }

  return { currentUser, isLoading }
}

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0()
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error("Failed to create User")
    }
  }

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest)

  return { createUser, isError, isSuccess, isLoading }
}

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error("Error while updating user")
    }
  }

  const {
    mutateAsync: updateUser,
    isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation(updateMyUserRequest)

  if (isSuccess) {
    toast.success("Profile Updated", { duration: 500 })
  }

  if (error) {
    toast.error(error.toString(), { duration: 1000 })
    reset()
  }

  return { updateUser, isLoading }
}
