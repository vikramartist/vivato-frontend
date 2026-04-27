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

type MenuItems = {
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
  menuItems: MenuItems[]
  openingTime: number
  closingTime: number
  location?: {
    type?: "Point"
    coordinates?: [number, number]
  }
}
