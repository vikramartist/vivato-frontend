/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string
    name: string
    quantity: string
    couponAmount: number
  }[]
  deliveryDetails: {
    email?: string
    name: string
    addressLine1: string
    city: string
    country: string
  }
  restaurantId: string
}

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0()
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(
      `${API_BASE_URL}/api/v1/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    )

    if (!response.ok) {
      throw new Error("Unable to create session")
    }

    return response.json()
  }

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest)

  if (error) {
    toast.error(error.toString())
    reset()
  }

  return { createCheckoutSession, isLoading }
}

export const useVerifyPayment = () => {
  const { getAccessTokenSilently } = useAuth0()

  const verifyPaymentRequest = async (payload: any) => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(
      `${API_BASE_URL}/api/v1/order/checkout/verify-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    )

    if (!response.ok) {
      throw new Error("Payment verification failed!")
    }

    return response.json()
  }

  const { mutateAsync: verifyPayment, isLoading } =
    useMutation(verifyPaymentRequest)

  return { verifyPayment, isLoading }
}

export const useUpdateOrderFailure = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateOrderFailureRequest = async (orderDbId: string) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(
      `${API_BASE_URL}/api/v1/order/checkout/mark-failed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ orderDbId }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to Update the Order to Failure")
    }

    return response.json()
  }

  const { mutateAsync: updateOrderFailure, isLoading } = useMutation(
    updateOrderFailureRequest
  )

  return { updateOrderFailure, isLoading }
}
