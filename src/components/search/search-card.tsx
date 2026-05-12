import type { Restaurant } from "@/type"
import { Link } from "react-router-dom"
import { AspectRatio } from "../ui/aspect-ratio"
import { Clock, IndianRupee } from "lucide-react"
import { cn, getDistanceInKm, hhmmToMinutes } from "@/lib/utils"
import { useGetMyUser } from "@/api/MyUserApi"

type Props = {
  restaurant: Restaurant
}

const SearchCard = ({ restaurant }: Props) => {
  const { currentUser } = useGetMyUser()

  const calculateDistance = () => {
    return getDistanceInKm(
      currentUser?.location?.coordinates[1] as number,
      currentUser?.location?.coordinates[0] as number,
      restaurant.location?.coordinates?.[1] as number,
      restaurant.location?.coordinates?.[0] as number
    )
  }

  return (
    <Link
      to={`/details/${restaurant._id}`}
      className="group block h-full rounded-xl border p-3 shadow-md transition hover:shadow-md dark:bg-gray-800"
    >
      <AspectRatio ratio={4 / 3}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <h3 className="mb-2 text-2xl text-[10px] font-bold tracking-tight group-hover:underline md:text-[13px]">
            {restaurant.restaurantName}
          </h3>
          <span className="text-[9px] font-medium md:text-[13px]">
            {hhmmToMinutes(restaurant.openingTime)} -{" "}
            {hhmmToMinutes(restaurant.closingTime)}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {restaurant.cuisines.slice(0, 5).map((cuisine, index) => (
            <span
              key={index}
              className="rounded bg-gray-100 px-2 py-1 text-[10px] font-medium dark:bg-gray-700"
            >
              {cuisine}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-green-600">
            <Clock className="text-green-600" size={14} />
            {restaurant.estimatedDeliveryTime > 1
              ? `${restaurant.estimatedDeliveryTime} mins`
              : `${restaurant.estimatedDeliveryTime} min`}
          </div>
          <div className="flex items-center gap-1 text-[9px] md:text-[13px]">
            Delivery from <IndianRupee size={14} />
            {restaurant.deliveryPrice}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2 space-y-2 md:items-end">
        <span
          className={cn("flex items-center gap-3 text-[9px] md:text-[13px]")}
        >
          {calculateDistance().toFixed(2)} kms away
        </span>
        <span
          className={cn(
            "rounded-lg border px-1 text-[9px] text-white md:text-[13px]",
            restaurant.isOpen ? "bg-green-800" : "bg-red-400"
          )}
        >
          {restaurant.isOpen ? "Open" : "Closed"}
        </span>
      </div>
    </Link>
  )
}

export default SearchCard
