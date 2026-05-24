import type { Restaurant } from "@/type"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { DotSquare } from "lucide-react"
import { cn, getDistanceInKm, getLatLng, getUserLocation } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
  restaurant: Restaurant
  index: number
}

const RestaurantsHome = ({ restaurant, index }: Props) => {
  const [distance, setDistance] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getLocation = async () => {
      const { latitude, longitude } = await getUserLocation()
      const { lat, lng } = getLatLng(restaurant.location?.coordinates)

      const distance = getDistanceInKm(latitude, longitude, lat, lng)

      setDistance(distance)
    }

    getLocation()
  }, [restaurant.location?.coordinates])

  const handleClick = () => {
    navigate(`/details/${restaurant._id}`)
  }

  return (
    <Card
      key={index}
      onClick={handleClick}
      className="h-35 w-30 cursor-pointer shadow md:h-50 md:w-50"
    >
      <CardHeader className="w-full">
        <CardTitle className="w-full text-[7px] tracking-wide md:text-[12px]">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription className="w-full">
          <div className="relative flex">
            <span className="w-full p-1">
              <img src={restaurant.imageUrl} alt={restaurant.restaurantName} />
            </span>
            <div className="absolute right-2 bottom-1">
              <span>
                <DotSquare
                  className={cn(
                    restaurant.restaurantType === "veg"
                      ? "text-green-600"
                      : "text-red-600",
                    "h-4 w-4 fill-white md:h-5 md:w-5"
                  )}
                />
              </span>
            </div>
          </div>
          <div className="flex w-full flex-row justify-between gap-2">
            <span className="text-[8px] font-semibold md:text-[10px]">
              {restaurant.city}, {restaurant.country}
            </span>
            <span className="text-[8px] font-semibold md:text-[10px]">
              {restaurant.isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </CardDescription>
        <div>
          <span className="text-[8.5px] md:text-[9px]">
            {distance?.toFixed(2)} kms away
          </span>
        </div>
      </CardHeader>
    </Card>
  )
}

export default RestaurantsHome
