import { useGetMyOrders } from "@/api/OrderApi"
import OrderStatusDetails from "@/components/orders/order-status-details"
import OrderStatusHeader from "@/components/orders/order-status-header"
import { AspectRatio } from "@/components/ui/aspect-ratio"

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

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <div
          key={order._id}
          className="space-y-2 rounded-lg bg-gray-50 p-10 shadow-md"
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
  )
}

export default OrderStatusPage
