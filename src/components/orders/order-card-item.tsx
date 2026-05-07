/* eslint-disable react-hooks/set-state-in-effect */
import type { Order, OrderStatus } from "@/type"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
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
  activeOrder: Order
  isLoading: boolean
  onStatusUpdate?: (status: OrderStatus, orderId: string) => void
}

const OrderCardItem = ({ activeOrder, isLoading, onStatusUpdate }: Props) => {
  const [status, setStatus] = useState<OrderStatus>(activeOrder.status)

  const getTime = (orderTime: string) => {
    const orderDateTime = new Date(orderTime)

    const hours = orderDateTime.getHours()
    const minutes = orderDateTime.getMinutes()

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${paddedMinutes}`
  }

  useEffect(() => {
    setStatus(activeOrder.status)
  }, [activeOrder.status])

  return (
    <Card key={activeOrder._id} className="cursor-pointer rounded-lg shadow">
      <CardHeader>
        <CardTitle className="mb-3 grid justify-between gap-4 md:grid-cols-2">
          <div className="text-[10px] md:text-sm">
            Customer Name:
            <span className="ml-2 text-[9px] font-normal md:text-sm">
              {activeOrder.deliveryDetails.name}
            </span>
          </div>
          <div className="text-[10px] md:text-sm">
            Delivery address:
            <span className="ml-2 text-[9px] font-normal md:text-sm">
              {activeOrder.deliveryDetails.addressLine1},{" "}
              {activeOrder.deliveryDetails.city},
              {activeOrder.deliveryDetails.country}
            </span>
          </div>
          <div className="text-[10px] md:text-sm">
            Time
            <span className="ml-2 text-[9px] font-normal md:text-sm">
              {getTime(activeOrder.createdAt)}
            </span>
          </div>
          <div className="text-[10px] md:text-sm">
            Total Cost
            <span className="ml-2 text-[9px] font-normal md:text-sm">
              Rs {activeOrder.totalAmount}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex gap-6">
        <div className="flex flex-col gap-2">
          {activeOrder.cartItems.map((cartItem) => (
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
              activeOrder.status === "delivered" ||
              activeOrder.status === "cancelled" ||
              activeOrder.status === "failed"
            }
            onValueChange={(value) => {
              onStatusUpdate?.(value as OrderStatus, activeOrder._id)
              setStatus(value as OrderStatus)
            }}
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper" className="w-full">
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.label} value={status.value}>
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
