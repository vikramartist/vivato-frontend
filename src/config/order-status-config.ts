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
    progressValue: 15,
    value: "paid",
    textColor: "green",
  },
  {
    label: "In Progress",
    progressValue: 35,
    value: "confirmed",
    textColor: "green",
  },
  {
    label: "Preparing The Order",
    progressValue: 51,
    value: "preparing",
    textColor: "green",
  },
  {
    label: "Cancelled The Order",
    progressValue: 1,
    value: "cancelled",
    reason: "The order has been cancelled, order again",
    textColor: "red",
  },
  {
    label: "Ready for pickup",
    progressValue: 65,
    value: "readyForPickup",
    textColor: "green",
  },
  {
    label: "Picked Up",
    progressValue: 82,
    value: "pickedUp",
    textColor: "green",
  },
  {
    label: "Delivered Successfully",
    progressValue: 100,
    value: "delivered",
    textColor: "green",
  },
]
