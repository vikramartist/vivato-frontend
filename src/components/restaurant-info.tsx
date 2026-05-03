import type { Restaurant } from "@/type"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

type Props = {
  restaurant: Restaurant
}

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-[9px] font-bold tracking-tight md:text-sm">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          <span className="text-[9px] tracking-tight md:text-[13px]">
            {restaurant.description}
          </span>
          <p>Location - {restaurant.city}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default RestaurantInfo
