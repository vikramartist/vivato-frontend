import type { MenuItem } from "@/type"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { LucideImagePlay, MinusIcon, PlusIcon, Verified } from "lucide-react"
import { cn } from "@/lib/utils"
import ImageGrid from "./image-grid"
import { useState, type MouseEvent } from "react"
import { Button } from "./ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "./ui/badge"

type Props = {
  menuItem: MenuItem
  onAddCart: (cartItem: MenuItem, quantity: number) => void
  quantity: number
}

const MenuItemCard = ({ menuItem, onAddCart, quantity }: Props) => {
  const [isPreviewClicked, setIsPreviewClicked] = useState(false)

  const handleItemPlusClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onAddCart(menuItem, quantity + 1)
  }

  const handleItemMinusClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    onAddCart(menuItem, Math.max(0, quantity - 1))
  }

  const isMobile = useIsMobile()
  return (
    <Card className="cursor-pointer p-1">
      <CardHeader>
        <CardTitle className="text-[8px] md:text-sm">{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-2 p-1 text-[8px] font-bold md:text-[13px]">
        <div className="flex w-30 flex-col items-start justify-center gap-3">
          <Badge variant={"outline"} className="text-[8px] md:text-[13px]">
            <Verified
              className={cn(
                menuItem.foodType === "veg"
                  ? "text-green-500"
                  : menuItem.foodType === "non-veg"
                    ? "text-red-500"
                    : "text-orange-500",
                "h-3.5 w-3.5 md:h-4 md:w-4"
              )}
            />
            {menuItem.foodType}
          </Badge>
          <Badge
            variant={"outline"}
            className="flex text-[9px] font-light md:text-[13px]"
          >
            Price: Rs {menuItem.price}
          </Badge>
          <Badge
            className="flex text-[9px] font-light md:text-[13px]"
            variant={"outline"}
          >
            Calories :{menuItem.calories}
          </Badge>
        </div>
        <div className="flex flex-col items-center gap-2 md:w-70">
          <div className="relative flex w-30">
            <ImageGrid
              images={menuItem.menuImageUrl}
              name={`${menuItem.name}-${menuItem._id}`}
              isPreview={isPreviewClicked}
              onPreviewChange={setIsPreviewClicked}
            />
            <div
              onClick={() => setIsPreviewClicked((prev) => !prev)}
              className="absolute mx-auto flex h-full w-full items-end justify-end"
            >
              <LucideImagePlay className="font-bold text-white" />
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-3">
            <Button
              onClick={(e) => handleItemPlusClick(e)}
              variant={"outline"}
              size={isMobile ? "icon-sm" : "icon-lg"}
            >
              <PlusIcon className="text-[8px] md:text-sm" />
            </Button>
            <span defaultValue={0} className="font-bold">
              {quantity}
            </span>
            <Button
              onClick={(e) => handleItemMinusClick(e)}
              variant={"outline"}
              disabled={quantity <= 0}
              size={isMobile ? "icon-sm" : "icon-lg"}
            >
              <MinusIcon className="text-[8px] md:text-sm" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MenuItemCard
