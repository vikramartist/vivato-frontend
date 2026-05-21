import type { Order } from "@/type"
import { Separator } from "../ui/separator"
import {
  Bike,
  HotelIcon,
  Mail,
  MapPinHouse,
  MapPlusIcon,
  PhoneCall,
  User,
} from "lucide-react"
import { useGetMyRiderById } from "@/api/MyUserApi"
import { formatDate } from "@/lib/utils"

type Props = { order: Order }

const OrderStatusDetails = ({ order }: Props) => {
  const { isLoading, rider } = useGetMyRiderById(order.assignedRider)

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Orders...</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold md:text-sm">
          {" "}
          {order.status === "delivered"
            ? `Delivered on ${formatDate(new Date(order.deliveredAt as Date))}`
            : "Delivering to:"}
        </span>
        <span className="flex items-center gap-1 text-[10px] md:text-sm">
          <User className="h-3.5 w-3.5 md:h-4 md:w-4" />
          {order.deliveryDetails.name}
        </span>
        <span className="flex items-center gap-1 text-[10px] md:text-sm">
          <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
          {order.deliveryDetails.email}
        </span>
        <span className="flex items-center gap-1 text-[10px] md:text-sm">
          <PhoneCall className="h-3.5 w-3.5 md:h-4 md:w-4" />
          {order.deliveryDetails.contact}
        </span>
        <span className="flex items-center gap-1 text-[10px] md:text-sm">
          <MapPinHouse className="h-3.5 w-3.5 md:h-4 md:w-4" />
          {order.deliveryDetails.addressLine1},{order.deliveryDetails.city},{" "}
          {order.deliveryDetails.country}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold md:text-[14px]">
          Restaurant Details:
        </span>
        <span className="flex items-center gap-1 text-[10px] md:text-sm">
          <HotelIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          Name: {order.restaurantName}
        </span>
        <span className="flex items-center gap-1 text-[10px] md:text-sm">
          <PhoneCall className="h-3.5 w-3.5 md:h-4 md:w-4" />
          Contact: {order.restaurant.contact}
        </span>
        <span className="flex items-center gap-1 text-[10px] md:text-sm">
          <MapPlusIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          Address:{" "}
          {order.restaurant.address +
            ", " +
            order.restaurant.city +
            ", " +
            order.restaurant.country}
        </span>
      </div>
      {order.assignedRider && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold md:text-[14px]">
            Assigned Rider:
          </span>
          <span className="flex items-center gap-1 text-[10px] md:text-sm">
            <HotelIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Name: {rider?.name}
          </span>
          <span className="flex items-center gap-1 text-[10px] md:text-sm">
            <PhoneCall className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Contact: {rider?.contact}
          </span>
          <span className="flex items-center gap-1 text-[10px] md:text-sm">
            <Bike className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Vehicle: {rider?.riderInfo?.vehicleType}
          </span>
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold md:text-sm">
          Your Order(s)
        </span>
        <span className="text-[9px] md:text-sm">Id: {order._id}</span>
        <ul>
          {order.cartItems.map((item, index) => (
            <li key={item.menuItemId} className="text-[9px] md:text-sm">
              {index + 1}: {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold md:text-sm">Total</span>
        <span className="text-[9px] md:text-sm">Rs {order.totalAmount}</span>
      </div>
    </div>
  )
}

export default OrderStatusDetails
