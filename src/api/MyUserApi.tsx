/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Rider, User, VehicleType, Weekdays } from "@/type"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
  auth0Id: string
  email: string
  profile_pic: string
  role?: "Rider" | "Owner" | "Customer" | "Admin"
  contact: string
  location?: {
    type?: "Point"
    coordinates?: [number, number]
  }
}

type UpdateMyUserRequest = {
  name: string
  addressLine1: string
  city: string
  country: string
  profile_pic: string
  contact: string
  location?: {
    type?: "Point"
    coordinates?: [number, number]
  }
}

type UpdateMyRiderRequest = {
  riderId?: string
  experience: number
  isAvailable?: boolean
  vehicleNumber: string
  drivingLicenseNumber: string
  vehicleType: VehicleType
  currentLocation?: {
    coordinates: { lng: number; lat: number }
  }
  deliveryRadiusKm: number
  workHours: { start: string; end: string }
  workingDays: Weekdays[]
}

export const useGetRiderProfile = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyRiderProfileRequest = async (): Promise<Rider> => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/user/rider-profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch Rider Profile")
    }

    return response.json()
  }

  const { data: getRider, isLoading } = useQuery(
    "fetchRiderProfile",
    getMyRiderProfileRequest,
    {
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
    }
  )

  return { getRider, isLoading }
}

export const useUpateMyRiderProfile = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateRiderProfileRequest = async (
    riderProfileData: UpdateMyRiderRequest
  ) => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/user/update-rider`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(riderProfileData),
    })

    if (!response.ok) {
      throw new Error("Rider Update request Failed")
    }
  }

  const {
    reset,
    mutateAsync: updateRiderProfile,
    isLoading,
  } = useMutation(updateRiderProfileRequest, {
    onSuccess: () => {
      toast.success("Rider Profile Updated!", { duration: 500 })
    },
    onError: (error: any) => {
      toast.error(error?.message ?? error.toString(), { duration: 1000 })
      reset()
    },
  })

  return { updateRiderProfile, isLoading }
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
    const data: User = await response.json()
    return data
  }

  const { data: currentUser, isLoading } = useQuery(
    "fetchCurrentUser",
    getMyUserRequest,
    { refetchOnWindowFocus: true }
  )

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
    reset,
  } = useMutation(updateMyUserRequest, {
    onSuccess: () => {
      toast.success("Profile Updated", { duration: 500 })
    },
    onError: (error: any) => {
      toast.error(error?.message ?? error.toString(), { duration: 1000 })
      reset()
    },
  })

  return { updateUser, isLoading }
}
