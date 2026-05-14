import { useGetMyRestaurants } from "@/api/MyRestaurantApi"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table"
import Maps from "./maps/map"
import { hhmmToMinutes } from "@/lib/utils"
import { Button } from "./ui/button"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import type { UserLocation } from "@/pages/map-page"

const MyRestaurants = () => {
  const { getRestaurants, isLoading } = useGetMyRestaurants()
  const [selectedLocation, setSelectedLocation] = useState<UserLocation | null>(
    null
  )

  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null)

  const navigate = useNavigate()

  const { pathname } = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">
          Fetching the restaurants...
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
        <div className="h-80 md:sticky md:top-4 md:h-110">
          <Maps
            className="h-full w-full rounded-md"
            restaurants={getRestaurants!}
            location={selectedLocation}
          />
        </div>
        <div className="max-h-125 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="text-[9px] md:text-sm">
                  Edit Details
                </TableCell>
                <TableCell className="text-[9px] md:text-sm">
                  Restaurant View
                </TableCell>
                <TableCell className="text-[9px] md:text-sm">Name</TableCell>
                <TableCell className="w-4 text-[9px] md:text-sm">
                  Description
                </TableCell>
                <TableCell className="text-[9px] md:text-sm">Timings</TableCell>
                <TableCell className="text-[9px] md:text-sm">
                  Cuisines
                </TableCell>
                <TableCell className="text-[9px] md:text-sm">Type</TableCell>
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
                    setSelectedLocation({ lat, lng })
                    setSelectedRestaurantId(restaurant._id!)
                  }}
                  className={
                    selectedRestaurantId === restaurant._id
                      ? "cursor-pointer bg-sky-100 hover:bg-sky-200 dark:bg-gray-600 dark:hover:bg-gray-700"
                      : ""
                  }
                >
                  <TableCell>
                    <Button
                      onClick={() =>
                        navigate(`${pathname}/edit/${restaurant._id}`, {
                          state: "restaurant",
                        })
                      }
                      className="bg-orange-500 text-[9px] text-white hover:bg-orange-600 hover:text-white md:text-[13px] dark:bg-mauve-500 dark:hover:bg-mauve-600"
                      variant={"outline"}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`/details/${restaurant._id}`)}
                      variant={"outline"}
                      className="bg-orange-500 text-[9px] text-white hover:bg-orange-600 hover:text-white md:text-[13px] dark:bg-mauve-500 dark:hover:bg-mauve-600"
                    >
                      Restaurant View
                    </Button>
                  </TableCell>
                  <TableCell className="cursor-pointer text-[9px] tracking-wide text-orange-500 underline md:text-sm dark:text-white">
                    {restaurant.restaurantName}
                  </TableCell>
                  <TableCell className="cols-span-1 text-[9px] md:text-sm">
                    {restaurant.description.substring(0, 40)}...
                  </TableCell>
                  <TableCell className="text-[9px] md:text-sm">
                    {hhmmToMinutes(restaurant.openingTime)} -{" "}
                    {hhmmToMinutes(restaurant.closingTime)}
                  </TableCell>
                  <TableCell className="text-[9px] md:text-sm">
                    {restaurant.cuisines.join(", ")}
                  </TableCell>
                  <TableCell className="text-[9px] md:text-sm">
                    {restaurant.restaurantType.toUpperCase()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          variant={"outline"}
          onClick={() => navigate(`${pathname}/create`)}
          className="space-y-4 bg-orange-600 text-[10px] text-white hover:bg-orange-500 hover:text-white md:text-sm dark:bg-gray-500 dark:hover:bg-gray-600"
        >
          Create new Restaurant
        </Button>
      </div>
    </div>
  )
}

export default MyRestaurants
