import { useCreateMyRestaurant } from "@/api/MyRestaurantApi"
import { Table } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RestaurantForm from "@/forms/restaurantForm/restaurant-form"
import { cn } from "@/lib/utils"
import { useState } from "react"

const RestaurantPage = () => {
  const { isLoading, createRestaurant } = useCreateMyRestaurant()

  const [tabValue, setTabValue] = useState("my-restaurants")

  return (
    <Tabs
      className="w-full"
      onValueChange={(value) => setTabValue(value)}
      defaultValue={tabValue}
    >
      <TabsList className="mx-auto gap-2 md:w-[50%]">
        <TabsTrigger
          className={cn(
            "text-[9px] tracking-wide text-orange-500 md:text-sm",
            tabValue === "my-restaurants" ? "text-orange-500" : ""
          )}
          value="my-restaurants"
        >
          My Restaurants
        </TabsTrigger>
        <TabsTrigger
          className="text-[9px] tracking-wide md:text-sm"
          value="create-restaurant"
        >
          Create Restaurants
        </TabsTrigger>
        <TabsTrigger
          className="text-[9px] tracking-wide md:text-sm"
          value="my-orders"
        >
          My Orders
        </TabsTrigger>
      </TabsList>
      {tabValue === "create-restaurant" && (
        <RestaurantForm onSave={createRestaurant} isLoading={isLoading} />
      )}
      {tabValue === "my-restaurants" && <Table></Table>}
    </Tabs>
  )
}

export default RestaurantPage
