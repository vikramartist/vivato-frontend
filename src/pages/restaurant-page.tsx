import {
  useCreateMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi"
import MyRestaurants from "@/components/my-restaurants"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RestaurantForm from "@/forms/restaurantForm/restaurant-form"
import { cn } from "@/lib/utils"
import type { Restaurant } from "@/type"
import { useState } from "react"

const RestaurantPage = () => {
  const { isLoading: isCreateLoading, createRestaurant } =
    useCreateMyRestaurant()

  const { isLoading: isUpdateLoading, updateRestaurant } =
    useUpdateMyRestaurant()

  const [tabValue, setTabValue] = useState("my-restaurants")

  const [getSelectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null)

  const onSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant)
    setTabValue("create-restaurant")
  }

  const handleUpdate = (data: Restaurant) => {
    if (!getSelectedRestaurant) return

    updateRestaurant({
      restaurantData: data,
      restaurantId: getSelectedRestaurant._id,
    })
  }

  if (isCreateLoading || isUpdateLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Loading...</span>
      </div>
    )
  }

  return (
    <Tabs
      className="w-full"
      onValueChange={(value) => setTabValue(value)}
      value={tabValue}
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
          onClick={() => setSelectedRestaurant(null)}
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
        <RestaurantForm
          onSave={getSelectedRestaurant ? handleUpdate : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
          restaurant={getSelectedRestaurant ?? undefined}
        />
      )}
      {tabValue === "my-restaurants" && <MyRestaurants onSelect={onSelect} />}
    </Tabs>
  )
}

export default RestaurantPage
