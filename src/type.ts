/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  _id: string
  email: string
  name: string
  addressLine1: string
  city: string
  profile_pic: string
  country: string
  role: "Rider" | "Customer" | "Owner" | "Admin"
  contact: string
  location?: {
    type: "Point"
    coordinates: [number, number]
  }
}

export type RoleRequestType = {
  id: string
  status: string
  requestedRole: "Owner" | "Rider"
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
  isOpen?: boolean
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
  | "readyForPickup"
  | "pickedUp"
  | "delivered"
  | "cancelled"

export type Weekdays =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"

export type VehicleType = "Bike" | "Scooter" | "EV-Bike" | "EV-Scooter"

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
    contact: string
  }
  totalAmount: number
  razorpayOrderId?: string
  razorPaymentId?: string
  status: OrderStatus
  createdAt: string
  restaurantId: string
}

export type Rider = {
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
