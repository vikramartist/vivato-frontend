import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Dot,
  IndianRupee,
  Map,
  PhoneCall,
  ShoppingBag,
  Timer,
  Utensils,
} from "lucide-react"
import type { GetMyRestaurantOrdersRequest } from "@/api/MyRestaurantApi"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

type Props = {
  orders: GetMyRestaurantOrdersRequest
}

const AllOrders = ({ orders }: Props) => {
  const navigate = useNavigate()
  return (
    <Card className="cursor-pointer shadow">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="flex w-full items-start justify-between">
          <ShoppingBag className="h-3.5 w-3.5 text-orange-500 md:h-5 md:w-5 dark:text-white" />
          <div className="flex flex-col items-start">
            <Dot className="h-10 w-10 animate-pulse text-orange-500 dark:text-red-500" />
            <span className="text-[9px] md:text-sm">
              {orders.orders.length > 1
                ? `${orders.orders.length} orders`
                : `${orders.orders.length} order`}
            </span>
          </div>
        </CardTitle>
        <CardDescription className="flex w-full flex-wrap justify-between gap-2">
          <span className="flex items-center gap-2 text-[11px] md:text-xl">
            <Utensils className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-[9px] md:text-sm">
              {orders.restaurant.restaurantName}
            </span>
          </span>
          <Badge
            variant={"outline"}
            className={cn(
              orders.restaurant.restaurantType === "veg"
                ? "bg-green-500"
                : orders.restaurant.restaurantType === "non-veg"
                  ? "bg-red-500"
                  : "bg-gray-500",
              "text-white"
            )}
          >
            {orders.restaurant.restaurantType}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="flex h-30 w-full justify-between gap-2 space-y-3">
          <img
            className="rounded-lg object-cover shadow"
            src={orders.restaurant.imageUrl}
            alt={orders.restaurant.restaurantName}
          />
          <div className="flex h-full flex-col gap-2">
            <span className="flex items-center gap-3 text-[9px] md:text-sm">
              <Timer className="h-3.5 w-3.5 text-orange-500 md:h-5 md:w-5 dark:text-white" />
              {orders.restaurant.estimatedDeliveryTime}
            </span>
            <span className="flex items-center gap-3 text-[9px] md:text-sm">
              <IndianRupee className="h-3.5 w-3.5 text-orange-500 md:h-5 md:w-5 dark:text-white" />
              {orders.restaurant.deliveryPrice}
            </span>
            <span className="flex items-center gap-3 text-[9px] md:text-sm">
              <PhoneCall className="h-3.5 w-3.5 text-orange-500 md:h-5 md:w-5 dark:text-white" />
              +91 {orders.restaurant.contact}
            </span>
            <span className="flex items-center gap-3 text-[9px] md:text-sm">
              <Map className="h-3.5 w-3.5 text-orange-500 md:h-5 md:w-5 dark:text-white" />
              <Link
                className="text-blue-400 underline"
                to={`/restaurants/maps/${orders.restaurant._id}`}
              >
                View On Map
              </Link>
            </span>
          </div>
        </span>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button
          className="bg-orange-500 text-white hover:bg-orange-500 hover:text-white"
          variant={"outline"}
          onClick={() =>
            navigate(`/my-restaurants/edit/${orders.restaurant._id}`)
          }
        >
          Edit
        </Button>
        <Button
          className="bg-orange-500 text-white hover:bg-orange-500 hover:text-white"
          variant={"outline"}
          onClick={() =>
            navigate(`/my-restaurants/${orders.restaurant._id}/orders`, {
              state: orders,
            })
          }
        >
          Manage Orders
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AllOrders
