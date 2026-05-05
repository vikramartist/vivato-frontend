import type { Restaurant } from "@/type"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { getLatLng, hhmmToMinutes } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ClockFading, LucideIndianRupee, Timer } from "lucide-react"

type Props = {
  restaurant: Restaurant
}

const RestaurantInfo = ({ restaurant }: Props) => {
  const { "0": lng, "1": lat } = getLatLng(
    restaurant.location?.coordinates as [number, number]
  )

  return (
    <Card className="border-sla gap-2">
      <CardHeader>
        <CardTitle className="text-[9px] font-bold tracking-tight md:text-sm">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription className="flex flex-col gap-2">
          <span className="text-[9px] tracking-tight md:text-[13px]">
            {restaurant.description}
          </span>
          <p className="text-[9px] tracking-tight md:text-[13px]">
            Location - {restaurant.address}, {restaurant.city},{" "}
            {restaurant.zipCode}
          </p>
          <div className="flex flex-row items-center justify-between">
            <span className="text-[9px] tracking-tight md:text-[13px]">
              Coordinates: [{lat}, {lng}]
            </span>
            <Link
              to={`/restaurants/maps/${restaurant._id}`}
              className="text-[9px] tracking-tight text-blue-500 hover:underline md:text-[13px]"
            >
              View on Map
            </Link>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-wrap gap-2 md:flex-row">
        <div className="flex flex-wrap gap-2">
          {restaurant.cuisines.map((cuisine) => (
            <span key={cuisine} className="flex rounded-lg shadow">
              <Button
                variant={"outline"}
                className="bg-orange-200 text-[8px] opacity-80 hover:bg-orange-200 md:text-[13px]"
              >
                {cuisine}
              </Button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ClockFading className="text-[8px] text-orange-500 md:text-[13px] dark:text-green-500" />
          <span className="text-[8px] font-light md:text-sm">
            {hhmmToMinutes(restaurant.openingTime)} -{" "}
            {hhmmToMinutes(restaurant.closingTime)}
          </span>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <span className="flex items-center gap-1 text-[8px] font-light md:text-sm">
            Delivery Price:{" "}
            <LucideIndianRupee className="h-3.5 w-3.5 text-orange-500 md:h-4 md:w-4 dark:text-green-500" />
            {restaurant.deliveryPrice}
          </span>
          <div className="flex items-center gap-1 text-[8px] md:text-sm dark:text-white">
            <Timer className="text-[8px] text-orange-500 md:text-sm dark:text-green-500" />
            {restaurant.estimatedDeliveryTime} mins
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RestaurantInfo
