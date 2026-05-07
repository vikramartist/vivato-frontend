import type { Order } from "@/type"
import { Separator } from "../ui/separator"
import { Mail, MapPinHouse, User } from "lucide-react"

type Props = { order: Order }

const OrderStatusDetails = ({ order }: Props) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold md:text-sm">
          {" "}
          Delivering to:
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
          <MapPinHouse className="h-3.5 w-3.5 md:h-4 md:w-4" />
          {order.deliveryDetails.addressLine1},{order.deliveryDetails.city},{" "}
          {order.deliveryDetails.country}
        </span>
      </div>
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
