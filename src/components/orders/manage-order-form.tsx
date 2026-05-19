import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import type { OrderStatus } from "@/type"

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
import { useMemo, useState } from "react"
import OrderCardItem from "./order-card-item"
import {
  useGetMyRestaurantOrders,
  useUpdateMyRestaurantOrderStatus,
} from "@/api/MyRestaurantApi"
import { useParams } from "react-router-dom"
import { useGetMyUser } from "@/api/MyUserApi"

const ManageOrderForm = () => {
  const isMobile = useIsMobile()
  const { restaurantId } = useParams()
  const { isLoading, updateRestaurantOrderStatus } =
    useUpdateMyRestaurantOrderStatus()

  const { currentUser } = useGetMyUser()

  const { allOrders, isLoading: isGetRestaurantOrdersLoading } =
    useGetMyRestaurantOrders()

  const initialOrders = useMemo(() => {
    return allOrders?.find((orders) => orders.restaurant._id === restaurantId)
  }, [allOrders, restaurantId])

  const groupedOrders = useMemo(() => {
    const orders = initialOrders?.orders || []
    return {
      active: orders.filter((o) =>
        ["paid", "confirmed", "preparing", "readyForPickup"].includes(o.status)
      ),
      delivered: orders.filter((o) => o.status === "delivered"),
      issues: orders.filter((o) => ["cancelled", "failed"].includes(o.status)),
    }
  }, [initialOrders])

  const activeGroupedOrders = {
    newOrders: groupedOrders.active
      .filter((o) => ["paid", "confirmed"].includes(o.status))
      .sort(),
    preparing: groupedOrders.active
      .filter((o) => o.status === "preparing")
      .sort(),
    outForDelivery: groupedOrders.active
      .filter((o) => o.status === "readyForPickup")
      .sort(),
  }

  const issuesGroupedOrders = {
    cancelled: groupedOrders.issues
      .filter((o) => o.status === "cancelled")
      .sort(),
    failed: groupedOrders.issues.filter((o) => o.status === "failed").sort(),
  }

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
            className="flex items-center gap-2 text-[9px] tracking-wide md:text-sm"
          >
            Active Orders
            <div className="-top-3 right-2 text-[9px] md:text-[12px] lg:text-sm">
              ({groupedOrders.active.length})
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="delivered"
            className="text-[9px] tracking-wide md:text-sm"
          >
            Delivered
            <div className="-top-3 right-2 text-[9px] md:text-[12px] lg:text-sm">
              ({groupedOrders.delivered.length})
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="issues"
            className="text-[9px] tracking-wide md:text-sm"
          >
            Issues
            <div className="-top-3 right-2 text-[9px] md:text-[12px] lg:text-sm">
              ({groupedOrders.issues.length})
            </div>
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
              <SelectItem value="active-orders">
                Active Orders ({groupedOrders.active.length})
              </SelectItem>
              <SelectItem value="delivered">
                Delivered ({groupedOrders.delivered.length})
              </SelectItem>
              <SelectItem value="issues">
                Issues ({groupedOrders.issues.length})
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      <TabsContent value="active-orders" className="space-y-6 px-2">
        {activeGroupedOrders.newOrders.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-[10px] font-semibold md:text-sm">
                New Orders
              </h2>
              <span className="text-[10px] text-muted-foreground md:text-sm">
                ({activeGroupedOrders.newOrders.length})
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {activeGroupedOrders.newOrders.map((activeOrder) => (
                <OrderCardItem
                  order={activeOrder}
                  key={activeOrder._id}
                  isLoading={isLoading || isGetRestaurantOrdersLoading}
                  onStatusUpdate={handleStatusChange}
                  role={currentUser?.role}
                />
              ))}
            </div>
          </section>
        )}

        {activeGroupedOrders.preparing.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-[10px] font-semibold md:text-sm">
                Preparing Orders
              </h2>
              <span className="text-[10px] text-muted-foreground md:text-sm">
                ({activeGroupedOrders.preparing.length})
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {activeGroupedOrders.preparing.map((activeOrder) => (
                <OrderCardItem
                  order={activeOrder}
                  key={activeOrder._id}
                  isLoading={isLoading || isGetRestaurantOrdersLoading}
                  onStatusUpdate={handleStatusChange}
                />
              ))}
            </div>
          </section>
        )}

        {activeGroupedOrders.outForDelivery.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-[10px] font-semibold md:text-sm">
                Out For Delivery
              </h2>
              <span className="text-[10px] text-muted-foreground md:text-sm">
                ({activeGroupedOrders.outForDelivery.length})
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {activeGroupedOrders.outForDelivery.map((activeOrder) => (
                <OrderCardItem
                  order={activeOrder}
                  key={activeOrder._id}
                  isLoading={isLoading || isGetRestaurantOrdersLoading}
                  onStatusUpdate={handleStatusChange}
                />
              ))}
            </div>
          </section>
        )}
      </TabsContent>
      <TabsContent value="delivered" className="space-y-6 px-2">
        {groupedOrders.delivered.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-[10px] font-semibold md:text-sm">
                Delivered
              </h2>
              <span className="text-[10px] text-muted-foreground md:text-sm">
                ({groupedOrders.delivered.length})
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {groupedOrders.delivered.map((delivered) => (
                <OrderCardItem
                  order={delivered}
                  key={delivered._id}
                  isLoading={isLoading || isGetRestaurantOrdersLoading}
                  onStatusUpdate={handleStatusChange}
                />
              ))}
            </div>
          </section>
        )}
      </TabsContent>
      <TabsContent value="issues" className="space-y-6 px-2">
        {issuesGroupedOrders.cancelled.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-[10px] font-semibold md:text-sm">
                Cancelled
              </h2>
              <span className="text-[10px] text-muted-foreground md:text-sm">
                ({issuesGroupedOrders.cancelled.length})
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {issuesGroupedOrders.cancelled.map((cancelled) => (
                <OrderCardItem
                  order={cancelled}
                  key={cancelled._id}
                  isLoading={isLoading || isGetRestaurantOrdersLoading}
                  onStatusUpdate={handleStatusChange}
                />
              ))}
            </div>
          </section>
        )}
        {issuesGroupedOrders.failed.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-[10px] font-semibold md:text-sm">Failed</h2>
              <span className="text-[10px] text-muted-foreground md:text-sm">
                ({issuesGroupedOrders.failed.length})
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {issuesGroupedOrders.failed.map((failed) => (
                <OrderCardItem
                  order={failed}
                  key={failed._id}
                  isLoading={isLoading || isGetRestaurantOrdersLoading}
                  onStatusUpdate={handleStatusChange}
                />
              ))}
            </div>
          </section>
        )}
      </TabsContent>
    </Tabs>
  )
}

export default ManageOrderForm
