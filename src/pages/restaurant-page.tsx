import { useGetMyRestaurantOrders } from "@/api/MyRestaurantApi"
import MyRestaurants from "@/components/my-restaurants"
import AllOrders from "@/components/orders/all-orders"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const RestaurantPage = () => {
  const { allOrders, isLoading } = useGetMyRestaurantOrders()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Getting the orders...</span>
      </div>
    )
  }

  return (
    <Tabs className="w-full" defaultValue="my-orders">
      <TabsList className="mx-auto w-[90%] gap-2 md:w-[50%]">
        <TabsTrigger
          className={cn("text-[9px] tracking-wide md:text-sm")}
          value="my-restaurants"
        >
          My Restaurants
        </TabsTrigger>
        <TabsTrigger
          className="text-[9px] tracking-wide md:text-sm"
          value="my-orders"
        >
          My Orders
        </TabsTrigger>
      </TabsList>
      <TabsContent value="my-restaurants">
        <MyRestaurants />
      </TabsContent>
      <TabsContent
        value="my-orders"
        className="pg-10 space-y-2 rounded-lg px-2"
      >
        <h2 className="text-sm font-bold md:text-2xl">All Orders</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allOrders?.map((orders, index) => (
            <AllOrders orders={orders} key={index} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default RestaurantPage
