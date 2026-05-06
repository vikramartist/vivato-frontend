import type { CartItem } from "@/pages/detail-page"
import type { Restaurant } from "@/type"
import { CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Props = {
  restaurant: Restaurant
  cartItems: CartItem[]
}

const OrderSummary = ({ cartItems, restaurant }: Props) => {
  const getTotalCost = () => {
    const totalInRupee = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    )

    let totalInDelivery = totalInRupee + restaurant.deliveryPrice
    totalInDelivery = totalInDelivery - totalInDelivery * 0.2

    return totalInDelivery
  }
  return (
    <>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold tracking-tight">
          <span className="text-[10px] md:text-sm">Your Order</span>
          <span className="text-[10px] md:text-sm">Rs {getTotalCost()}</span>
        </CardTitle>
        <CardContent className="flex flex-col gap-5">
          {cartItems.map((cartItem) => (
            <>
              {cartItem.quantity > 0 && (
                <div key={cartItem._id} className="flex justify-between">
                  <span className="text-[8px] md:text-sm">
                    <Badge
                      variant={"outline"}
                      className="mr-2 text-[8px] md:text-sm"
                    >
                      {cartItem.quantity}
                    </Badge>
                    {cartItem.name}
                  </span>
                  <span className="flex items-center gap-1 text-[8px] md:text-sm">
                    Rs {cartItem.price * cartItem.quantity}
                  </span>
                </div>
              )}
            </>
          ))}
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-[9px] md:text-sm">Delivery</span>
            <span className="text-[8px] md:text-sm">
              Rs {restaurant.deliveryPrice}
            </span>
          </div>
          <Separator />
          <div className="flex w-full flex-col items-start justify-between gap-2">
            <span className="text-[8px] md:text-sm">Add Coupon Code</span>
            <Input disabled type="text" />
            <div className="flex items-center gap-2 text-[8px] md:text-sm">
              <span className="text-[8px] md:text-sm">Coupon code:</span>
              <Badge
                variant={"outline"}
                className="bg-orange-500 p-2 text-[8px] text-white md:text-sm"
              >
                Vivato20
              </Badge>{" "}
              is applied
            </div>
            <Button disabled type="button" className="text-[9px] md:text-sm">
              Apply Code
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </>
  )
}

export default OrderSummary
