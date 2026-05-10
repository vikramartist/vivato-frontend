/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateCheckoutSession,
  useUpdateOrderFailure,
  useVerifyPayment,
} from "@/api/OrderApi"
import { useGetRestaurantById } from "@/api/RestaurantApi"
import CheckoutButton from "@/components/checkout-button"
import MenuItemCard from "@/components/menu-item-card"
import OrderSummary from "@/components/order-summary"
import RestaurantInfo from "@/components/restaurant-info"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardFooter } from "@/components/ui/card"
import type { UserFormData } from "@/forms/UserProfileForm/user-profile-form"
import type { MenuItem } from "@/type"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

export type CartItem = {
  _id: string
  name: string
  price: number
  quantity: number
  coupon?: string
}

const DetailPage = () => {
  const { restaurantId } = useParams()
  const navigate = useNavigate()

  const { isLoading, restaurant } = useGetRestaurantById(restaurantId)
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession()

  const { isLoading: isVerifyingLoading, verifyPayment } = useVerifyPayment()
  const { updateOrderFailure } = useUpdateOrderFailure()

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedItems = sessionStorage.getItem(`cartItems-${restaurantId}`)

    return storedItems ? JSON.parse(storedItems) : []
  })

  const handleCartRemoval = (cartItem: CartItem) => {
    setCartItems((prevCartItem) => {
      const updatedCartItems = prevCartItem.filter(
        (item) => item._id !== cartItem._id
      )

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      )

      return updatedCartItems as CartItem[]
    })
  }

  const handleCartAddition = (menuItem: MenuItem, quantity: number) => {
    setCartItems((cartItem) => {
      const existingCartItem = cartItem.find(
        (item) => item._id === menuItem._id
      )

      let updatedCartItems

      if (existingCartItem) {
        if (quantity === 0) {
          updatedCartItems = cartItem.filter(
            (item) => item._id !== menuItem._id
          )
        } else {
          updatedCartItems = cartItem.map((item) =>
            item._id === menuItem._id ? { ...item, quantity } : item
          )
        }
      } else {
        updatedCartItems = [
          ...cartItem,
          {
            _id: menuItem._id,
            name: menuItem.name,
            quantity: 1,
            price: menuItem.price,
            coupon: "Vivato20",
          },
        ]
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      )
      return updatedCartItems as CartItem[]
    })
  }

  if (isLoading || !restaurant) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Loading...</span>
      </div>
    )
  }

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) return

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
        couponAmount: 0.2,
      })),
      restaurantId: restaurant._id as string,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
        contact: userFormData.contact,
      },
    }

    const data = await createCheckoutSession(checkoutData)

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      order_id: data.orderId,

      name: "Vivato",
      description: restaurant.restaurantName,

      handler: async (response: any) => {
        try {
          const result = await verifyPayment({
            ...response,
            orderDbId: data.orderDbId,
          })

          if (result.success) {
            toast.success("Payment successful 🎉")
            navigate(`/order-status`)
            setCartItems([])
            sessionStorage.removeItem(`cartItems-${restaurantId}`)
          } else {
            toast.error("Verifiation failed!")
            setCartItems([])
            sessionStorage.removeItem(`cartItems-${restaurantId}`)
          }
        } catch (error) {
          console.log(error)
        }
      },

      prefill: {
        name: userFormData.name,
        email: userFormData.email,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        contact: userFormData.contact,
      },

      theme: {
        color: "#f97316",
      },

      modal: {
        ondismiss: async () => {
          console.log("Payment closed")
          setCartItems([])
          sessionStorage.removeItem(`cartItems-${restaurantId}`)
          await updateOrderFailure(data.orderDbId)
        },
      },
    }
    const rzp = new (window as any).Razorpay(options)

    rzp.on("payment.failed", async (response: any) => {
      console.log("Payment failed", response)
      await updateOrderFailure(data.orderDbId)
      setCartItems([])
      sessionStorage.removeItem(`cartItems-${restaurantId}`)
      alert("Payment failed ❌ Try again")
    })

    rzp.open()
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5} className="h-27 px-3 md:h-full">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="h-full w-full rounded-md object-cover shadow-md"
        />
      </AspectRatio>
      <div className="grid gap-5 px-2 md:grid-cols-[4fr_2fr] md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-[9px] tracking-tight md:text-sm">Menu</span>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {restaurant.menuItems.map((menu) => (
              <MenuItemCard
                key={menu._id}
                menuItem={menu}
                onAddCart={handleCartAddition}
                quantity={
                  cartItems.find((item) => item._id === menu._id)?.quantity || 0
                }
              />
            ))}
          </div>
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={handleCartRemoval}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading ?? isVerifyingLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
