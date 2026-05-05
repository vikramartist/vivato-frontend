import type { Restaurant } from "@/type"
import { Icon } from "leaflet"
import { Marker, Popup } from "react-leaflet"
import { Button } from "../ui/button"
import { hhmmToMinutes } from "@/lib/utils"
import { Verified } from "lucide-react"
import { useNavigate } from "react-router-dom"

type MapMarkerProps = {
  restaurant: Restaurant
}

const MapMarker = ({ restaurant }: MapMarkerProps) => {
  const iconCache = new Map<string, Icon>()
  const navigate = useNavigate()

  const getCustomUrl = (image: string): Icon => {
    if (!iconCache.has(image)) {
      iconCache.set(
        image,
        new Icon({
          iconUrl: image,
          iconSize: [38, 38],
          className: "rounded-full ",
        })
      )
    }
    return iconCache.get(image)!
  }
  return (
    <Marker
      key={`${restaurant._id}-${restaurant.restaurantName}`}
      position={[
        restaurant?.location?.coordinates![1] as number,
        restaurant?.location?.coordinates![0] as number,
      ]}
      icon={getCustomUrl(restaurant.imageUrl)}
    >
      <Popup>
        <div className="w-40">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.restaurantName}
            className="h-20 w-full rounded-md object-cover"
            loading="lazy"
          />
          <div className="mt-1 flex h-full w-full flex-col items-center justify-center text-[9px] md:text-sm">
            <Button
              variant={"link"}
              className="text-[9px] font-normal text-black md:text-[10px]"
              onClick={() => navigate(`/details/${restaurant._id}`)}
            >
              {restaurant.restaurantName}
            </Button>
            <div className="flex w-full items-center justify-between">
              <span className="text-[8px] md:text-[10px]">
                Timings: {hhmmToMinutes(restaurant.openingTime)} -{" "}
                {hhmmToMinutes(restaurant.closingTime)}
              </span>
              <span className="text-[8px] md:text-[10px]">
                <Verified size={"8px"} />
                {restaurant.restaurantType}
              </span>
            </div>
            <span className="text-[8px] md:text-[10px]">Rating: {4 / 5}</span>
            <p className="text-[8px] font-normal tracking-tight md:text-[10px]">
              {restaurant.description}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default MapMarker
