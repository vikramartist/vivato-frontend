import type { OrderStatus } from "@/type"

type OrderStatusInfo = {
  label: string
  value: OrderStatus
  progressValue: number
  reason?: string
  textColor: string
}

export const ORDER_STATUS: OrderStatusInfo[] = [
  {
    label: "Failed Payment",
    progressValue: 1,
    value: "failed",
    reason: "Payment failed, maybe retry again",
    textColor: "red",
  },
  { label: "Pending", progressValue: 1, value: "pending", textColor: "green" },
  {
    label: "Awaiting Restaurant Confirmation",
    progressValue: 25,
    value: "paid",
    textColor: "green",
  },
  {
    label: "In Progress",
    progressValue: 50,
    value: "confirmed",
    textColor: "green",
  },
  {
    label: "Preparing The Order",
    progressValue: 75,
    value: "preparing",
    textColor: "green",
  },
  {
    label: "Cancelled The Order",
    progressValue: 75,
    value: "cancelled",
    reason: "The order has been cancelled, order again",
    textColor: "red",
  },
  {
    label: "Out For Delivery",
    progressValue: 90,
    value: "outForDelivery",
    textColor: "green",
  },
  {
    label: "Delivered Successfully",
    progressValue: 100,
    value: "delivered",
    textColor: "green",
  },
]
