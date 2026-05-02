import type { Restaurant } from "@/type"
import { Link } from "react-router-dom"
import { AspectRatio } from "../ui/aspect-ratio"
import { Clock, IndianRupee } from "lucide-react"
import { hhmmToMinutes } from "@/lib/utils"

type Props = {
  restaurant: Restaurant
}

const SearchCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/details/${restaurant._id}`}
      className="group block h-full rounded-xl border p-3 shadow-sm transition hover:shadow-md"
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
              className="rounded bg-gray-100 px-2 py-1 text-[10px] font-medium"
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

      <div className="flex">
        <div id="card-content" className="grid gap-2 md:grid-cols-2">
          <div className="flex flex-col gap-2"></div>
        </div>
      </div>
    </Link>
  )
}

export default SearchCard
