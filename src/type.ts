/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  _id: string
  email: string
  name: string
  addressLine1: string
  city: string
  profile_pic: string
  country: string
  role: string
  contact: string
  location?: {
    type?: "Point"
    coordinates?: [number, number]
  }
}

export type RoleRequestType = {
  id: string
  status: string
  requestedRole: string
  currentRole: string
  fullAddress: string
  documents: boolean
  feedback: string
  createdAt: Date
}

declare global {
  interface Window {
    cloudinary: any
  }
}

export type MenuItem = {
  _id?: string
  name: string
  price: number
  calories?: number
  foodType?: string
  menuImageUrl: string[]
}

export type Restaurant = {
  _id?: string
  user?: string
  restaurantName: string
  restaurantType: "veg" | "non-veg" | "mixed"
  description: string
  contact: string
  address: string
  city: string
  country: string
  zipCode: string
  deliveryPrice: number
  estimatedDeliveryTime: number
  imageUrl: string
  cuisines: string[]
  menuItems: MenuItem[]
  openingTime: number
  closingTime: number
  location?: {
    type?: "Point"
    coordinates?: [number, number]
  }
  rating?: number
  distance?: number
  isOpen: boolean
}

export type RestaurantSearchResponse = {
  data: Restaurant[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

export type OrderStatus =
  | "paid"
  | "failed"
  | "pending"
  | "confirmed"
  | "preparing"
  | "outForDelivery"
  | "delivered"
  | "cancelled"

export type Order = {
  _id: string
  restaurant: Restaurant
  user: User
  restaurantName: string
  cartItems: {
    menuItemId: string
    quantity: string
    name: string
  }[]
  deliveryDetails: {
    email: string
    name: string
    addressLine1: string
    city: string
    country: string
  }
  totalAmount: number
  razorpayOrderId?: string
  razorPaymentId?: string
  status: OrderStatus
  createdAt: string
  restaurantId: string
}
