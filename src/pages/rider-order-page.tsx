/* eslint-disable react-hooks/set-state-in-effect */
import { useUpdateMyRestaurantOrderStatus } from "@/api/MyRestaurantApi"
import {
  useAcceptRide,
  useGetRiderOrders,
  useGetRiderProfile,
  useRejectRide,
} from "@/api/MyUserApi"
import OrderCardItem from "@/components/orders/order-card-item"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"
import { socket } from "@/socket"
import type { Order, OrderStatus } from "@/type"
import { useEffect, useState } from "react"

const RiderOrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const isMobile = useIsMobile()
  const [selectedTab, setSelectedTab] = useState("active")
  const { getRider, isLoading: isGetRiderLoading } = useGetRiderProfile()
  const { getRiderOrders, isLoading: isGetRiderOrderLoading } =
    useGetRiderOrders(getRider?.riderId as string)

  const { acceptRide, isLoading: acceptRideLoading } = useAcceptRide()
  const { rejectRide, isLoading: rejectRideLoading } = useRejectRide()
  const { isLoading, updateRestaurantOrderStatus } =
    useUpdateMyRestaurantOrderStatus()

  const handleRideClick = (orderId: string, status: "Accept" | "Reject") => {
    if (status === "Accept") {
      acceptRide(orderId)
    } else if (status === "Reject") {
      rejectRide(orderId)
    }
  }

  useEffect(() => {
    const handleNewOrder = (order: Order) => {
      setOrders((prev) => {
        if (order.status !== "readyForPickup" || order.assignedRider) {
          return prev.filter((ord) => ord._id !== order._id)
        }

        const exists = prev.some((ord) => ord._id === order._id)

        if (exists) {
          return prev.map((ord) => (ord._id === order._id ? order : ord))
        }

        return [order, ...prev]
      })
    }
    socket.on("updated-order", handleNewOrder)

    return () => {
      socket.off("updated-order", handleNewOrder)
    }
  }, [])

  useEffect(() => {
    if (getRiderOrders) {
      setOrders(getRiderOrders)
    }
  }, [getRiderOrders])

  const statusOrder: Record<string, number> = {
    readyForPickup: 0,
    pickedUp: 1,
    delivered: 2,
    cancelled: 99,
    failed: 100,
  }

  if (!orders || orders.length == 0) {
    return <span>No orders found now</span>
  }

  const activeOrders = orders
    .filter((ord) => ["readyForPickup", "pickedUp"].includes(ord.status))
    .sort((a, b) => {
      const sortDiff = statusOrder[a.status] - statusOrder[b.status]

      if (sortDiff !== 0) return sortDiff

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const deliveredOrders = orders.filter((ord) => ord.status === "delivered")

  const handleStatusChange = async (
    newStatus: OrderStatus,
    orderId: string,
    restaurantId?: string
  ) => {
    try {
      await updateRestaurantOrderStatus({
        orderId: orderId,
        status: newStatus,
        restaurantId: restaurantId as string,
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (!getRider) {
    return <span>No rider data found!</span>
  }

  return (
    <Tabs className="w-full" value={selectedTab} onValueChange={setSelectedTab}>
      {!isMobile && (
        <TabsList className="mx-auto w-[50%] gap-2">
          <TabsTrigger
            className="text-[9px] tracking-wide md:text-sm"
            value="active"
          >
            Active ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger
            className="text-[9px] tracking-wide md:text-sm"
            value="delivered"
          >
            Delivered ({deliveredOrders.length})
          </TabsTrigger>
        </TabsList>
      )}
      {isMobile && (
        <Select value={selectedTab} onValueChange={setSelectedTab}>
          <div className="flex w-full place-content-end px-2">
            <SelectTrigger>
              <SelectValue className="text-[10px] md:text-sm" />
            </SelectTrigger>
          </div>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>{selectedTab}</SelectLabel>
              <SelectItem value="active">
                Active Orders ({activeOrders.length})
              </SelectItem>
              <SelectItem value="delivered">
                Delivered ({deliveredOrders.length})
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      <TabsContent value="active" className="pg-10 px-2">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {activeOrders.map((activeOrder) => (
            <OrderCardItem
              order={activeOrder}
              key={activeOrder._id}
              isLoading={
                isGetRiderOrderLoading ||
                isGetRiderLoading ||
                acceptRideLoading ||
                rejectRideLoading ||
                isLoading
              }
              onStatusUpdate={handleStatusChange}
              onRideClick={handleRideClick}
              role="Rider"
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="delivered" className="pg-10 px-2">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {deliveredOrders.map((delivered) => (
            <OrderCardItem
              order={delivered}
              key={delivered._id}
              isLoading={
                isGetRiderOrderLoading ||
                isGetRiderLoading ||
                acceptRideLoading ||
                rejectRideLoading
              }
              onRideClick={handleRideClick}
              role="Rider"
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default RiderOrderPage
