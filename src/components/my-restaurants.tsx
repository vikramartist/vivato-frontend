import { useGetMyRestaurants } from "@/api/MyRestaurantApi"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import Map from "./maps/map"
import { hhmmToMinutes } from "@/lib/utils"
import { Button } from "./ui/button"
import { useState } from "react"
import type { LatLngExpression } from "leaflet"
import type { Restaurant } from "@/type"

type Restaurants = {
  onSelect?: (restaurant: Restaurant) => void
}

const MyRestaurants = ({ onSelect }: Restaurants) => {
  const { getRestaurants, isLoading } = useGetMyRestaurants()
  const [selectedLocation, setSelectedLocation] =
    useState<LatLngExpression | null>(null)

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">
          Fetching the reestaurants...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex w-full">
        <h1 className="text-[12px] md:text-sm">My Restaurants</h1>
      </div>
      {(getRestaurants?.length as number) > 0 ? (
        <span className="text-[10px] md:text-sm">
          Restaurants found : {getRestaurants?.length}
        </span>
      ) : (
        <span className="text-[10px] md:text-sm">
          No Restaurants found. Create a new restaurant
        </span>
      )}
      <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2">
        <div className="h-80 md:sticky md:top-4 md:h-125">
          <Map
            className="h-full w-full rounded-md"
            restaurants={getRestaurants!}
            location={selectedLocation}
            onSelect={onSelect}
          />
        </div>
        <div className="max-h-125 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell className="w-4">Description</TableCell>
                <TableCell>Timings</TableCell>
                <TableCell>Cuisines</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getRestaurants?.map((restaurant) => (
                <TableRow
                  key={restaurant._id}
                  onClick={() => {
                    const coords = restaurant.location?.coordinates

                    if (!coords) return null

                    const [lng, lat] = coords
                    setSelectedLocation([lat, lng])
                  }}
                >
                  <TableCell className="cursor-pointer text-orange-500 underline dark:text-blue-400">
                    {restaurant.restaurantName}
                  </TableCell>
                  <TableCell className="cols-span-1">
                    {restaurant.description.substring(0, 40)}...
                  </TableCell>
                  <TableCell>
                    {hhmmToMinutes(restaurant.openingTime)} -{" "}
                    {hhmmToMinutes(restaurant.closingTime)}
                  </TableCell>
                  <TableHead>{restaurant.cuisines.join(", ")}</TableHead>
                  <TableHead>
                    {restaurant.restaurantType.toUpperCase()}
                  </TableHead>
                  <TableHead>
                    <Button
                      className="bg-orange-500 text-[9px] text-white hover:bg-orange-600 hover:text-white md:text-[13px] dark:bg-mauve-500 dark:hover:bg-mauve-600"
                      variant={"outline"}
                    >
                      View
                    </Button>
                  </TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default MyRestaurants
