import { useGetMyOrders } from "@/api/OrderApi"
import OrderStatusDetails from "@/components/orders/order-status-details"
import OrderStatusHeader from "@/components/orders/order-status-header"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const OrderStatusPage = () => {
  const { isLoading, orders } = useGetMyOrders()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Getting the orders...</span>
      </div>
    )
  }

  if (!orders || orders.length == 0) {
    return <span>You have no Orders</span>
  }

  const statusOrder: Record<string, number> = {
    paid: 1,
    confirmed: 2,
    preparing: 3,
    outForDelivery: 4,
    cancelled: 5,
    failed: 6,
  }

  const activeOrders = orders
    .filter((o) =>
      ["paid", "preparing", "confirmed", "outForDelivery"].includes(o.status)
    )
    .sort((a, b) => {
      const sortDiff = statusOrder[a.status] - statusOrder[b.status]

      if (sortDiff !== 0) return sortDiff

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const delivered = orders.filter((o) => o.status === "delivered").sort()

  const issues = orders
    .filter((o) => ["cancelled", "failed"].includes(o.status))
    .sort((a, b) => {
      const sortDiff = statusOrder[a.status] - statusOrder[b.status]

      if (sortDiff !== 0) return sortDiff

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  return (
    <Tabs className="w-full" defaultValue="active">
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
          Delivered ({delivered.length})
        </TabsTrigger>
        <TabsTrigger
          className="text-[9px] tracking-wide md:text-sm"
          value="issues"
        >
          Issues ({issues.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="pg-10 px-2">
        <div className="space-y-5">
          {activeOrders.map((order) => (
            <div
              key={order._id}
              className="space-y-2 rounded-lg bg-gray-50 p-10 shadow-md dark:bg-gray-700"
            >
              <OrderStatusHeader order={order} />
              <div className="grid gap-9 md:grid-cols-2">
                <OrderStatusDetails order={order} />
                <AspectRatio ratio={16 / 5}>
                  <img
                    src={order.restaurant.imageUrl}
                    alt={order.restaurantName}
                    className="objet-cover h-full w-full rounded-md"
                  />
                </AspectRatio>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="delivered" className="pg-10 px-2">
        <div className="space-y-5">
          {delivered.map((order) => (
            <div
              key={order._id}
              className="space-y-2 rounded-lg bg-gray-50 p-10 shadow-md dark:bg-gray-700"
            >
              <OrderStatusHeader order={order} />
              <div className="grid gap-9 md:grid-cols-2">
                <OrderStatusDetails order={order} />
                <AspectRatio ratio={16 / 5}>
                  <img
                    src={order.restaurant.imageUrl}
                    alt={order.restaurantName}
                    className="objet-cover h-full w-full rounded-md"
                  />
                </AspectRatio>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="issues" className="pg-10 px-2">
        <div className="space-y-5">
          {issues.map((order) => (
            <div
              key={order._id}
              className="space-y-2 rounded-lg bg-gray-50 p-10 shadow-md dark:bg-gray-700"
            >
              <OrderStatusHeader order={order} />
              <div className="grid gap-9 md:grid-cols-2">
                <OrderStatusDetails order={order} />
                <AspectRatio ratio={16 / 5}>
                  <img
                    src={order.restaurant.imageUrl}
                    alt={order.restaurantName}
                    className="objet-cover h-full w-full rounded-md"
                  />
                </AspectRatio>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default OrderStatusPage
