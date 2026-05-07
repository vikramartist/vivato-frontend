import type { Order } from "@/type"
import { Progress } from "../ui/progress"
import { ORDER_STATUS } from "@/config/order-status-config"
import { cn } from "@/lib/utils"
import { ShoppingBag } from "lucide-react"

type Props = {
  order: Order
}

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt)
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    )

    const hours = created.getHours()
    const minutes = created.getMinutes()

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${paddedMinutes}`
  }

  const getOrderStatusInfo = () => {
    return ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
  }

  return (
    <>
      <h1 className="flex flex-col gap-3 text-[11px] font-bold tracking-tight md:flex-row md:justify-between md:text-sm">
        <span className="flex items-center gap-2">
          Order Status:{" "}
          <ShoppingBag className="h-3.5 w-3.5 font-light md:h-4 md:w-4" />
          {getOrderStatusInfo().label}
        </span>
        <span className="text-[9px] md:text-sm">
          {" "}
          Expected by: {getExpectedDelivery()}
        </span>
      </h1>
      {order.status !== "delivered" && (
        <Progress
          className={cn(
            "animate-pulse bg-gray-300",
            `[&>div]:bg-${getOrderStatusInfo().textColor}-500`
          )}
          value={getOrderStatusInfo().progressValue}
        >
          <div></div>
        </Progress>
      )}
    </>
  )
}

export default OrderStatusHeader
