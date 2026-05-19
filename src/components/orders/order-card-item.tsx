/* eslint-disable react-hooks/set-state-in-effect */
import type { Order, OrderStatus, RestaurantOrderStatus } from "@/type"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { ORDER_STATUS } from "@/config/order-status-config"
import { useEffect, useState } from "react"

type Props = {
  order: Order
  isLoading: boolean
  onStatusUpdate?: (status: RestaurantOrderStatus, orderId: string) => void
  role: "Rider" | "Owner"
}

const OrderCardItem = ({ order, isLoading, onStatusUpdate, role }: Props) => {
  const [status, setStatus] = useState<RestaurantOrderStatus>(order.status)

  const filteredOrders =
    role === "Owner"
      ? ORDER_STATUS.filter((order) =>
          [
            "paid",
            "pending",
            "confirmed",
            "preparing",
            "readyForPickup",
          ].includes(order.value)
        )
      : ORDER_STATUS.filter((order) =>
          ["delivered", "pickedUp"].includes(order.value)
        )

  const getTime = (orderTime: string) => {
    const orderDateTime = new Date(orderTime)

    const hours = orderDateTime.getHours()
    const minutes = orderDateTime.getMinutes()

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${paddedMinutes}`
  }

  useEffect(() => {
    setStatus(order.status)
  }, [order.status])

  return (
    <Card key={order._id} className="cursor-pointer rounded-lg px-2 shadow">
      <CardHeader>
        <CardTitle className="mb-2">
          <div className="flex items-center gap-2 text-[10px] md:text-sm">
            Order:
            <span className="text-[9px] md:text-sm">{order._id}</span>
          </div>
        </CardTitle>
        <CardDescription className="mb-3 grid justify-between gap-4 font-semibold md:grid-cols-2">
          <div className="text-[10px] md:text-sm">
            Customer Name:
            <span className="ml-2 text-[9px] font-normal md:text-sm">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div className="text-[10px] md:text-sm">
            Email:
            <span className="ml-2 text-[9px] font-normal md:text-sm">
              {order.deliveryDetails.email}
            </span>
          </div>
          <div className="text-[10px] md:text-sm">
            Contact:
            <span className="ml-2 text-[9px] font-normal md:text-sm">
              {order.deliveryDetails.contact}
            </span>
          </div>
          <div className="text-[10px] md:text-sm">
            Delivery address:
            <span className="ml-2 text-[9px] font-normal md:text-sm">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
              ,{order.deliveryDetails.country}
            </span>
          </div>
          <div className="text-[10px] md:text-sm">
            ETA
            <span className="ml-2 text-[9px] font-normal md:text-sm">
              {getTime(order.createdAt)}
            </span>
          </div>
          <div className="text-[10px] md:text-sm">
            Total Cost
            <span className="ml-2 text-[9px] font-normal md:text-sm">
              Rs {order.totalAmount}
            </span>
          </div>
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="flex gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span key={cartItem.menuItemId} className="text-[9px] md:text-sm">
              <Badge variant={"outline"} className="mr-2 text-[9px] md:text-sm">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status" className="text-[10px] md:text-sm">
            What is the status of this order?
          </Label>
          <Select
            value={status}
            disabled={
              isLoading ||
              order.status === "delivered" ||
              order.status === "cancelled" ||
              order.status === "failed" ||
              order.status === "pickedUp"
            }
            onValueChange={(value) => {
              onStatusUpdate?.(value as RestaurantOrderStatus, order._id)
              setStatus(value as RestaurantOrderStatus)
            }}
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue
                className="text-[10px] md:text-sm"
                placeholder="Status"
              />
            </SelectTrigger>
            <SelectContent position="popper" className="w-full">
              {filteredOrders.map((status) => (
                <SelectItem
                  className="text-[10px] md:text-sm"
                  key={status.label}
                  value={status.value}
                >
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderCardItem
