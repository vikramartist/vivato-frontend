import { useLocation } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import type { Order, OrderStatus } from "@/type"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"
import OrderActiveCardItem from "./order-card-item"
import { useUpdateMyRestaurantOrderStatus } from "@/api/MyRestaurantApi"

const ManageOrderForm = () => {
  const location = useLocation()
  const isMobile = useIsMobile()

  const { isLoading, updateRestaurantOrderStatus } =
    useUpdateMyRestaurantOrderStatus()

  const initialOrders: Order[] = location.state?.orders || []

  const [orders, setOrders] = useState(initialOrders)

  const activeOrders = orders.filter((order) => order.status === "paid")

  const deliveredOrders = orders.filter((order) => order.status === "delivered")

  const [selectedTab, setSelectedTab] = useState("active-orders")

  const handleStatusChange = async (
    newStatus: OrderStatus,
    orderId: string
  ) => {
    try {
      await updateRestaurantOrderStatus({
        orderId: orderId,
        status: newStatus,
      })
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Tabs className="w-full" value={selectedTab} onValueChange={setSelectedTab}>
      {!isMobile && (
        <TabsList className="mx-auto gap-2 md:w-[50%]">
          <TabsTrigger
            value="active-orders"
            className="text-[9px] tracking-wide md:text-sm"
          >
            Active Orders
          </TabsTrigger>
          <TabsTrigger
            value="delivered-orders"
            className="text-[9px] tracking-wide md:text-sm"
          >
            Delivered Orders
          </TabsTrigger>
          <TabsTrigger
            value="cancelled-orders"
            className="text-[9px] tracking-wide md:text-sm"
          >
            Cancelled Orders
          </TabsTrigger>
          <TabsTrigger
            value="failed-orders"
            className="text-[9px] tracking-wide md:text-sm"
          >
            Failed Orders
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
              <SelectItem value="active-orders">Active Orders</SelectItem>
              <SelectItem value="outForDelivery">
                Out for Delivery Orders
              </SelectItem>
              <SelectItem value="delivered-orders">Delivered Orders</SelectItem>
              <SelectItem value="cancelled-orders">Cancelled Orders</SelectItem>
              <SelectItem value="failed-orders">Failed Orders</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      <TabsContent
        value="active-orders"
        className="grid w-full grid-cols-1 px-2 md:grid-cols-3"
      >
        {activeOrders.map((activeOrder) => (
          <OrderActiveCardItem
            activeOrder={activeOrder}
            key={activeOrder._id}
            isLoading={isLoading}
            onStatusUpdate={handleStatusChange}
          />
        ))}
      </TabsContent>
      <TabsContent
        value="delivered-orders"
        className="grid w-full grid-cols-1 px-2 md:grid-cols-3"
      >
        {deliveredOrders.map((delivered) => (
          <OrderActiveCardItem
            activeOrder={delivered}
            key={delivered._id}
            isLoading={isLoading}
          />
        ))}
      </TabsContent>
    </Tabs>
  )
}

export default ManageOrderForm
